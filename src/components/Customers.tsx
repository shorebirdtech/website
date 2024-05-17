import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

import kijijiLogo from '../assets/customer_logos/kijiji.svg';
import jungleeGamesLogo from '../assets/customer_logos/junglee_games_white.png';
import felloLogo from '../assets/customer_logos/fello_white.png';
import trackerLogo from '../assets/customer_logos/tracker.svg';

const customers = [
  {
    name: 'Kijiji',
    tagline: "Canada's largest classifieds site",
    logo: kijijiLogo,
  },
  {
    name: 'Junglee Games',
    tagline: "India's fastest growing gaming company",
    logo: jungleeGamesLogo,
  },
  {
    name: 'Fello',
    tagline: "India's Largest Rewarding and Savings app",
    logo: felloLogo,
  },
  {
    name: 'Tracker',
    tagline: 'Best communication system for hunters and outdoor enthusiasts.',
    logo: trackerLogo,
  },
];

export const Customers = () => (
  <section className="relative mb-16 flex w-full justify-center pt-10 lg:mb-32">
    <div className="absolute -top-16" id="team" />
    <div className="flex w-full flex-col justify-center lg:w-[1150px]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="shorebird-block-big-title mb-16 px-8 text-center sm:px-24 md:px-48">
          Thousands of developers trust Shorebird to deliver millions of patches
          each month.
        </div>

        <div className="flex flex-col items-center gap-8 px-6 lg:flex-row lg:gap-5 xl:gap-10 xl:px-0">
          {customers.map((member, index) => (
            <motion.div
              className="flex w-11/12 flex-col p-4 text-white sm:w-4/5 md:w-[560px] lg:w-1/3"
              key={`${member.name}-${index}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            >
              <img
                src={member.logo.src}
                alt={`${member.name} logo`}
                max-width="100"
              />
              <div className="mb-2 mt-4 xl:mb-4 xl:mt-8">
                <ReactMarkdown className="prose prose-invert text-shorebirdTextGray">
                  {member.tagline}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
