"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Compass } from "lucide-react";

const NotFound = () => {
  const router = useRouter();
  const imageUrl =
    "https://freefrontend.com/assets/img/html-css-404-page-templates/Pure-CSS-404-Error-Page.gif"; // Replace with your preferred external image link

  return (
    <section className="bg-green-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-md mx-auto space-y-6">
        {/* Image */}
        <div className=" mx-auto relative">
          <Image
            src={imageUrl}
            height={500}
            width={500}
            alt="404 Not Found"
            objectFit="contain"
            priority
          />
        </div>

        {/* Heading */}
        <div className="flex items-center justify-center gap-2 text-green-500">
          {/* <Leaf size={28} /> */}
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-green-400 sm:text-3xl">
            Lost in the Green Path
          </h1>
          {/* <Leaf size={28} /> */}
        </div>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300">
          The page you are looking for is not here. Let’s guide you back to
          sustainability.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row justify-center items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft size={18} className="text-green-500" />
            Go Back
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
          >
            <Home size={18} />
            Take Me Home
          </button>
        </div>

        {/* Explore Link */}
        <button
          onClick={() => router.push("/idea")}
          className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 mt-4"
        >
          <Compass size={16} />
          Explore Sustainability Ideas
        </button>
      </div>
    </section>
  );
};

export default NotFound;
