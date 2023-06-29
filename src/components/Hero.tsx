import { motion } from 'framer-motion';

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
          <div className="text-7xl lg:text-8xl xl:text-8xl font-extrabold tracking-wide text-white px-8 sm:px-8 md:px-20 lg:px-4 sm:mt-32 mt-16">
            <div className="text-7xl lg:text-8xl xl:text-8xl font-extrabold tracking-wide text-white px-8 sm:px-8 md:px-20 lg:px-4">
              <span className="">Flutter</span>
            </div>
            <span className="bg-gradient-to-r text-transparent bg-clip-text from-blue-400 to-orange-500 via-purple-500 animate-gradient-xy inline">
              Code Push
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
