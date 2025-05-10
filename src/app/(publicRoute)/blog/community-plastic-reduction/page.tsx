import Image from 'next/image';
import Link from 'next/link';
import plasticWaste from '@/assets/plasticWaste.jpg';

const CommunityPlasticReduction = () => {
  return (
    <div className="md:mx-20">
      {/* Breadcrumb Navigation */}
      <nav className="flex py-4 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 shadow-md rounded-md">
  <ol className="inline-flex items-center space-x-1 md:space-x-3">
    <li className="inline-flex items-center">
      <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200">
        Home
      </Link>
    </li>
    <li>
      <div className="flex items-center">
        <svg
          className="w-3 h-3 mx-1 text-gray-400 dark:text-gray-500"
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
        <Link href="/blogs" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200">
          Blogs
        </Link>
      </div>
    </li>
    <li aria-current="page">
      <div className="flex items-center">
        <svg
          className="w-3 h-3 mx-1 text-gray-400 dark:text-gray-500"
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
        <span className="text-gray-500 dark:text-gray-300">{'Plastic Reduction'}</span>
      </div>
    </li>
  </ol>
</nav>


      {/* Article Header */}
      <header className="mb-12 px-4 md:px-8">
  <span className="inline-block px-4 py-2 text-sm font-semibold text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-full mb-4">
    Sustainable Initiatives
  </span>
  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
    How GreenMind-Hub is Empowering Communities to Reduce Plastic Waste
  </h1>
  <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
    <div className="flex items-center">
      <svg
        className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400"
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
      <span className="text-sm">By Laura Simmons</span>
    </div>
    <div className="flex items-center">
      <svg
        className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400"
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
      <span className="text-sm">March 22, 2023</span>
    </div>
    <div className="flex items-center">
      <svg
        className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400"
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
      <span className="text-sm">5 min read</span>
    </div>
  </div>
</header>


      {/* Article Content */}
     {/* Article Content */}
<article className="max-w-none">
  <figure className="mb-8 flex flex-col justify-center items-center">
    <Image
      src={plasticWaste}
      alt="Community members participating in plastic waste cleanup"
      className="w-full rounded-lg shadow-xl"
    />
    <figcaption className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
      GreenMind community leading the charge on sustainable waste reduction.
    </figcaption>
  </figure>

  <p className="text-lg text-green-700 dark:text-green-400">
    At GreenMind-Hub, we believe that small, consistent efforts can lead to significant environmental impact. Our neighborhood embarked on a sustainability journey that reduced plastic waste by 80% in just one year. Here’s a look at how our community took action and inspired others.
  </p>

  <h2 className="text-2xl font-semibold mt-6 text-green-800 dark:text-green-300">
    The Wake-Up Call
  </h2>
  <p className="text-lg text-gray-700 dark:text-gray-400">
    It all began with a startling discovery during our annual cleanup. Of the 320 pounds of trash collected, 73% was single-use plastic. With this eye-opening statistic, our community decided to act and reduce its dependence on plastic.
  </p>

  <div className="bg-green-100 dark:bg-green-800 p-6 rounded-lg my-6">
    <h3 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-300">
      Key Facts Before Our Action
    </h3>
    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
      <li className="flex items-start">
        <svg
          className="w-5 h-5 text-green-500 mr-2 mt-0.5"
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
          className="w-5 h-5 text-green-500 mr-2 mt-0.5"
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
        <span>Only 12% of residents recycled plastic</span>
      </li>
      <li className="flex items-start">
        <svg
          className="w-5 h-5 text-green-500 mr-2 mt-0.5"
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
        <span>Local businesses lacked plastic-free alternatives</span>
      </li>
    </ul>
  </div>

  <h2 className="text-2xl font-semibold text-green-800 dark:text-green-300 mt-6">
    Our 5-Step GreenMind Action Plan
  </h2>

  <h3 className="text-xl font-semibold mt-4 text-green-700 dark:text-green-300">
    1. The GreenMind Plastic-Free Pledge
  </h3>
  <p className="text-lg text-gray-700 dark:text-gray-400">
    We introduced a pledge where each household committed to eliminating at least three plastic items. The most common changes included:
  </p>
  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
    <li>Switching to reusable bottles</li>
    <li>Using fabric shopping bags</li>
    <li>Choosing products with minimal or recyclable packaging</li>
  </ul>

  <h3 className="text-xl font-semibold mt-6 text-green-700 dark:text-green-300">
    2. GreenMind Swap Events
  </h3>
  <p className="text-lg text-gray-700 dark:text-gray-400">
    Our community held monthly swap events to exchange common plastic items for eco-friendly alternatives. Successful events included:
  </p>
  <div className="grid md:grid-cols-2 gap-4 my-4">
    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
      <h4 className="font-semibold mb-2">Kitchen Revolution</h4>
      <p>Plastic containers swapped for glass jars (collected over 400 plastic containers)</p>
    </div>
    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
      <h4 className="font-semibold mb-2">Bathroom Makeover</h4>
      <p>Plastic toiletries swapped for bar shampoos, bamboo toothbrushes, etc.</p>
    </div>
  </div>
    <h3 className="text-xl font-semibold mt-6 text-green-700 dark:text-green-300">
    3. Local Business Collaboration
  </h3>
  <p className="text-lg text-gray-700 dark:text-gray-400">
    We collaborated with local businesses to provide more sustainable options. Many restaurants replaced plastic straws with metal or paper alternatives, and stores started offering bulk-buy discounts for reusable products.
  </p>

  <h3 className="text-xl font-semibold mt-6 text-green-700 dark:text-green-300">
    4. Education and Awareness Campaigns
  </h3>
  <p className="text-lg text-gray-700 dark:text-gray-400">
    We organized seminars and workshops to educate residents about the harmful effects of plastic waste and the importance of reducing, reusing, and recycling. Our community also partnered with schools to engage younger generations in the mission.
  </p>

  <h3 className="text-xl font-semibold mt-6 text-green-700 dark:text-green-300">
    5. Waste Management Innovation
  </h3>
  <p className="text-lg text-gray-700 dark:text-gray-400">
    We implemented a neighborhood-wide composting system and organized regular waste collection events. By working together, we were able to reduce plastic waste by 80% and significantly improve our recycling rates.
  </p>

  <h2 className="text-2xl font-semibold text-green-800 dark:text-green-300 mt-6">
    The Impact
  </h2>
  <p className="text-lg text-gray-700 dark:text-gray-400">
    The GreenMind initiative transformed our neighborhood. Plastic waste decreased by 80%, recycling rates increased to 60%, and businesses are now providing more eco-friendly products. Here’s what some of our residents had to say:
  </p>

  <div className="bg-green-100 dark:bg-green-800 p-6 rounded-lg my-6">
    <h3 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-300">
      Testimonials
    </h3>
    <blockquote className="italic text-gray-700 dark:text-gray-400">
      “The GreenMind initiative has completely changed the way we think about waste. It’s amazing to see how a small community can make such a big impact.”
    </blockquote>
    <p className="mt-4 text-right text-gray-700 dark:text-gray-400">- Lisa S., Resident</p>
  </div>

  <p className="text-lg text-gray-700 dark:text-gray-400">
    The success of this project proves that collective action can have a huge impact on our environment. As we continue our journey toward a plastic-free world, GreenMind will keep pushing for innovation and inspiring other communities to join us in reducing waste for a better future.
  </p>
</article>



      {/* Article Footer */}
     <footer className="mt-12 pt-8 border-t dark:border-gray-600 bg-gray-800 dark:bg-gray-900">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
    <div>
      <h3 className="text-lg font-semibold mb-2 text-teal-400">About the Author</h3>
      <div className="flex items-center">
        <Image
          height={50}
          width={50}
          src="/avatar.png"
          alt="Maria Rodriguez"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <div className="font-medium text-white">Maria Rodriguez</div>
          <div className="text-sm text-gray-400">
            Community Organizer & Sustainability Advocate
          </div>
        </div>
      </div>
    </div>
    <Link
      href="/blog"
      className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
    >
      Share Your Community Story
    </Link>
  </div>

  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-4 text-teal-400">Related Articles</h3>
    <div className="grid md:grid-cols-3 gap-6">
      <Link href="/blog" className="group">
        <div className="bg-gray-700 dark:bg-gray-800 p-4 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
          <h4 className="font-medium text-white group-hover:text-teal-500">
            Zero Waste Schools Initiative
          </h4>
          <p className="text-sm text-gray-400 dark:text-gray-300 mt-1">
            How students are leading the change
          </p>
        </div>
      </Link>
      <Link href="/blog" className="group">
        <div className="bg-gray-700 dark:bg-gray-800 p-4 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
          <h4 className="font-medium text-white group-hover:text-teal-500">
            10 Plastic Alternatives You Can Try Today
          </h4>
          <p className="text-sm text-gray-400 dark:text-gray-300 mt-1">
            Simple swaps for everyday items
          </p>
        </div>
      </Link>
      <Link href="/blog" className="group">
        <div className="bg-gray-700 dark:bg-gray-800 p-4 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
          <h4 className="font-medium text-white group-hover:text-teal-500">
            Community Composting Success
          </h4>
          <p className="text-sm text-gray-400 dark:text-gray-300 mt-1">
            Turning food waste into neighborhood assets
          </p>
        </div>
      </Link>
    </div>
  </div>

  <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4 text-teal-400">Discuss This Article</h3>
    <p className="mb-4 text-gray-300">
      Have questions or want to share your own community&apos;s
      experience? Join the conversation on GreenMind-Hub!
    </p>
    <Link
      href="/blog"
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600"
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