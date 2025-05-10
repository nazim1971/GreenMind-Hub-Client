import { Droplet, Wind, RecycleIcon, Trees } from 'lucide-react';
import { FaSolarPanel } from 'react-icons/fa6';

const WorkingSolutions = () => {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-20 bg-[#F4FAF7] dark:bg-gray-900">
      <section className="text-center mb-20">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#14B8A6] mb-6">
          Our Sustainable Solutions
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
          By focusing on eco-friendly practices, we help combat climate change and promote sustainability. 
          From renewable energy to waste management, our initiatives are geared towards building a cleaner, greener future.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/** Card 1 */}
        <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1">
          <RecycleIcon size={80} color="#14B8A6" className="mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-[#14B8A6] mb-3 text-center">Recycling Waste</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Transform used plastic bottles and containers into reusable materials, reducing pollution.
          </p>
        </div>

        {/** Card 2 */}
        <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1">
          <FaSolarPanel size={80} color="#14B8A6" className="mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-[#14B8A6] mb-3 text-center">The Eco System</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            A balanced network of living organisms and their environment that supports biodiversity.
          </p>
        </div>

        {/** Card 3 */}
        <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1">
          <Droplet size={80} color="#14B8A6" className="mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-[#14B8A6] mb-3 text-center">Water Refining</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Innovative water filtration systems that collect, filter, and redistribute runoff water efficiently.
          </p>
        </div>

        {/** Card 4 */}
        <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1">
          <Wind size={80} color="#14B8A6" className="mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-[#14B8A6] mb-3 text-center">Wind Energy</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Harnessing wind power through turbines generates clean electricity and reduces greenhouse gas emissions.
          </p>
        </div>

        {/** Card 5 */}
        <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1">
          <Trees size={80} color="#14B8A6" className="mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-[#14B8A6] mb-3 text-center">Dynamic Ecology</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Studying the ever-changing interactions between organisms and their environments, fostering ecological balance.
          </p>
        </div>

        {/** Card 6 */}
        <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1">
          <Trees size={80} color="#14B8A6" className="mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-[#14B8A6] mb-3 text-center">Saving Plants</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Planting and preserving greenery helps restore ecosystems, improve air quality, and support wildlife.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkingSolutions;
