import { motion } from 'framer-motion';

import ericHeadshot from '../assets/images/eric-headshot.jpeg';
import felixHeadshot from '../assets/images/felix-headshot.jpeg';
import bryanHeadshot from '../assets/images/bryan-headshot.png';

const team = [
  {
    name: 'Eric Seidel',
    title: 'Founder of Shorebird',
    bio: 'Founder of Flutter and former Director of Engineering for Flutter & Dart at Google.',
    headshot: ericHeadshot,
  },
  {
    name: 'Felix Angelov',
    title: 'Founding Engineer',
    bio: 'Former Head of Open Source at Very Good Ventures.',
    headshot: felixHeadshot,
  },
  {
    name: 'Bryan Oltman',
    title: 'Founding Engineer',
    bio: "Former architecture lead for Google's internal-facing enterprise Flutter team.",
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
          Established by leaders in the Flutter community
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
                  className="rounded-xl"
                  src={member.headshot}
                  alt={`${member.name} headshot`}
                  width="45px"
                />
                <div className="flex flex-col ml-4">
                  <div className="font-medium">{member.name}</div>
                  <div>{member.title}</div>
                </div>
              </div>
              <div className="mt-4 mb-2 xl:mt-8 xl:mb-4">{member.bio}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
