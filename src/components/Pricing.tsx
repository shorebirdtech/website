import { motion } from 'framer-motion';

import { config } from '../config';
import { CheckArrowIcon } from '../assets/icons/CheckArrowIcon';

const pricing: Pricing[] = [
  {
    title: 'Hobby',
    description: 'For small apps and demos.',
    price: 0,
    features: [
      { title: 'Unlimited apps' },
      { title: '1 developer' },
      { title: '5K patch installs per month' },
      { title: 'Community support' },
    ],
    cta: {
      title: 'Get Started',
      link: config.consoleUrl,
    },
  },
  {
    title: 'Team',
    description: 'For production apps that can scale.',
    price: 20,
    highlight: true,
    features: [
      { title: 'Unlimited apps' },
      { title: 'Unlimited developers' },
      {
        title: '50K patch installs per month',
        info: `$0.0003 per additional patch install<br/><a style="text-decoration: underline" href="mailto:${config.contactEmail}">Contact us</a> for bulk pricing.`,
      },
      { title: 'Discord & email support' },
    ],
    cta: {
      title: 'Get Started',
      link: config.consoleUrl,
    },
  },
  {
    title: 'Enterprise',
    description: 'For 1M+ user apps.',
    price: 'Custom',
    features: [
      { title: 'Unlimited apps' },
      { title: 'Unlimited developers' },
      { title: 'Private Support' },
    ],
    cta: {
      title: 'Schedule a call',
      link: config.contactSales,
    },
  },
];

interface CTA {
  title: string;
  link: string;
}

interface Feature {
  title: string;
  info?: string;
}

interface Pricing {
  title: string;
  description: string;
  features: Feature[];
  price?: string | number;
  cta: CTA;
  highlight?: boolean;
}

const PricingCard = (props: Pricing) => {
  return (
    <div className="w-[350px] sm:w-[380px] lg:w-3/10 px-4 mb-8 lg:mb-0">
      <div
        className={
          props.highlight &&
          'rounded-3xl bg-gradient-to-r from-blue-400 to-teal-500 via-purple-500 animate-gradient-xy p-1'
        }
      >
        <div className="h-full p-8 bg-shorebirdBg3 rounded-3xl">
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
          <p className="mt-4 mb-4 text-gray-500 leading-loose text-left">
            {props.description}
          </p>
          <ul className="mb-2 2xl:mb-6 text-white">
            {props.features.map((feature, index) => (
              <li className="mb-4 flex" key={`${feature.title}-${index}`}>
                <CheckArrowIcon />
                <span className="flex gap-1">
                  {feature.title}
                  {feature.info && (
                    <span className="tooltip-container">
                      <InfoIcon />
                      <span
                        className="tooltip"
                        dangerouslySetInnerHTML={{ __html: feature.info }}
                      ></span>
                    </span>
                  )}
                </span>
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
              <h2 className="mt-6 mb-6 text-4xl lg:text-5xl font-bold font-heading text-white">
                Join the flock
              </h2>
              <p className="mb-6 text-shorebirdTextGray">
                Deliver instant updates to your users with pricing that scales
                as you grow.
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

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}
