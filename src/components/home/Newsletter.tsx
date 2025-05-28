/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, Inbox, Mail, Sparkles } from "lucide-react";

export function Newsletter() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = () => {
    toast.success("Subscribed! 🎉");
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full p-8 bg-gradient-to-br from-teal-50/50 my-20 via-white to-teal-50/80 dark:from-teal-900/20 dark:via-gray-900 dark:to-teal-900/30 rounded-2xl relative overflow-hidden border border-teal-100/50 dark:border-teal-900/30 shadow-lg"
    >
      {/* Background elements */}
      <div className="absolute inset-0  opacity-10 dark:opacity-5" />
      <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay pointer-events-none" />
      
      {/* Floating teal circles */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-teal-400/10 blur-xl"
      />
      <motion.div
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Infinity, delay: 0.5 }}
        className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-teal-500/10 blur-xl"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-6 pr-8 relative">
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="flex items-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-teal-500 rounded-xl shadow-lg relative"
            >
              <Mail className="w-8 h-8 text-white" />
              <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-300 animate-ping" />
            </motion.div>
            <div>
              <h2 className="text-2xl md:text-4xl font-bold dark:text-white bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                Join Our Community
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-teal-600 dark:text-teal-400 font-medium"
              >
                Quality content delivered weekly
              </motion.p>
            </div>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 relative pl-6"
          >
            {[
              "Exclusive articles and guides",
              "Latest industry trends",
              "Curated resources",
              "Special member offers"
            ].map((item, index) => (
              <li key={item} className="flex items-start gap-3 group">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  className="flex-shrink-0 mt-1 w-5 h-5 bg-teal-500/10 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                </motion.div>
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.div 
            className="absolute -bottom-8 -left-8 w-24 h-24 bg-teal-400/10 rounded-full blur-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-teal-100/70 dark:border-teal-900/50 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-400/10 rounded-full blur-xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-teal-300/10 rounded-full blur-xl" />

          <div className="space-y-6 relative">
            <div className="text-center space-y-3">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Inbox className="w-12 h-12 text-teal-600 dark:text-teal-400 mx-auto" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Stay Updated
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join {Intl.NumberFormat('en').format(12500)}+ subscribers who get our weekly updates
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Your email address
                </Label>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.02 }}
                >
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 pr-12 h-12"
                    {...register("email", { required: true })}
                  />
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-200/50 dark:shadow-teal-900/20 h-12 relative overflow-hidden group"
                >
                  <span className="flex items-center gap-2 z-10 relative">
                    Subscribe Now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                </Button>
              </motion.div>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute hidden lg:block left-1/2 top-1/2 w-1 h-32 bg-gradient-to-b from-teal-400/30 to-transparent -translate-y-16"
      />
    </motion.div>
  );
}