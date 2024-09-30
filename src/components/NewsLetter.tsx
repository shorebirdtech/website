import { motion } from 'framer-motion';

export const NewsLetter = () => {
  return (
    <section className="relative flex w-screen justify-center bg-shorebirdBg1">
      <div className="absolute -top-16" id="newsletter" />
      <div className="bg-shorebirdBg1 pb-20 pt-12 md:w-4/5 lg:w-[1050px] 2xl:w-[1150px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Get notified
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-light text-gray-400 sm:text-xl md:mb-12">
              Stay in the know with updates from Shorebird.
            </p>
            <div id="mc_embed_signup">
              <form
                action="https://dev.us21.list-manage.com/subscribe/post?u=782cd1f159c245fdb1a73bfb3&amp;id=f3a2318a39&amp;f_id=007fece1f0"
                method="post"
                id="mc-embedded-subscribe-form"
                target="_self"
              >
                <div className="mx-auto mb-3 max-w-screen-sm items-center space-y-4 sm:flex sm:space-y-0">
                  <div className="relative w-full">
                    <label
                      htmlFor="mce-EMAIL"
                      className="mb-2 hidden text-sm font-medium text-gray-300"
                    >
                      Email address
                    </label>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <input
                      className="focus:ring-primary-500 focus:border-primary-500 focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-3 pl-10 text-sm text-white placeholder-gray-400 sm:rounded-none sm:rounded-l-lg"
                      placeholder="Enter your email"
                      type="email"
                      name="EMAIL"
                      id="mce-EMAIL"
                      autoComplete="email"
                      required={false}
                    />
                  </div>
                  <div>
                    <button
                      id="mc-embedded-subscribe"
                      type="submit"
                      value="Subscribe"
                      name="subscribe"
                      className="bg-primary-700 border-primary-600 hover:bg-primary-800 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 w-full cursor-pointer rounded-lg border px-5 py-3 text-center text-sm font-medium text-white focus:ring-4 sm:rounded-none sm:rounded-r-lg"
                    >
                      Subscribe
                    </button>
                    {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="b_782cd1f159c245fdb1a73bfb3_f3a2318a39"
                        tabIndex={-1}
                        value=""
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
