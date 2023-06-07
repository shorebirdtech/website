import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

import ericHeadshot from '../assets/images/eric-headshot.jpeg';
import felixHeadshot from '../assets/images/felix-headshot.jpeg';
import bryanHeadshot from '../assets/images/bryan-headshot.png';

const team = [
  {
    name: 'Eric Seidel',
    title: 'Founder',
    bio: 'Founder of [Flutter](https://flutter.dev) & former Director of Engineering for Flutter/Dart at Google.',
    headshot: ericHeadshot,
  },
  {
    name: 'Felix Angelov',
    title: 'Founding Engineer',
    bio: 'Creator of [Bloc](https://github.com/felangel/bloc) & [Mason](https://github.com/felangel/mason). Former Principle Engineer at [Very Good Ventures](https://verygood.ventures).',
    headshot: felixHeadshot,
  },
  {
    name: 'Bryan Oltman',
    title: 'Founding Engineer',
    bio: "Former architecture lead for Google's internal-facing enterprise [Flutter](https://flutter.dev) team.",
    headshot: bryanHeadshot,
  },
];

export const Team = () => (
  <section className="w-full flex justify-center pt-10 mb-16 lg:mb-32 relative">
    <div className="absolute -top-16" id="team" />
    <div className="flex flex-col w-full lg:w-[1150px] justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="shorebird-block-subtitle text-center mb-6">
          The Team
        </div>
        <div className="shorebird-block-big-title text-center mb-16 px-8 sm:px-24 md:px-48">
          Built by Flutter experts
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-5 xl:gap-10 px-6 xl:px-0 items-center">
          {team.map((member, index) => (
            <motion.div
              className="w-11/12 sm:w-4/5 md:w-[560px] lg:w-1/3 shorebird-border-gray-darker rounded-xl bg-shorebirdBg3 text-white flex flex-col px-6 py-4"
              key={`${member.name}-${index}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            >
              <div className="flex">
                <img
                  className="rounded-xl h-[45px] w-[45px]"
                  src={member.headshot}
                  alt={`${member.name} headshot`}
                  width="45"
                  height="45"
                />
                <div className="flex flex-col justify-center ml-4">
                  <div className="font-medium text-2xl">{member.name}</div>
                </div>
              </div>
              <div className="mt-4 mb-2 xl:mt-8 xl:mb-4">
                <ReactMarkdown className="prose prose-invert text-shorebirdTextGray">
                  {member.bio}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
