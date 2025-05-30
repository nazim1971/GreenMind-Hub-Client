"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { ShinyButton } from "@/components/magicui/shiny-button";

const ContactPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate async form submission (you can replace this with actual API call)
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully!");
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen rounded-2xl bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-[#14B8A6] dark:text-[#14B8A6]">
          Contact Us
        </h2>
        <p className="text-center mb-8 text-gray-600 dark:text-gray-300">
          Have questions or feedback? We d love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Name
              </label>
              <input
              suppressHydrationWarning
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
              suppressHydrationWarning
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Subject
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Message
            </label>
            <textarea
              rows={5}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <div className="text-center">
            <ShinyButton
              className="inline-block w-full md:w-auto bg-[#3ec8b8] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#14B8A6] transition duration-300"
              style={{
                backgroundColor: "#14B8A6",
                border: "none",
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </ShinyButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
