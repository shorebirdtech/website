import { motion } from 'framer-motion';

import ios from '../assets/images/patch_ios.png';
import android from '../assets/images/patch_android.png';
import { config } from '../config';
import { CheckArrowIcon } from '../assets/icons/CheckArrowIcon';

export const ProductsCodePush = () => {
  return (
    <section
      className="flex w-full flex-col items-center justify-center bg-shorebirdBg1 lg:mb-16"
      id="products-code-push"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mx-auto flex flex-col justify-center bg-shorebirdBg1 pb-8 pt-12 md:w-4/5 lg:flex-row lg:pb-20 lg:pt-24 xl:w-[1050px] 2xl:w-[1150px]">
          <div className="lg:mx-unset mx-auto flex w-3/4 flex-col lg:w-1/2">
            <h2 className="shorebird-block-big-title mb-8 mt-10 text-4xl md:text-5xl">
              Deploy updates instantly
            </h2>
            <p className="mb-8 leading-loose text-shorebirdTextGray">
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
                <span>Supports Android, iOS, Windows, and macOS</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Designed for App Store and Play Store compliance</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row">
              <a
                href="#pricing"
                className="plausible-event-name=Top+Get+Started+Button+Clicked shorebird-button-primary mb-2 mr-0 h-12 w-full sm:mb-0 sm:mr-4 lg:mr-4"
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="mx-auto w-4/5 flex-1 pt-16 lg:w-2/3 lg:pl-16 lg:pt-0">
            <div className="relative inline-flex">
              <img
                src={android.src}
                alt="Get Started with Shorebird on Android"
                width="800"
                height="405"
                className="shorebird-border-gray rounded-xl"
              />
            </div>
            <div className="h-4"></div>
            <div className="relative inline-flex">
              <img
                src={ios.src}
                alt="Get Started with Shorebird on iOS"
                width="800"
                height="405"
                className="shorebird-border-gray rounded-xl"
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
