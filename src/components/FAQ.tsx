import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import { DivMotion } from './DivMotion';

const faqs = [
  {
    question: 'What platforms does Shorebird support?',
    answer:
      'Shorebird is designed to work everywhere Flutter does. Shorebird has production Android support and iOS in alpha. Let us know if you are interested in [desktop](https://github.com/shorebirdtech/shorebird/issues/397) or other platforms.',
  },
  {
    question: 'What does it mean that iOS is in alpha?',
    answer:
      'iOS alpha is fully App Store compliant, but not yet tuned for performance.  You may notice a slowdown in your app when using iOS alpha which will be resolved in the coming months.',
  },
  {
    question: 'Does Shorebird work for existing apps?',
    answer:
      'Yes. Shorebird requires no code changes to your Flutter app to work. See our [quick start guide](https://docs.shorebird.dev/guides/code_push_quickstart) to get started.',
  },
  {
    question: 'Does Shorebird comply with Play Store and App Store guidelines?',
    answer:
      'Yes. Shorebird has been designed to comply with Play Store and App Store guidelines. Code push is common in the industry, including several other commercial code push products from Microsoft [App Center](https://appcenter.ms), [Expo](https://expo.dev), and [Ionic](https://ionic.io/). Refer to the [FAQs](https://docs.shorebird.dev/faq#does-shorebird-comply-with-play-store-guidelines) for more info.',
  },
  {
    question: 'Can I use this in production?',
    answer:
      'Yes!  Shorebird is used in production today on Android. iOS support just launched in alpha July 2023.',
  },
  {
    question: 'Are there any limitations or known issues?',
    answer:
      'We keep a list of known issues at [https://docs.shorebird.dev/status](https://docs.shorebird.dev/status).',
  },
  {
    question: 'Can I self-host Shorebird or do you offer on-prem?',
    answer:
      'Not yet. We plan to offer on-prem in the future. [Contact us](mailto:contact@shorebird.dev) if you are interested in self-hosting.',
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
    <DivMotion>
      <div className="relative z-10 container px-2 sm:px-8 lg:px-4 mx-auto w-11/12 sm:w-full">
        <div className="md:max-w-4xl mx-auto">
          <h2 className="mb-16 shorebird-block-big-title text-center">FAQs</h2>
          <div className="mb-11 flex flex-wrap -m-1">
            {faqs.map((faq, index) => (
              <div key={index} className="w-full p-1">
                <FAQBox
                  title={faq.question}
                  content={faq.answer}
                  defaultOpen={true}
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
    </DivMotion>
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
          className={`prose prose-invert text-shorebirdTextGray pt-4 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'
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
          className={`transition-all duration-500  ${isOpen ? 'rotate-[180deg]' : 'rotate-[270deg]'
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
