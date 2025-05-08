import Image from 'next/image';
import Link from 'next/link';
import plasticWaste from '@/assets/plasticWaste.jpg';

const CommunityPlasticReduction = () => {
  return (
    <div className="md:mx-20">
      {/* Breadcrumb Navigation */}
      <nav className="flex py-4 text-sm text-gray-600 dark:text-gray-400">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-3 h-3 mx-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link href="/blogs" className="hover:text-blue-500">
                Blogs
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-3 h-3 mx-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-400">Plastic Reduction</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="mb-12">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-full mb-4">
          Community Action
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          How Our Neighborhood Cut Plastic Waste by 80%
        </h1>
        <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>By Maria Rodriguez</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>March 12, 2023</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>8 min read</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-none">
        <figure className="mb-8 flex flex-col justify-center items-center">
          <Image
            src={plasticWaste}
            alt="Community members participating in plastic waste cleanup"
            className="w-full rounded-lg shadow-md"
          />
          <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Oakwood residents sorting collected plastic waste for recycling
          </figcaption>
        </figure>

        <p className="lead">
          When our neighborhood association first discussed plastic waste at our
          monthly meeting, we never imagined we&apos;d become a model for
          community-led sustainability. Within one year, we reduced our
          collective plastic waste by 80% through simple, replicable strategies.
          Here&apos;s how we did it.
        </p>

        <h2>The Wake-Up Call</h2>
        <p>
          It started with a shocking discovery during our annual neighborhood
          cleanup. Of the 320 pounds of trash collected from just 12 blocks, 73%
          was single-use plastics. Water bottles, grocery bags, food packaging -
          the sheer volume was overwhelming. That&apos;s when we decided to take
          action.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg my-6">
          <h3 className="text-xl font-semibold mb-3">
            Key Statistics Before Intervention
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span>Average household: 23 plastic items discarded weekly</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span>Only 12% of residents regularly recycled plastic</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span>
                0% of local businesses offered plastic-free alternatives
              </span>
            </li>
          </ul>
        </div>

        <h2>Our 5-Point Action Plan</h2>

        <h3>1. The Plastic Pledge</h3>
        <p>
          We created a simple commitment that residents could sign, promising to
          eliminate at least three common single-use plastics from their
          households. The most popular pledges were:
        </p>
        <ul>
          <li>Switching to reusable water bottles</li>
          <li>Using cloth shopping bags</li>
          <li>Choosing products with minimal packaging</li>
        </ul>

        <h3>2. Neighborhood Swap Events</h3>
        <p>
          Monthly &quot;swap meets&quot; allowed residents to exchange plastic
          items for sustainable alternatives. Our most successful events:
        </p>
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Kitchen Revolution</h4>
            <p>
              Plastic containers swapped for glass jars (collected 427 plastic
              containers)
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Bathroom Makeover</h4>
            <p>
              Plastic toiletries exchanged for bar shampoo, safety razors, etc.
            </p>
          </div>
        </div>

        <h3>3. Business Partnerships</h3>
        <p>We convinced our local grocery store and three restaurants to:</p>
        <ul>
          <li>Offer discounts for reusable containers</li>
          <li>Eliminate plastic straws and cutlery</li>
          <li>Provide bulk bin options</li>
        </ul>

        <h3>4. Education Campaign</h3>
        <p>Weekly newsletters and workshops covered topics like:</p>
        <ul>
          <li>Plastic-free lunch packing</li>
          <li>DIY cleaning products</li>
          <li>Composting basics</li>
        </ul>

        <h3>5. Progress Tracking</h3>
        <p>We measured success through:</p>
        <ul>
          <li>Monthly waste audits</li>
          <li>Resident surveys</li>
          <li>Business participation rates</li>
        </ul>

        <h2>The Results</h2>
        <p>After 12 months, our efforts yielded remarkable changes:</p>
        <div className="grid md:grid-cols-3 gap-6 my-6">
          <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <div className="text-3xl font-bold text-green-700 dark:text-green-300">
              80%
            </div>
            <div>Reduction in plastic waste</div>
          </div>
          <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <div className="text-3xl font-bold text-green-700 dark:text-green-300">
              92%
            </div>
            <div>Households participating</div>
          </div>
          <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <div className="text-3xl font-bold text-green-700 dark:text-green-300">
              $6,200
            </div>
            <div>Annual savings for community</div>
          </div>
        </div>

        <h2>Challenges We Faced</h2>
        <p>
          The journey wasn&apos;t without obstacles. Our biggest challenges
          included:
        </p>
        <ul>
          <li>
            <strong>Initial resistance:</strong> Some residents saw it as
            inconvenient
          </li>
          <li>
            <strong>Cost concerns:</strong> Perceived expense of alternatives
          </li>
          <li>
            <strong>Behavior change:</strong> Breaking long-held habits
          </li>
        </ul>
        <p>
          We overcame these through persistent education, demonstrating cost
          savings over time, and creating a sense of community pride in our
          achievements.
        </p>

        <h2>How to Replicate Our Success</h2>
        <p>
          Based on our experience, here&apos;s a starter kit for your community:
        </p>
        <ol>
          <li>Form a core team of 5-10 motivated residents</li>
          <li>Conduct a baseline waste audit</li>
          <li>
            Identify easy &quot;quick wins&quot; (like banning plastic bags)
          </li>
          <li>Create simple, measurable goals</li>
          <li>Celebrate milestones publicly</li>
        </ol>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg my-8">
          <h3 className="text-xl font-semibold mb-3">Resources We Created</h3>
          <p className="mb-4">
            We&apos;re happy to share the materials that helped our campaign:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="#"
              className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <svg
                className="w-6 h-6 text-yellow-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Plastic Pledge Template (PDF)</span>
            </Link>
            <Link
              href="#"
              className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <svg
                className="w-6 h-6 text-yellow-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Business Partnership Proposal</span>
            </Link>
            <Link
              href="#"
              className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <svg
                className="w-6 h-6 text-yellow-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Educational Workshop Videos</span>
            </Link>
            <Link
              href="#"
              className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <svg
                className="w-6 h-6 text-yellow-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Waste Audit Spreadsheet</span>
            </Link>
          </div>
        </div>

        <h2>Join the Movement</h2>
        <p>
          Our story proves that community action creates real change. We&apos;d
          love to help your neighborhood start its plastic reduction journey.
          Share your progress on ThinkGreenly and connect with other communities
          tackling plastic waste!
        </p>
      </article>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">About the Author</h3>
            <div className="flex items-center">
              <Image
                height={50}
                width={50}
                src="/avatar.png"
                alt="Maria Rodriguez"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="font-medium">Maria Rodriguez</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Community Organizer & Sustainability Advocate
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/blogs"
            // href="/ideas/new"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Share Your Community Story
          </Link>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/blogs"
              // href="/blogs/zero-waste-schools"
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                <h4 className="font-medium group-hover:text-blue-500">
                  Zero Waste Schools Initiative
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  How students are leading the change
                </p>
              </div>
            </Link>
            <Link
              href="/blogs"
              // href="/blog/plastic-alternatives"
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                <h4 className="font-medium group-hover:text-blue-500">
                  10 Plastic Alternatives You Can Try Today
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Simple swaps for everyday items
                </p>
              </div>
            </Link>
            <Link
              href="/blogs"
              // href="/blog/community-composting"
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                <h4 className="font-medium group-hover:text-blue-500">
                  Community Composting Success
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Turning food waste into neighborhood assets
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Discuss This Article</h3>
          <p className="mb-4">
            Have questions or want to share your own community&apos;s
            experience? Join the conversation on ThinkGreenly!
          </p>
          <Link
            href="/blogs"
            // href="/ideas/community-plastic-reduction-discussion"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Discussion
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
      </footer>
    </div>
  );
};

export default CommunityPlasticReduction;