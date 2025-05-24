/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useUser } from '@/context/UserContext';
import { Sparkles, Leaf, Users, BarChart2, Lightbulb, CreditCard, MessageSquare, UserCheck } from 'lucide-react';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import { getAllUsers } from '@/app/(privateRoute)/admin/all-users/_actions';
import { getAllIdeasByAdmin } from '@/app/(privateRoute)/admin/all-ideas/_actions';
import { LineChart, PieChart, Line, Pie, Cell, ResponsiveContainer, Tooltip, Legend, YAxis, CartesianGrid, XAxis } from 'recharts';
import { IdeaStatus } from '@/types/idea';

interface Activity {
  id: string;
  type: 'idea' | 'user';
  title: string;
  description: string;
  timestamp: string;
}

interface DashboardStats {
  userCount: number;
  paymentCount: number;
  ideaCount: number;
  userIdeas: number;
  userPayments: number;
  paymentAmount: number;
  growthData: { month: string; value: number }[];
  ideaDistribution: { name: string; value: number }[];
  ideaStatusCounts: {
    DRAFT: number;
    UNDER_REVIEW: number;
    APPROVED: number;
    REJECTED: number;
  };
  recentActivities: Activity[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StatCard = ({ 
  icon, 
  title, 
  value, 
  unit = '', 
  change, 
  color 
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  unit?: string;
  change: string;
  color: 'blue' | 'purple' | 'amber' | 'emerald';
}) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' },
    purple: { bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' },
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400' },
    emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400' },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className={`${colorClasses[color].bg} p-3 rounded-lg`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${colorClasses[color].text}`}>
          {change}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
          <CountUp end={value} duration={1.5} />{unit}
        </p>
      </div>
    </div>
  );
};

const CommonDashboard = () => {
  const { user } = useUser();
  const [stats, setStats] = useState<DashboardStats>({
    userCount: 0,
    paymentCount: 0,
    ideaCount: 0,
    userIdeas: 0,
    userPayments: 0,
    paymentAmount: 0,
    growthData: [],
    ideaDistribution: [],
    ideaStatusCounts: {
      DRAFT: 0,
      UNDER_REVIEW: 0,
      APPROVED: 0,
      REJECTED: 0
    },
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.role === 'ADMIN') {
          const [usersResponse, ideasResponse] = await Promise.all([
            getAllUsers(),
            getAllIdeasByAdmin(),
          ]);
          
          const users = usersResponse.data || [];
          const ideas = ideasResponse.data || [];

          // Count ideas by status
          const statusCounts = {
            DRAFT: ideas.filter((idea: { status: IdeaStatus }) => idea.status === 'DRAFT').length,
            UNDER_REVIEW: ideas.filter((idea: { status: IdeaStatus }) => idea.status === 'UNDER_REVIEW').length,
            APPROVED: ideas.filter((idea: { status: IdeaStatus }) => idea.status === 'APPROVED').length,
            REJECTED: ideas.filter((idea: { status: IdeaStatus }) => idea.status === 'REJECTED').length,
          };

          // Generate recent activities
          const activities: Activity[] = [];
          
          // Add user signups (last 5 users)
          const recentUsers = users.slice(0, 5).map((u: any) => ({
            id: u.id,
            type: 'user',
            title: 'New member joined',
            description: `${u.name || 'A user'} joined the platform`,
            timestamp: new Date(u.createdAt).toLocaleString()
          }));
          
          // Add recent ideas (last 5 ideas)
          const recentIdeas = ideas.slice(0, 5).map((idea: any) => ({
            id: idea.id,
            type: 'idea',
            title: 'New idea submitted',
            description: `"${idea.title}" was added`,
            timestamp: new Date(idea.createdAt).toLocaleString()
          }));
          
          // Combine and sort by timestamp
          activities.push(...recentUsers, ...recentIdeas);
          activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          const recentActivities = activities.slice(0, 5);

          setStats({
            userCount: users.length,
            paymentCount: users.reduce((sum: any, u: { payments: string | any[]; }) => sum + (u.payments?.length || 0), 0),
            ideaCount: ideas.length,
            userIdeas: 0,
            userPayments: 0,
            paymentAmount: 0,
            growthData: [
              { month: 'Jan', value: 120 },
              { month: 'Feb', value: 210 },
              { month: 'Mar', value: 180 },
              { month: 'Apr', value: 350 },
              { month: 'May', value: 420 },
              { month: 'Jun', value: 510 },
            ],
            ideaDistribution: [
              { name: 'Draft', value: statusCounts.DRAFT },
              { name: 'Under Review', value: statusCounts.UNDER_REVIEW },
              { name: 'Approved', value: statusCounts.APPROVED },
              { name: 'Rejected', value: statusCounts.REJECTED },
            ],
            ideaStatusCounts: statusCounts,
            recentActivities
          });
        } else {
          // For regular users
          const userActivities: Activity[] = [];
          
          // Add user's ideas as activities
          if (user?.ideas?.length) {
            user.ideas.slice(0, 5).forEach((idea: any) => {
              userActivities.push({
                id: idea.id,
                type: 'idea',
                title: `Idea ${idea.status.toLowerCase().replace('_', ' ')}`,
                description: `"${idea.title}" is now ${idea.status.toLowerCase().replace('_', ' ')}`,
                timestamp: new Date(idea.updatedAt).toLocaleString()
              });
            });
          }
          
          // Sort by timestamp and take latest 5
          userActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          const recentActivities = userActivities.slice(0, 5);

          setStats({
            userCount: 0,
            paymentCount: 0,
            ideaCount: 0,
            userIdeas: user?.ideas?.length || 0,
            userPayments: user?.payments?.length || 0,
            paymentAmount: user?.payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0,
            growthData: [
              { month: 'Jan', value: 20 },
              { month: 'Feb', value: 35 },
              { month: 'Mar', value: 28 },
              { month: 'Apr', value: 45 },
              { month: 'May', value: 52 },
              { month: 'Jun', value: 60 },
            ],
            ideaDistribution: [
              { name: 'Your Ideas', value: user?.ideas?.length || 0 },
              { name: 'Supported', value: user?.payments?.length || 0 },
              { name: 'Engagement', value: 15 },
            ],
            ideaStatusCounts: {
              DRAFT: user?.ideas?.filter((i: any) => i.status === 'DRAFT').length || 0,
              UNDER_REVIEW: user?.ideas?.filter((i: any) => i.status === 'UNDER_REVIEW').length || 0,
              APPROVED: user?.ideas?.filter((i: any) => i.status === 'APPROVED').length || 0,
              REJECTED: user?.ideas?.filter((i: any) => i.status === 'REJECTED').length || 0,
            },
            recentActivities
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {user?.role === 'ADMIN' ? 'Admin Dashboard' : 'My Sustainability Hub'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {user?.role === 'ADMIN' 
              ? 'Manage platform activities and track growth' 
              : 'Track your contributions and impact'}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
          <div className="bg-emerald-100 dark:bg-emerald-900/20 p-2 rounded-full">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {user?.name || 'User'}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user?.role === 'ADMIN' ? (
          <>
            <StatCard 
              icon={<Users className="w-5 h-5" />}
              title="Total Users"
              value={stats.userCount}
              change="+12%"
              color="blue"
            />
            <StatCard 
              icon={<CreditCard className="w-5 h-5" />}
              title="Payments"
              value={stats.paymentCount}
              change="+8%"
              color="purple"
            />
            <StatCard 
              icon={<Lightbulb className="w-5 h-5" />}
              title="Total Ideas"
              value={stats.ideaCount}
              change="+24%"
              color="amber"
            />
            <StatCard 
              icon={<MessageSquare className="w-5 h-5" />}
              title="Engagement"
              value={87}
              change="+18%"
              color="emerald"
            />
          </>
        ) : (
          <>
            <StatCard 
              icon={<Lightbulb className="w-5 h-5" />}
              title="Your Ideas"
              value={stats.userIdeas}
              change="+2 this month"
              color="blue"
            />
            <StatCard 
              icon={<UserCheck className="w-5 h-5" />}
              title="Supported"
              value={stats.userPayments}
              change={`$${stats.paymentAmount}`}
              color="purple"
            />
            <StatCard 
              icon={<Leaf className="w-5 h-5" />}
              title="CO₂ Reduced"
              value={1245}
              unit="kg"
              change="+120kg"
              color="emerald"
            />
            <StatCard 
              icon={<BarChart2 className="w-5 h-5" />}
              title="Engagement"
              value={87}
              unit="%"
              change="+12%"
              color="amber"
            />
          </>
        )}
      </div>

      {/* Additional Status Counts for Admin */}
      {user?.role === 'ADMIN' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Lightbulb className="w-5 h-5" />}
            title="Draft Ideas"
            value={stats.ideaStatusCounts.DRAFT}
            change={`${Math.round((stats.ideaStatusCounts.DRAFT / stats.ideaCount) * 100)}%`}
            color="blue"
          />
          <StatCard 
            icon={<Lightbulb className="w-5 h-5" />}
            title="Under Review"
            value={stats.ideaStatusCounts.UNDER_REVIEW}
            change={`${Math.round((stats.ideaStatusCounts.UNDER_REVIEW / stats.ideaCount) * 100)}%`}
            color="purple"
          />
          <StatCard 
            icon={<Lightbulb className="w-5 h-5" />}
            title="Approved Ideas"
            value={stats.ideaStatusCounts.APPROVED}
            change={`${Math.round((stats.ideaStatusCounts.APPROVED / stats.ideaCount) * 100)}%`}
            color="emerald"
          />
          <StatCard 
            icon={<Lightbulb className="w-5 h-5" />}
            title="Rejected Ideas"
            value={stats.ideaStatusCounts.REJECTED}
            change={`${Math.round((stats.ideaStatusCounts.REJECTED / stats.ideaCount) * 100)}%`}
            color="amber"
          />
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Platform Growth
            </h2>
            <select className="bg-gray-50 dark:bg-gray-700 text-sm rounded-lg px-3 py-1">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.growthData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    borderRadius: '0.5rem',
                    borderColor: '#e5e7eb',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                    padding: '0.5rem'
                  }}
                  formatter={(value: number) => [`Value: ${value}`, '']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6b7280' }}
                  tickMargin={10}
                />
                <YAxis 
                  tick={{ fill: '#6b7280' }}
                  tickMargin={10}
                  tickFormatter={(value) => `${value}`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            {user?.role === 'ADMIN' ? 'Idea Distribution' : 'Your Contributions'}
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.ideaDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={70}
                  innerRadius={40}
                  paddingAngle={2}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {stats.ideaDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    value,
                    `${name}: ${((value / stats.ideaDistribution.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%`
                  ]}
                  contentStyle={{
                    background: 'white',
                    borderRadius: '0.5rem',
                    borderColor: '#e5e7eb',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                    padding: '0.5rem'
                  }}
                />
                <Legend 
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{
                    paddingLeft: '20px'
                  }}
                  formatter={(value) => (
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {stats.recentActivities.length > 0 ? (
            stats.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <div className={`${activity.type === 'idea' ? 'bg-emerald-100 dark:bg-emerald-900/20' : 'bg-blue-100 dark:bg-blue-900/20'} p-2 rounded-full mt-1`}>
                  {activity.type === 'idea' ? (
                    <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No recent activities to show
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonDashboard;