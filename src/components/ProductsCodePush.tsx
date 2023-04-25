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
      <div className="custom-shape-divider-bottom-code-push">
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className=" 2xl:w-[1150px] xl:w-[1050px]  md:w-4/5 flex justify-center bg-shorebirdBg1 pt-12 lg:pt-24 pb-8 lg:pb-20 mx-auto lg:flex-row flex-col">
          <div className="w-3/4 lg:w-1/2 flex flex-col lg:mx-unset mx-auto">
            <span className="shorebird-block-subtitle">
              Code Push for Flutter
            </span>
            <h2 className="mt-10 mb-8 text-4xl lg:text-5xl shorebird-block-big-title">
              Deploy app updates instantly.
            </h2>
            <p className="mb-16 text-shorebirdTextGray leading-loose">
              Code Push is a cloud service provided by Shorebird that allows
              developers to push app updates directly to users' devices.
            </p>
            <ul className="mb-6 text-white">
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Updates are delivered instantly</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Diffs are generated to reduce download sizes</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Patches are hashed and checked for integrity</span>
              </li>
            </ul>
            <a
              target="_blank"
              href={config.docsUrl}
              className="w-[210px] h-12 shorebird-button-colored mr-10 "
            >
              Get Started
            </a>
          </div>
          <div className="w-4/5 lg:w-2/3 lg:pl-16 flex justify-center mx-auto pt-16 lg:pt-0">
            <img
              src={init}
              alt="f1"
              className="rounded-xl  shorebird-border-gray"
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
