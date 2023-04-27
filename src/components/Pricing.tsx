import { motion } from 'framer-motion';

import { config } from '../config';
import { CheckArrowIcon } from '../assets/icons/CheckArrowIcon';

const pricing: Pricing[] = [
  {
    title: 'Open Beta',
    description: 'For early adopters with a sense of adventure.',
    price: 20,
    features: [
      '10 apps',
      'Up to 1,000,000 users',
      'Access to private Discord',
      'Live support',
    ],
    cta: {
      title: 'Get Started',
      link: config.docsUrl,
    },
  },
  {
    title: 'Enterprise',
    description: 'For teams that need dedicated support.',
    price: 'Contact Us',
    features: [
      'Unlimited apps',
      'Unlimited users',
      'Dedicated support team',
      'Priority feature requests',
    ],
    cta: {
      title: 'Book a Demo',
      link: config.calendly,
    },
  },
];

interface CTA {
  title: string;
  link: string;
}

interface Pricing {
  title: string;
  description: string;
  features: string[];
  price: number | string;
  cta: CTA;
}

const PricingCard = (props: Pricing) => {
  return (
    <div className="w-[350px] sm:w-[380px] lg:w-1/3 px-4 mb-8 lg:mb-0">
      <div className="p-8 bg-shorebirdBg3 rounded-3xl">
        <p className="mb-2 text-xl font-bold font-heading text-white text-left">
          {props.title}
        </p>
        <div className="flex justify-start items-end">
          {typeof props.price == 'number' ? (
            <>
              <div className="text-4xl sm:text-5xl font-bold text-white text-left mt-4 mr-2">
                ${props.price}
              </div>
              <div className="text-gray-500">{'/ month'}</div>
            </>
          ) : (
            <div className="text-3xl sm:text-4xl font-bold text-white text-left mt-4 mr-2 mb-2">
              {props.price}
            </div>
          )}
        </div>
        <p className="mt-4 mb-6 2xl:mb-10 text-gray-500 leading-loose text-left">
          {props.description}
        </p>
        <ul className="mb-2 2xl:mb-6 text-white">
          {props.features.map((text, index) => (
            <li className="mb-4 flex" key={`${text}-${index}`}>
              <CheckArrowIcon />
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <a
          target="_blank"
          href={props.cta.link}
          className="inline-block text-center py-2 px-4 w-full rounded-xl rounded-t-xl shorebird-button-colored font-bold leading-loose mt-8"
        >
          {props.cta.title}
        </a>
      </div>
    </div>
  );
};

export const Pricing = () => {
  return (
    <section className="w-screen flex justify-center bg-shorebirdBg2 relative">
      <div className="absolute -top-16" id="pricing" />
      <div className="pb-20 pt-12 bg-shorebirdBg2  2xl:w-[1150px] lg:w-[1050px]  md:w-4/5 ">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="shorebird-block-subtitle">Pricing</span>
              <h2 className="mt-6 mb-6 text-4xl lg:text-5xl font-bold font-heading text-white">
                Join the flock
              </h2>
              <p className="mb-6 text-shorebirdTextGray">
                As a paying customer, you will get access to code push, our
                private discord, live support, and more!
              </p>
            </div>
            <div className="flex flex-wrap flex-col lg:flex-row -mx-4 items-center justify-center mt-20">
              {pricing.map((item, index) => (
                <PricingCard {...item} key={`pricing-card-${index}`} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
