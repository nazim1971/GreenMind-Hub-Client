"use client"
import { motion } from "framer-motion";
import { ShinyButton } from "../magicui/shiny-button";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon, Mail, TwitterIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const Footer = () => {

  const email = 'nazimmuddin10@gmail.com'; 
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

  const whatsappNumber = '+8801867748073'; 
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const currentYear = new Date().getFullYear(); // Dynamic Year

    return (
        <div className="w-full mt-10 bg-gray-100 dark:bg-gray-900 py-8 ">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4 z-10 mt-10"
          >
            <div className="text-2xl md:text-4xl font-bold dark:text-white text-center">
              Ready to take <span className="text-TPrimary">your</span> digital <br/> presence to the next level? 
            </div>
            <div className="font-extralight text-base md:text-xl dark:text-neutral-200 py-4 text-center">
              Reach out to me today and lets discuss how I can help you achieve your goals.
            </div>
            <Link href="/contact" passHref>
          <ShinyButton className="rounded-full">
            Contact Me Now <MoveUpRightIcon />
          </ShinyButton>
        </Link>
          </motion.div>
          <div className="flex flex-col md:flex-row justify-between items-center px-4 pt-4 md:px-8 lg:px-10 mt-8  border-t-[1px] border-TPrimary">
            <p className="text-sm text-gray-700 dark:text-gray-400">&copy; {currentYear} Md. Nazim Uddin. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6 justify-center items-center mt-5 md:mt-0 mb-5 md:mb-0 text-lg md:text-2xl">
              <Link
                className="bg-white border border-gray-300 dark:bg-gray-800 p-2 rounded-full text-black dark:text-white hover:scale-110 transition-transform hover:bg-gray-100 dark:hover:bg-gray-700"
                target="blank"
                href="https://github.com/nazim1971"
              >
                <GithubIcon />
              </Link>
              <Link
                className="bg-white border border-gray-300 dark:bg-gray-800 p-2 rounded-full text-[#0077B5] hover:scale-110 transition-transform hover:bg-gray-100 dark:hover:bg-gray-700"
                target="blank"
                href="https://www.linkedin.com/in/nazim1971/"
              >
                <LinkedinIcon />
              </Link>
              <Link
                className="bg-white border border-gray-300 dark:bg-gray-800 p-2 rounded-full text-[#1DA1F2] hover:scale-110 transition-transform hover:bg-gray-100 dark:hover:bg-gray-700"
                target="blank"
                href="https://x.com/_nazim1971"
              >
                <TwitterIcon />
              </Link>
              <Link
                className="bg-white border border-gray-300 dark:bg-gray-800 p-2 rounded-full text-[#D44638] hover:scale-110 transition-transform hover:bg-gray-100 dark:hover:bg-gray-700"
                target="blank"
                href={gmailLink}
              >
                <Mail />
              </Link>
              <Link
                className="bg-white border border-gray-300 dark:bg-gray-800 p-2 rounded-full text-[#25D366] hover:scale-110 transition-transform hover:bg-gray-100 dark:hover:bg-gray-700"
                target="blank"
                href={whatsappLink}
              >
                <FaWhatsapp />
              </Link>
            </div>
          </div>
        </div>
    );
};

export default Footer;