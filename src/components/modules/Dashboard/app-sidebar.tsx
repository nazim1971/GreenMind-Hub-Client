'use client';

import {
  ClipboardList,
  DollarSign,
  HomeIcon,
  LayoutDashboard,
  PlusCircle,
  SquareChartGantt,
  UserCog,
  UsersRoundIcon,
} from 'lucide-react';
import logo from '@/assets/logo.png';
// import smLogo from '@/assets/smLogo.png';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
// import { Icon, Logo } from '@/assets/Logo';
import Image from 'next/image';

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & { collapsed?: boolean }) {
  const { user } = useUser();

  const memberMenu = [
    {
      title: 'All Ideas',
      url: '/member/all-ideas',
      icon: ClipboardList,
    },
    {
      title: 'Create Idea',
      url: '/member/create-idea',
      icon: PlusCircle,
    },
    {
      title: 'Manage Payments',
      url: '/member/payments',
      icon: DollarSign,
    }
  ];

  const adminMenu = [
    {
      title: 'Manage Ideas',
      url: '/admin/all-ideas',
      icon: SquareChartGantt,
    },
    {
      title: 'Manage Users',
      url: '/admin/all-users',
      icon: UsersRoundIcon,
    },
    {
      title: 'Manage Payments',
      url: '/admin/payments',
      icon: DollarSign,
    },
  ];

  const data = {
    navMain: [
      {
        title: 'Home',
        url: '/',
        icon: HomeIcon,
      },
      {
        title: 'Dashboard',
        url: `/${user?.role.toLowerCase()}/dashboard`,
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: 'Profile',
        url: '/profile',
        icon: UserCog,
      },
    ],
  };

  if (user?.role === 'ADMIN') {
    data.navMain.push(...adminMenu);
  } else if (user?.role === 'MEMBER') {
    data.navMain.push(...memberMenu);
  }

  return (
    <Sidebar className='relative ' collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="w-full">
                  <Image src={logo} alt="logo" className="h-20 w-40" />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}