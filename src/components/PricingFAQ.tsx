import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';

const faqs = [
  {
    question: 'How many patch installs will I use?',
    answer:
      'You are only billed for successful patch installs.  \
    This occurs when the user opens your app with the new patch installed.  \
    A rule of thumb is number of patches per month times number of monthly active users.  \
    If you have 1000 MAU and you ship 4 patches per month, you will likely use about 4000 patch installs.',
  },
  {
    question: 'Do you offer discounts?',
    answer:
      'We offer committed use discounts for customers who commit to a certain number of patch installs per month.  We offer committed usage discounts starting at 2.5M patches per month.',
  },
  {
    question: 'How much are your Enterprise plans?',
    answer:
      'We offer our enterprise services starting at $2,000 per month.  Below that level we recommend our self-service plans.',
  },
  {
    question: 'Do patch installs expire?',
    answer:
      'Yes, patch install credits expire at the end of each billing period, typically one month.  We do not offer rollover credits.',
  },
  {
    question: 'Can I pay annually?',
    answer:
      'Customers using committed use discounts can choose to pay annually.  We do not offer annual billing for self-service plans.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept any method of payment Stripe accepts in your region.  Enterprise customers can also pay by invoice.',
  },
  {
    question: 'When am I charged for patch installs?',
    answer:
      'At the start of each billing period, you are billed for your pre-paid patches. \
       In the case of a Pro plan, this includes 50,000 pre-paid patch installs. \
      "Overage" patch installs are billed at the end of each billing period. \
      The initial invoice (month 1) will only include the prepaid patches, however successive months will include \
      overage bills as well.  For example, if you are using the Pro plan \
      (includes 50,000 pre-paid patches), and you use 100,000 patch installs each month, \
      you will be charged $20 when you sign up, and then $40 at the beginning of month 2 \
      ($20 for the 50,000 overage, and $20 for Month 2\'s Pro plan). \
      You can always check the status of your account and billing at \
      https://console.shorebird.dev/account.',
  },
];

export const PricingFAQ = () => (
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
