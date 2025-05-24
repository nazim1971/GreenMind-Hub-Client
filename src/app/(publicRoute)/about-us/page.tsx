import Link from 'next/link';
import Image from 'next/image';
import team1 from '@/assets/team1.png';
import team2 from '@/assets/team2.png';
import team3 from '@/assets/team3.png';
import team4 from '@/assets/team4.png';
import ourStory from '@/assets/our-story.avif';
import aboutUs from '@/assets/about-us.avif';
import welcome from '@/assets/welcome.avif';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen px-2 py-10 md:px-20 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-6 text-[#14B8A6]">
            About <span className="text-green-600">GreenMind</span>-hub
          </h1>
          <p className="text-normal text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Empowering sustainability through innovation and community engagement
          </p>
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image 
              src={aboutUs} // Replace with your actual image path
              alt="GreenMind-hub team in nature"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="opacity-90"
            />
            <div className="absolute inset-0 bg-[#0000001f]  flex items-center justify-center">
              <p className="text-white text-lg md:text-xl font-medium px-4 text-center">
                Together we can build a greener future
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="space-y-16">
          {/* Welcome Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-green-700 dark:text-[#14B8A6]">
                Welcome to GreenMind-hub
              </h2>
              <p className=" text-gray-700 dark:text-gray-300 mb-4">
                GreenMind-hub is your trusted platform for discovering and sharing sustainable ideas that make a positive impact on the planet.
              </p>
              <p className=" text-gray-700 dark:text-gray-300">
                {`We're building a global community where practical, eco-conscious solutions are encouraged and celebrated. Learn more on our`} <Link href="/" className="text-[#14B8A6] font-semibold hover:underline">homepage</Link>.
              </p>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
              <Image 
                src={welcome} // Replace with your actual image path
                alt="Community working together"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 mr-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Our Mission</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                To foster a world where sustainability is the norm, not the exception. We bring together innovators, creators, and changemakers to share actionable ideas and promote a greener lifestyle.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 mr-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Our Vision</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                A future where every individual and organization contributes to environmental sustainability through accessible, innovative solutions shared on our platform.
              </p>
            </div>
          </div>

          {/* Story Section */}
          <div className="bg-[#f7fdfc] dark:bg-gray-800 p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-green-700 dark:text-[#14B8A6]">
              Our Story
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                <Image 
                  src= {ourStory} // Replace with your actual image path
                  alt="GreenMind-hub founders"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <p className=" text-gray-700 dark:text-gray-300 mb-4">
                  Born from a shared commitment to environmental stewardship, GreenMind-hub started as a collaboration among eco-enthusiasts in 2020.
                </p>
                <p className=" text-gray-700 dark:text-gray-300">
                  What began as a passion project among friends is now a thriving digital hub with thousands of members worldwide, all dedicated to green innovation and impactful initiatives.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-green-700 dark:text-[#14B8A6]">
              Why Choose GreenMind-hub?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Verified Content",
                  description: "Every post is reviewed for authenticity and practical sustainability impact."
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: "Community Support",
                  description: "Connect with like-minded individuals passionate about sustainability."
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "Diverse Categories",
                  description: "From recycling to clean energy, explore hundreds of sustainability topics."
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Monetization",
                  description: "Turn your green ideas into income with our creator program."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-green-50 dark:bg-green-900">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-green-700 dark:text-[#14B8A6]">
              Meet Our Core Team
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Alex Green",
                  role: "Founder & CEO",
                  image: team1 
                },
                {
                  name: "Sam Wilson",
                  role: "Head of Sustainability",
                  image: team2 
                },
                {
                  name: "Taylor Reed",
                  role: "Community Manager",
                  image: team3
                },
                {
                  name: "Jordan Moss",
                  role: "Tech Lead",
                  image: team4
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative h-38 md:h-48 w-38 md:w-48 mx-auto mb-4 rounded-full overflow-hidden shadow-md border-4 border-green-100 dark:border-green-900">
                    <Image 
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{member.name}</h3>
                  <p className="text-green-600 dark:text-green-300">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-[#14b8a510] dark:bg-[#14b8a520] p-8 rounded-xl">
            <h2 className="md:text-3xl text-2xl font-semibold mb-8 text-center text-green-700 dark:text-[#14B8A6]">
              Our Impact in Numbers
            </h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { number: "012+", label: "Community Members" },
                { number: "07+", label: "Sustainable Ideas" },
                { number: "020+", label: "Countries Reached" },
                { number: "05+", label: "Expert Contributors" }
              ].map((stat, index) => (
                <div key={index} className="p-4">
                  <p className="text-2xl md:text-4xl font-bold text-green-600 dark:text-green-300 mb-2">{stat.number}</p>
                  <p className="text-gray-700 dark:text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-500 to-[#14B8A6] p-8 rounded-xl text-center text-white shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Green Revolution</h2>
            <p className="md:text-xl mb-6 max-w-2xl mx-auto">
              {`Whether you're starting your sustainability journey or ready to inspire others — GreenMind-hub is for you.`}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold md:text-lg shadow-md transition-colors">
               Join Our Community
              </Link>
              <Link href="/idea" className="bg-transparent border-2 border-white hover:bg-white hover:text-green-600 px-6 py-3 rounded-lg font-semibold md:text-lg shadow-md transition-colors">
               Browse Ideas
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;