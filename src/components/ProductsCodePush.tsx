import { motion } from 'framer-motion';

import ios from '../assets/images/patch_ios.png';
import android from '../assets/images/patch_android.png';
import { config } from '../config';
import { CheckArrowIcon } from '../assets/icons/CheckArrowIcon';

export const ProductsCodePush = () => {
  return (
    <section
      className="lg:mb-16 w-full flex flex-col justify-center items-center bg-shorebirdBg1"
      id="products-code-push"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className=" 2xl:w-[1150px] xl:w-[1050px]  md:w-4/5 flex justify-center bg-shorebirdBg1 pt-12 lg:pt-24 pb-8 lg:pb-20 mx-auto lg:flex-row flex-col">
          <div className="w-3/4 lg:w-1/2 flex flex-col lg:mx-unset mx-auto">
            <h2 className="mt-10 mb-8 text-4xl md:text-5xl shorebird-block-big-title">
              Deploy updates instantly
            </h2>
            <p className="mb-8 text-shorebirdTextGray leading-loose">
              Code push is a cloud service that allows developers to push app
              updates directly to users' devices.
            </p>
            <ul className="mb-6 text-white">
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Integrate in minutes with no code changes</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Push updates to any Dart code</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Supports all Android and iOS devices</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row">
              <a
                target="_blank"
                href={config.consoleUrl}
                className="shorebird-button-primary w-full h-12 mr-0 sm:mr-4 lg:mr-4 mb-2 sm:mb-0"
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="w-4/5 lg:w-2/3 lg:pl-16 mx-auto pt-16 lg:pt-0 flex-1">
            <div className="relative inline-flex">
              <img
                src={android}
                alt="Get Started with Shorebird on Android"
                width="800"
                height="405"
                className="rounded-xl shorebird-border-gray"
              />
            </div>
            <div className="h-4"></div>
            <div className="relative inline-flex">
              <div className="py-2 px-4 rounded-full bg-gradient-to-r from-blue-400 to-teal-500 via-purple-500 animate-gradient-xy text-white absolute right-0 left-auto top-0 bottom-auto font-bold -translate-y-1/3 translate-x-1/3">
                NEW
              </div>
              <img
                src={ios}
                alt="Get Started with Shorebird on iOS"
                width="800"
                height="405"
                className="rounded-xl shorebird-border-gray bg-gradient-to-r from-blue-400 to-teal-500 via-purple-500 animate-gradient-xy p-1"
              />
            </div>
          </div>
        </div>
      </motion.div>
      <div className="custom-shape-divider-top-code-push w-full">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="shorebird-bg2"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="shorebird-bg1"
          ></path>
        </svg>
      </div>
    </section>
  );
};
