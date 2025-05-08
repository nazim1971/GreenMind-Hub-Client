import Link from 'next/link';

const AboutUsPage = () => {
  return (
    <div className="md:mx-20">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-12">
        About ThinkGreenly
      </h1>
      <p className="text-lg dark:text-white text-justify py-4">
        Welcome to{' '}
        <Link href="/" className="font-semibold text-green-500 hover:underline">
          ThinkGreenly
        </Link>{' '}
        – your premier platform for sharing and discovering sustainable ideas to
        help our planet. We are committed to fostering a community where
        innovative environmental solutions can flourish and make a real impact.
      </p>

      <div className="space-y-8">
        {/* Our Mission */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4">
            Our Mission
          </h2>
          <p className="dark:text-white text-justify">
            At ThinkGreenly, our mission is to accelerate the transition to
            sustainable living by connecting eco-conscious individuals. We
            provide a collaborative space where members can share, discuss, and
            implement practical environmental solutions, from reducing plastic
            waste to adopting renewable energy.
          </p>
        </section>

        {/* Our Story */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4">Our Story</h2>
          <p className="dark:text-white text-justify">
            ThinkGreenly was born from a shared passion for environmental
            conservation. What began as a small group of sustainability
            enthusiasts has grown into a vibrant community platform where
            innovative green ideas are shared, refined, and put into action to
            create meaningful ecological change.
          </p>
        </section>

        {/* Why Choose Us? */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4">
            Why Choose ThinkGreenly?
          </h2>
          <ul className="list-disc list-inside dark:text-white space-y-3 text-justify">
            <li>
              <span className="font-semibold">Verified Ideas:</span> Our admin
              team reviews all submissions to ensure quality and feasibility.
            </li>
            <li>
              <span className="font-semibold">Community-Driven:</span> Get
              feedback and support from like-minded individuals passionate about
              sustainability.
            </li>
            <li>
              <span className="font-semibold">Diverse Categories:</span> Explore
              ideas across energy, waste reduction, transportation, and more.
            </li>
            <li>
              <span className="font-semibold">Monetization Options:</span>{' '}
              Premium content creators can earn from their innovative
              sustainability solutions.
            </li>
          </ul>
        </section>

        {/* Our Values */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4">Our Values</h2>
          <p className="dark:text-white text-justify">
            At ThinkGreenly, we believe in:
          </p>
          <ul className="list-disc list-inside dark:text-white space-y-3 mt-3 text-justify">
            <li>
              <span className="font-semibold">Environmental Impact:</span> Every
              idea shared has the potential to make our planet greener.
            </li>
            <li>
              <span className="font-semibold">Community Collaboration:</span>{' '}
              Great solutions emerge when minds work together.
            </li>
            <li>
              <span className="font-semibold">Innovation:</span> We champion
              creative approaches to sustainability challenges.
            </li>
          </ul>
        </section>

        {/* Join the ThinkGreenly Community */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4">
            Join the Sustainability Movement
          </h2>
          <p className="dark:text-white text-justify">
            Whether you&apos;re looking to share your green initiative or find
            inspiration for your next eco-project, ThinkGreenly connects you
            with a community that cares about our planet&apos;s future.
          </p>
          <p className="dark:text-white mt-4">
            Ready to make a difference?{' '}
            <Link
              href="/ideas"
              className="text-blue-500 font-semibold hover:underline"
            >
              Browse sustainable ideas
            </Link>{' '}
            or{' '}
            <Link
              href="/register"
              className="text-blue-500 font-semibold hover:underline"
            >
              join our community
            </Link>{' '}
            to share your own.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;