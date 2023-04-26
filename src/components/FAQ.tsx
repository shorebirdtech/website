import { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'What is code push?',
    answer: `
      Code push, also referred to as "over the air updates" (OTA) is a cloud service
      we are building to enable Flutter developers to deploy updates directly to
      devices anywhere they have shipped Flutter.
    `,
    isOpen: true,
  },
  {
    question:
      'How does this relate to Firebase Remote Config or Launch Darkly?',
    answer: `
    Code push allows adding new code / replacing code on the device.  Firebase
    Remote Config and Launch Darkly are both configuration systems.  They allow you
    to change the configuration of your app without having to ship a new version.
    They are not intended to replace code.
    `,
  },
  {
    question: 'How does this relate to Flutter Hot Reload?',
    answer: `
    Flutter's Hot reload is a development-time-only feature.  Code push is for
    production.
    
    Hot reload is a feature of Flutter that allows you to change code on the device
    during development.  It requires building the Flutter engine with a debug-mode
    Dart VM which includes a just-in-time (JIT) Dart compiler.
    
    Code push is a feature that allows you to change code on the device in
    production.  We will use a variety of different techniques to make this possible
    depending on the platform.  Current demos execute ahead-of-time compiled Dart
    code and do not require a JIT Dart compiler.
    `,
  },
  {
    question: 'Does code push require the internet to work?',
    answer: `
      Yes. One could imagine running a server to distribute the updates separately
      from the general internet, but some form of network connectivity is required to
      transport updates to the devices.
    `,
  },
  {
    question:
      "What happens if a user doesn't update for a long time and misses an update?",
    answer: `
      Our current designs for code push send the current app version & code signature
      as part of the update request.  Thus the update server could be written to
      respond with either the next incremental version or the latest version depending
      on your application's needs.  The current demo always sends the latest version
      but this logic would not be hard to add.
    `,
  },
];

export const FAQ = () => (
  <section className="relative pt-16 pb-16 bg-blueGray-50 overflow-hidden">
    <div className="absolute -top-10" id="FAQ" />
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative z-10 container px-2 sm:px-8 lg:px-4 mx-auto w-11/12 sm:w-full">
        <div className="md:max-w-4xl mx-auto">
          <p className="mb-7 shorebird-block-subtitle text-center">
            Have any questions?
          </p>
          <h2 className="mb-16 shorebird-block-big-title text-center">FAQs</h2>
          <div className="mb-11 flex flex-wrap -m-1">
            {faqs.map((faq, index) => (
              <div key={index} className="w-full p-1">
                <FAQBox
                  title={faq.question}
                  content={faq.answer}
                  defaultOpen={faq.isOpen}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const FAQBox = ({ defaultOpen, title, content }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="pt-2 sm:pt-6 pb-2 px-3 sm:px-8  rounded-3xl bg-shorebirdBg3 shorebird-border-gray-darker mb-4 relative hover:bg-shorebirdBg3Hover cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-col p-2  justify-center items-start">
        <h3 className=" shorebird-content-title pt-3 sm:pt-0 pr-8 sm:pr-0">
          {title}
        </h3>
        <p
          className={`text-shorebirdTextGray pt-4 transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          {content}
        </p>
      </div>
      <div className="absolute top-6 right-4 sm:top-8 sm:right-8">
        <svg
          width="28px"
          height="30px"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-500  ${
            isOpen ? 'rotate-[180deg]' : 'rotate-[270deg]'
          }`}
        >
          <path
            d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
            stroke="#0196C0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  );
};
