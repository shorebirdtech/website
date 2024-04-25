import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { config } from '../config';
import { ShorebirdLogo } from '../assets/logos/ShorebirdLogo';
import { GitHubIcon } from '../assets/icons/GitHubIcon';
import { DiscordIcon } from '../assets/icons/DiscordIcon';
import { TwitterIcon } from '../assets/icons/TwitterIcon';

export interface NavbarLink {
  label: string;
  href: string;
  ariaLabel: string;
}

export interface NavbarProps {
  links?: NavbarLink[];
}

export const Navbar = (props: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed z-40 flex h-20 w-full flex-col items-center justify-center bg-shorebirdBg1 lg:bg-shorebirdBgTransparent lg:backdrop-blur-xl">
      <div className="relative flex w-11/12 items-center justify-between xl:w-10/12 2xl:w-[1280px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <a className="navbar-link" href="/" aria-label="Home">
            <div className="flex grow basis-0 items-center justify-start">
              <div className="mr-2 text-6xl text-white">
                <ShorebirdLogo />
              </div>
              <div className="font-['Inter'] text-xl font-bold text-white">
                {config.app}
              </div>
            </div>
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <div className="hidden h-full pb-2 pl-12 lg:flex">
            {props.links?.map(({ href, label, ariaLabel }) => (
              <a
                className="navbar-link"
                href={href}
                aria-label={ariaLabel}
                key={label}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <div className="hidden grow basis-0 items-center justify-end lg:flex">
            <a
              className="flex rounded-xl
           bg-shorebirdBg2 text-sm text-white"
              href={config.discordUrl}
              target="_blank"
              aria-label="discord"
            >
              <DiscordIcon />
            </a>
            <a
              className="ml-4 flex
           rounded-xl bg-shorebirdBg2 text-sm text-white"
              href={config.twitterUrl}
              target="_blank"
              aria-label="twitter"
            >
              <TwitterIcon />
            </a>
            <a
              className="ml-4 flex
           rounded-xl bg-shorebirdBg2 text-sm text-white"
              href={config.githubUrl}
              target="_blank"
              aria-label="source code"
            >
              <GitHubIcon />
            </a>
            <a
              className="ml-4 rounded-md border-2 border-slate-600 p-2 text-white hover:border-slate-400"
              href={config.consoleUrl}
              target="_blank"
              aria-label="source code"
            >
              Console
            </a>
          </div>
        </motion.div>
        {props.links ? (
          <div
            className="flex cursor-pointer flex-col  rounded-md border border-solid border-gray-600 px-2 py-3 hover:bg-shorebirdBg2 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="mb-1 h-0.5 w-5  bg-gray-500"></div>
            <div className="mb-1 h-0.5 w-5  bg-gray-500"></div>
            <div className="h-0.5 w-5 bg-gray-500 "></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* Mobile navbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute left-0 top-4 z-50 mt-16 flex w-full  flex-col items-center gap-10 
        border-y border-solid border-shorebirdBg3 bg-shorebirdBg1 pb-10 pt-10 lg:hidden
        "
            >
              <a
                className="navbar-link"
                href={config.consoleUrl}
                target="_blank"
                aria-label="source code"
              >
                Console
              </a>
              {props.links?.map(({ label, href, ariaLabel }) => (
                <a
                  key={href}
                  className="navbar-link"
                  href={href}
                  onClick={() => setIsOpen(false)}
                  aria-label={ariaLabel}
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
