import { config } from '../config';

import { DiscordIcon } from '../assets/icons/DiscordIcon';
import { GitHubIcon } from '../assets/icons/GitHubIcon';
import { ShorebirdLogo } from '../assets/logos/ShorebirdLogo';
import { TwitterIcon } from '../assets/icons/TwitterIcon';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="radius-for-skewed  bg-shorebirdBg1 pt-10 lg:pb-12 lg:pt-20 ">
        <div className="container mx-auto w-4/5 px-4 md:w-11/12 lg:w-10/12 xl:w-4/5 2xl:w-2/3">
          <div className="flex flex-wrap">
            <div className="mb-16 w-full lg:mb-0 lg:w-1/3">
              <div className="flex grow basis-0 items-center justify-center lg:justify-start">
                <div className="mr-2 text-6xl text-white">
                  <ShorebirdLogo />
                </div>
                <div className="font-['Inter'] text-xl font-bold text-white">
                  {config.app}
                </div>
              </div>
              <p className="mx-auto mb-10 mt-4 text-center leading-loose text-gray-400 sm:w-[22rem] lg:mx-0 lg:w-[20rem] lg:text-left xl:w-[24rem]">
                We build products to help businesses be successful with Flutter.
              </p>
              <div className="mx-auto w-36 lg:mx-0">
                <a
                  className="shorebird-border-gray mr-2 inline-block h-10 w-10 rounded-xl bg-shorebirdBg2 p-2 hover:bg-gray-700"
                  target="_blank"
                  aria-label="discord"
                  href={config.discordUrl}
                >
                  <DiscordIcon />
                </a>
                <a
                  className="shorebird-border-gray mr-2 inline-block h-10 w-10 rounded-xl bg-shorebirdBg2 p-2 hover:bg-gray-700"
                  target="_blank"
                  aria-label="twitter"
                  href={config.twitterUrl}
                >
                  <TwitterIcon />
                </a>
                <a
                  className="shorebird-border-gray inline-block h-10 w-10 rounded-xl bg-shorebirdBg2 p-2 hover:bg-gray-700"
                  target="_blank"
                  aria-label="github"
                  href={config.githubUrl}
                >
                  <GitHubIcon />
                </a>
              </div>
            </div>
            <div className="hidden w-full flex-wrap justify-between lg:flex lg:w-2/3 lg:pl-16">
              <div className="mb-16 w-full md:mb-0 md:w-1/3 lg:w-auto">
                <h3 className="mb-6 text-2xl font-bold text-white">Develop</h3>
                <ul>
                  <li className="mb-4">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-gray-300"
                      href="https://docs.shorebird.dev"
                      aria-label="documentation"
                    >
                      Documentation
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-gray-300"
                      href="https://console.shorebird.dev"
                      aria-label="console"
                    >
                      Console
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/3 lg:w-auto">
                <h3 className="mb-6 text-2xl font-bold text-white">Company</h3>
                <ul>
                  <li className="mb-4">
                    <a
                      className="text-gray-400 hover:text-gray-300"
                      href={`mailto:${config.contactEmail}`}
                      aria-label="contact us"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-400 hover:text-gray-300"
                      href="/jobs"
                      aria-label="jobs"
                    >
                      Jobs
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mb-16 w-full md:mb-0 md:w-1/3 lg:w-auto">
                <h3 className="mb-6 text-2xl font-bold text-white">Legal</h3>
                <ul>
                  <li className="mb-4">
                    <a
                      className="text-gray-400 hover:text-gray-300"
                      href="/terms"
                      aria-label="terms of use"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-400 hover:text-gray-300"
                      href="/privacy"
                      aria-label="privacy policy"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-16 hidden border-t border-[rgb(255,255,255,0.2)] pt-12 text-sm text-gray-400 lg:block lg:text-center">
            &copy; {currentYear}, Code Town Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};
