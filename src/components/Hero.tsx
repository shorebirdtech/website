import { motion } from 'framer-motion';
import { config } from '../config';

import demo from '../assets/videos/demo.mp4';

export const Hero = () => {
  return (
    <section
      className="w-screen flex justify-center items-center bg-shorebirdBg1"
      id="home"
    >
      <div className="w-full md:w-[800px] xl:w-[900px] flex flex-col justify-center items-center pt-16 md:pt-16 lg:pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <div className="text-6xl lg:text-7xl xl:text-7xl font-bold tracking-wide text-white  px-8 sm:px-8 md:px-20 lg:px-4 sm:mt-32 mt-16">
            <span className="inline">Code Push</span>
          </div>
          <div className="mt-2 sm:mt-2 text-4xl sm:text-6xl lg:text-7xl xl:text-7xl font-bold tracking-wide  text-white  px-8 sm:px-20 md:px-24 lg:px-24">
            for Flutter
          </div>
        </motion.div>
      </div>
    </section>
  );
};
