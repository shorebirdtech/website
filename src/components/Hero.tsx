import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section
      className="flex w-screen items-center justify-center bg-shorebirdBg1"
      id="home"
    >
      <div className="flex w-full flex-col items-center justify-center pt-20 text-center md:w-[800px] md:pt-10 lg:pt-10 xl:w-[900px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <div className="mt-16 px-8 text-7xl font-extrabold tracking-wide text-white sm:mt-32 sm:px-8 md:px-20 lg:px-4 lg:text-8xl xl:text-8xl">
            <h1 className="px-8 text-7xl font-extrabold tracking-wide text-white sm:px-8 md:px-20 lg:px-4 lg:text-8xl xl:text-8xl">
              <span className="">Flutter</span>
              <br />
              <span className="inline animate-gradient-xy bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                Code Push
              </span>
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
