import ContributePart from '@/components/Blogs/contributeIdea';
import Link from 'next/link';

const BlogsPage = () => {
  return (
    <div className="md:mx-20">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
          Welcome to GreedMind-hub Blog
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 py-4">
          Welcome to the{' '}
           GreedMind-hub
          blog – your source for in-depth articles, success stories, and expert
          insights on sustainability. Explore our collection of thought-provoking
          content to deepen your environmental knowledge and find inspiration for
          your next green project.
        </p>
      </header>

      <div className="space-y-12">
        {/* Featured Articles Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4 border-b dark:border-gray-700 text-primary">
            Featured Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            {/* Article 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-primary">
                  <Link href="/blog" className="hover:text-blue-600">
                    How Zero-Waste Communities Are Changing Urban Living
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Discover how cities worldwide are implementing innovative waste
                  reduction strategies and how you can bring these ideas to your
                  neighborhood.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>By Sarah Johnson</span>
                  <span className="mx-2">•</span>
                  <span>May 15, 2023</span>
                </div>
              </div>
            </div>

            {/* Article 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-primary">
                  <Link href="/blog" className="hover:text-blue-600">
                    DIY Solar: Affordable Home Energy Solutions
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  A step-by-step guide to setting up small-scale solar solutions
                  that won&apos;t break the bank but will reduce your carbon footprint.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>By Michael Chen</span>
                  <span className="mx-2">•</span>
                  <span>April 28, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4 border-b dark:border-gray-700 text-primary">
            Recent Posts
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {/* Post 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-full mb-2">
                  Waste Reduction
                </span>
                <h3 className="text-lg font-bold mb-2 text-primary">
                  <Link href="/blog" className="hover:text-blue-600">
                    Composting 101: Turning Waste Into Garden Gold
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Everything you need to know to start composting at home, even in
                  small spaces.
                </p>
              </div>
            </div>

            {/* Post 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-full mb-2">
                  Transportation
                </span>
                <h3 className="text-lg font-bold mb-2 text-primary">
                  <Link href="/blog" className="hover:text-blue-600">
                    The Complete Guide to Bike Commuting
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  How to make the switch to bicycle commuting safely and comfortably
                  in any weather.
                </p>
              </div>
            </div>

            {/* Post 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200 rounded-full mb-2">
                  Energy
                </span>
                <h3 className="text-lg font-bold mb-2 text-primary">
                  <Link href="/blog" className="hover:text-blue-600">
                    Home Energy Audit: Finding Your Hidden Savings
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Identify where your home is wasting energy and how to fix it with
                  our DIY audit checklist.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Spotlight Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4 border-b dark:border-gray-700 text-primary">
            Community Spotlight
          </h2>
          <div className="mt-6 bg-green-50 dark:bg-[#14b8a52c] rounded-lg p-6">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">
              &quot;How Our Neighborhood Cut Plastic Waste by 80%&quot;
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Read the inspiring story of how one GreedMind-hub member mobilized
              their community to dramatically reduce single-use plastics through
              simple, collective actions.
            </p>
            <Link
              href="/blog/community-plastic-reduction"
              className="inline-flex items-center text-[#14B8A6] hover:underline font-medium"
            >
              Read the full story
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <ContributePart />
      </div>
    </div>
  );
};

export default BlogsPage;
