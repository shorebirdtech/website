import { config } from '../config';

import { DiscordIcon } from '../assets/icons/DiscordIcon';
import { GitHubIcon } from '../assets/icons/GitHubIcon';
import { ShorebirdLogo } from '../assets/logos/ShorebirdLogo';
import { TwitterIcon } from '../assets/icons/TwitterIcon';

export const Footer = () => {
  return (
    <footer>
      <div className="pt-10  lg:pt-20 lg:pb-12 bg-shorebirdBg1 radius-for-skewed ">
        <div className="container mx-auto px-4 w-4/5 md:w-11/12 lg:w-10/12 xl:w-4/5 2xl:w-2/3">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 mb-16 lg:mb-0">
              <div className="flex justify-center lg:justify-start items-center grow basis-0">
                <div className="text-white mr-2 text-6xl">
                  <ShorebirdLogo />
                </div>
                <div className="text-white font-['Inter'] font-bold text-xl">
                  {config.app}
                </div>
              </div>
              <p className="mb-10 mt-4 sm:w-[22rem] lg:w-[20rem] xl:w-[24rem] text-gray-400 leading-loose text-center lg:text-left mx-auto lg:mx-0">
                We build products to help businesses be successful with Flutter.
              </p>
              <div className="w-36 mx-auto lg:mx-0">
                <a
                  className="inline-block w-10 h-10 mr-2 p-2 bg-shorebirdBg2 shorebird-border-gray hover:bg-gray-700 rounded-xl"
                  target="_blank"
                  aria-label="discord"
                  href={config.discordUrl}
                >
                  <DiscordIcon />
                </a>
                <a
                  className="inline-block w-10 h-10 mr-2 p-2 bg-shorebirdBg2 shorebird-border-gray hover:bg-gray-700 rounded-xl"
                  target="_blank"
                  aria-label="twitter"
                  href={config.twitterUrl}
                >
                  <TwitterIcon />
                </a>
                <a
                  className="inline-block w-10 h-10 p-2 bg-shorebirdBg2 shorebird-border-gray hover:bg-gray-700 rounded-xl"
                  target="_blank"
                  aria-label="github"
                  href={config.githubUrl}
                >
                  <GitHubIcon />
                </a>
              </div>
            </div>
            <div className="w-full lg:w-2/3 lg:pl-16 hidden lg:flex flex-wrap justify-between">
              <div className="w-full md:w-1/3 lg:w-auto mb-16 md:mb-0">
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
              <div className="w-full md:w-1/3 lg:w-auto mb-16 md:mb-0">
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
          <p className="lg:text-center text-sm text-gray-400 border-t border-[rgb(255,255,255,0.2)] pt-12 mt-16 hidden lg:block">
            &copy; 2023, Code Town Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};
