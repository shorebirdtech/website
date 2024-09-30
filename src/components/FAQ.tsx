import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';

const faqs = [
  {
    question: 'What platforms does Shorebird support?',
    answer:
      'iOS and Android. Shorebird is designed to go anywhere Flutter can. If you are interested in [desktop](https://github.com/shorebirdtech/shorebird/issues/397) or other platforms, let us know.',
  },
  {
    question: 'Does Shorebird work for existing apps?',
    answer:
      'Yes. Shorebird requires no code changes to your Flutter app to adopt. See our [quick start guide](https://docs.shorebird.dev/guides/code_push_quickstart) to get started.',
  },
  {
    question: 'Does Shorebird comply with Play Store and App Store guidelines?',
    answer:
      'Yes. Shorebird has been designed to comply with Play Store and App Store guidelines. Code push is common in the industry, including several other commercial update products from Microsoft [App Center](https://appcenter.ms), [Expo](https://expo.dev), and [Ionic](https://ionic.io/). Refer to the [FAQs](https://docs.shorebird.dev/faq#does-shorebird-comply-with-play-store-guidelines) for more info.',
  },
  {
    question: 'Can I use this in production?',
    answer:
      'Yes! Shorebird is production ready on iOS and Android and has been used in production by thousands of apps since early 2023.  We safely deliver millions of patches every month on behalf of our customers.',
  },
  {
    question: 'Can Shorebird see my source code?',
    answer:
      'No. Shorebird never stores or transmits your source code. See our [documentation](https://docs.shorebird.dev/faq/#does-shorebird-store-my-source-code) for more information.',
  },
  {
    question: 'Are there any limitations or known issues?',
    answer:
      'We keep a list of known issues at [https://docs.shorebird.dev/status](https://docs.shorebird.dev/status).',
  },
  {
    question: 'Can I self-host Shorebird or do you offer on-prem?',
    answer:
      'No. Shorebird only offers a centrally hosted solution at this time.',
  },
  {
    question: 'Where is the roadmap?',
    answer:
      'Shorebird is developed entirely in the public, including our [project boards](https://github.com/orgs/shorebirdtech/projects) shows what we are currently working on.',
  },
];

export const FAQ = () => (
  <section className="bg-blueGray-50 relative overflow-hidden pb-16 pt-16">
    <div className="absolute -top-10" id="faq" />
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container relative z-10 mx-auto w-11/12 px-2 sm:w-full sm:px-8 lg:px-4">
        <div className="mx-auto md:max-w-4xl">
          <h2 className="shorebird-block-big-title mb-16 text-center">FAQs</h2>
          <div className="-m-1 mb-11 flex flex-wrap">
            {faqs.map((faq, index) => (
              <div key={index} className="w-full p-1">
                <FAQBox
                  title={faq.question}
                  content={faq.answer}
                  defaultOpen={false}
                />
              </div>
            ))}
          </div>
          <div>
            <p className="text-center text-white">
              For additional questions,{' '}
              <a
                target="_blank"
                className="underline"
                href="https://docs.shorebird.dev/faq"
              >
                see our docs
              </a>{' '}
              or{' '}
              <a target="_blank" className="underline" href={config.discordUrl}>
                ask us on Discord.
              </a>
            </p>
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
      className="shorebird-border-gray-darker relative mb-4 cursor-pointer rounded-3xl bg-shorebirdBg3 px-3 pb-2 pt-2 hover:bg-shorebirdBg3Hover sm:px-8 sm:pt-6"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-col items-start justify-center p-2">
        <h3 className="shorebird-content-title pr-8 pt-3 sm:pr-0 sm:pt-0">
          {title}
        </h3>
        <ReactMarkdown
          className={`prose prose-invert overflow-hidden pt-4 text-shorebirdTextGray transition-all duration-300 ${
            isOpen ? 'max-h-96' : 'max-h-0'
          }`}
          children={`${content}`}
        ></ReactMarkdown>
      </div>
      <div className="absolute right-4 top-6 sm:right-8 sm:top-8">
        <svg
          width="28px"
          height="30px"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-500 ${
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
