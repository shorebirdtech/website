// cspell:words Seidel headshot Angelov Oltman
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

import ericHeadshot from '../assets/images/eric-headshot.jpeg';
import felixHeadshot from '../assets/images/felix-headshot.jpeg';
import bryanHeadshot from '../assets/images/bryan-headshot.png';
import tomHeadshot from '../assets/images/tom-headshot.jpg';

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
    bio: 'Creator of [Bloc](https://github.com/felangel/bloc) & [Mason](https://github.com/felangel/mason). Former Principal Engineer at [Very Good Ventures](https://verygood.ventures).',
    headshot: felixHeadshot,
  },
  {
    name: 'Bryan Oltman',
    title: 'Founding Engineer',
    bio: "Former architecture lead for Google's internal-facing enterprise [Flutter](https://flutter.dev) team.",
    headshot: bryanHeadshot,
  },
  {
    name: 'Tom Arra',
    title: 'Founding Operations Lead',
    bio: "Former Director of Product Development at [Very Good Ventures](https://verygood.ventures).",
    headshot: tomHeadshot,
  },
];

export const Team = () => (
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
          Built by Flutter experts
        </div>

        <div className="flex flex-col items-center gap-8 px-6 lg:flex-row lg:gap-5 xl:gap-10 xl:px-0">
          {team.map((member, index) => (
            <motion.div
              className="shorebird-border-gray-darker flex w-11/12 flex-col rounded-xl bg-shorebirdBg3 p-4 text-white sm:w-4/5 md:w-[560px] lg:w-1/3"
              key={`${member.name}-${index}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            >
              <div className="flex">
                <img
                  className="h-[45px] w-[45px] rounded-xl"
                  src={member.headshot.src}
                  alt={`${member.name} headshot`}
                  width="45"
                  height="45"
                />
                <div className="ml-4 flex flex-col justify-center">
                  <div className="text-2xl font-medium">{member.name}</div>
                </div>
              </div>
              <div className="mb-2 mt-4 xl:mb-4 xl:mt-8">
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
