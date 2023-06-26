import { motion } from 'framer-motion';

export const NewsLetter = () => {
  return (
    <section className="w-screen flex justify-center bg-shorebirdBg1 relative">
      <div className="absolute -top-16" id="newsletter" />
      <div className="pb-20 pt-12 bg-shorebirdBg1  2xl:w-[1150px] lg:w-[1050px]  md:w-4/5 ">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight sm:text-4xl">
              Get notified
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-light md:mb-12 sm:text-xl text-gray-400">
              Notify me when iOS support is available
            </p>
            <div id="mc_embed_signup">
              <form
                action="https://dev.us21.list-manage.com/subscribe/post?u=782cd1f159c245fdb1a73bfb3&amp;id=f3a2318a39&amp;f_id=007fece1f0"
                method="post"
                id="mc-embedded-subscribe-form"
                target="_self"
              >
                <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                  <div className="relative w-full">
                    <label
                      htmlFor="email"
                      className="hidden mb-2 text-sm font-medium text-gray-300"
                    >
                      Email address
                    </label>
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5  text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <input
                      className="block p-3 pl-10 w-full text-sm  rounded-lg border sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter your email"
                      type="email"
                      name="EMAIL"
                      id="mce-EMAIL"
                      required={false}
                    />
                  </div>
                  <div>
                    <button
                      id="mc-embedded-subscribe"
                      type="submit"
                      value="Subscribe"
                      name="subscribe"
                      className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
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
