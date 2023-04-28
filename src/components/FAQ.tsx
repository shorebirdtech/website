import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'Can my company use Shorebird?',
    answer:
      'Yes! In fact we would like to help your team integrate Shorebird into your apps! Please [contact us](mailto:contact@shorebird.dev) - we are happy to work with you.',
    isOpen: true,
  },
  {
    question: 'Does Shorebird work everywhere Flutter does?',
    answer:
      'Not yet. Shorebird is designed to work everywhere Flutter does, but we chose to focus on Android first. Let us know if you are interested in [iOS](https://github.com/shorebirdtech/shorebird/issues/381), [desktop](https://github.com/shorebirdtech/shorebird/issues/397), or other support.',
  },
  {
    question: 'Does Shorebird comply with Play Store guidelines?',
    answer:
      'Yes. Shorebird has been designed to comply with Play Store guidelines. Code push is common in the industry, including several other commercial code push products from Microsoft [app center](https://appcenter.ms), [Expo](https://expo.dev), and [Ionic](https://ionic.io/). [More info](https://docs.shorebird.dev/faq#does-shorebird-comply-with-play-store-guidelines).',
  },
  {
    question: 'Can I use this in production?',
    answer:
      'Yes!  Shorebird is used in production today. If you have any concerns we are happy to meet with you and/or discuss your concerns live [on Discord](https://discord.gg/9hKJcWGcaB).',
  },
  {
    question: 'Are there any limitations or known issues?',
    answer:
      'We keep a list of known issues at [https://docs.shorebird.dev/status](https://docs.shorebird.dev/status).',
  },
  {
    question: 'Is there a free tier?',
    answer:
      'Shorebird does not yet support a free tier, but we plan to [add one soon](https://github.com/shorebirdtech/shorebird/issues/396). We expect to re-work our pricing structure in the coming months as we better understand customer needs and our own costs.',
  },
  {
    question:
      'How does this relate to Firebase Remote Config or Launch Darkly?',
    answer:
      'Code push allows adding new code / replacing code on the device. Firebase Remote Config and Launch Darkly are both configuration systems. They allow you to change the configuration of your app without having to ship a new version. They are not intended to replace code.',
  },
  {
    question: 'How does this relate to Flutter Hot Reload?',
    answer:
      "Flutter's Hot reload is a development-time-only feature. Code push is for production. Hot reload is a feature of Flutter that allows you to change code on the device during development. It requires building the Flutter engine with a debug-mode Dart VM which includes a just-in-time (JIT) Dart compiler. Code push is a feature that allows you to change code on the device in production. We will use a variety of different techniques to make this possible depending on the platform. Current demos execute ahead-of-time compiled Dart code and do not require a JIT Dart compiler.",
  },
  {
    question: 'Where is the roadmap?',
    answer:
      'Shorebird is developed entirely in the public, including our [project boards](https://github.com/shorebirdtech/shorebird/projects) shows what we are currently working on.',
  },
];

export const FAQ = () => (
  <section className="relative pt-16 pb-16 bg-blueGray-50 overflow-hidden">
    <div className="absolute -top-10" id="faq" />
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
        <ReactMarkdown
          className={`prose prose-invert text-shorebirdTextGray pt-4 transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96' : 'max-h-0'
          }`}
          children={`${content}`}
        ></ReactMarkdown>
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
