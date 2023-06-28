import { motion } from 'framer-motion';

import init from '../assets/images/init.png';
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
            <h2 className="mt-10 mb-8 text-4xl lg:text-5xl shorebird-block-big-title">
              Deploy app updates instantly
            </h2>
            <p className="mb-8 text-shorebirdTextGray leading-loose">
              Code push is a cloud service that allows developers to push app
              updates directly to users' devices.
            </p>
            <ul className="mb-6 text-white">
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Integrate in minutes</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Push updates to any Dart code</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>
                  Supports all Android devices,{' '}
                  <span className="underline font-bold">
                    <a href="#newsletter">iOS launching July 2023</a>
                  </span>
                </span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row">
              <a
                target="_blank"
                href={config.docsUrl}
                className="shorebird-button-colored w-full h-12 mr-0 sm:mr-4 lg:mr-4 mb-2 sm:mb-0"
              >
                Get Started
              </a>              
            </div>
          </div>
          <div className="w-4/5 lg:w-2/3 lg:pl-16 flex justify-center mx-auto pt-16 lg:pt-0 ">
            <img
              src={init}
              alt="Get Started with Shorebird"
              width="800"
              height="933"
              className="rounded-xl shorebird-border-gray"
            />
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
