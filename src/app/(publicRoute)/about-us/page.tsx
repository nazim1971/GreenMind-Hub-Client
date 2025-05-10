import Link from 'next/link';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen px-4 py-10 md:px-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-green-600 mb-6">
          About GreenMind-hub
        </h1>
        <p className="text-center text-lg mb-12">
          Empowering sustainability through innovation and community.
        </p>

        <section className="space-y-10">
          {/* Welcome */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Welcome to GreenMind-hub</h2>
            <p className="text-justify text-gray-700 dark:text-gray-300">
              GreenMind-hub is your trusted platform for discovering and sharing sustainable ideas that make a positive impact on the planet.
              We’re building a global community where practical, eco-conscious solutions are encouraged and celebrated.
              Learn more on our <Link href="/" className="text-green-500 font-semibold hover:underline">homepage</Link>.
            </p>
          </div>

          {/* Mission */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-justify text-gray-700 dark:text-gray-300">
              We aim to foster a world where sustainability is the norm, not the exception. GreenMind-hub brings together innovators,
              creators, and changemakers to share actionable ideas and promote a greener lifestyle for everyone.
            </p>
          </div>

          {/* Story */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
            <p className="text-justify text-gray-700 dark:text-gray-300">
              Born from a shared commitment to environmental stewardship, GreenMind-hub started as a collaboration among eco-enthusiasts.
              What began as a passion project is now a thriving digital hub for green innovation and impactful initiatives.
            </p>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Why Choose GreenMind-hub?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-justify">
              <li><strong>Verified Content:</strong> Every post is reviewed for authenticity and practicality.</li>
              <li><strong>Community Support:</strong> Connect with people who share your passion for the planet.</li>
              <li><strong>Diverse Categories:</strong> From recycling to clean energy, explore hundreds of topics.</li>
              <li><strong>Monetization:</strong> Turn your green ideas into income with our premium creator program.</li>
            </ul>
          </div>

          {/* Our Values */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-justify">
              <li><strong>Environmental Impact:</strong> We believe small ideas can create big change.</li>
              <li><strong>Collaboration:</strong> Solutions thrive when people work together.</li>
              <li><strong>Innovation:</strong> We support fresh perspectives in solving climate challenges.</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="bg-green-100 dark:bg-green-800 p-6 rounded-md text-center mt-10">
            <h2 className="text-2xl font-semibold mb-3 text-green-900 dark:text-white">Join the Movement</h2>
            <p className="mb-4 text-gray-800 dark:text-gray-200">
              Whether you are starting your sustainability journey or ready to inspire others — GreenMind-hub is for you.
            </p>
            <p className="text-lg">
              <Link href="/idea" className="text-blue-600 font-semibold hover:underline">
                Browse Ideas
              </Link>{' '}
              or{' '}
              <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                Join Now
              </Link>{' '}
              to share your own.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
