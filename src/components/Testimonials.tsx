import { motion } from 'framer-motion';

import { QuoteIcon } from '../assets/icons/QuoteIcon';
import JasonRai from '../assets/testimonials/jason-rai.png';
import RenanAraujo from '../assets/testimonials/renan-araujo.png';
import TahaTesser from '../assets/testimonials/taha-tesser.png';

const testimonials = [
  {
    name: 'Jason Rai',
    title: 'Head of Frontend Engineering, Kijiji',
    quote:
      "We use Shorebird at Kijiji on Android and it's been awesome. Working well at a very large scale.",
    image: JasonRai,
  },
  {
    name: 'Renan Araujo',
    title: 'Senior Engineer, Superlist',
    quote:
      'Shorebird was very useful for distributing updates to my Flame game with over 10k players. Works like a charm.',
    image: RenanAraujo,
  },
  {
    name: 'Taha Tesser',
    title: 'Engineer, Codemagic',
    quote:
      'Shorebird solves one of the biggest challenges: bringing over-the-air updates instantly to your users. Backed by an amazing team.',
    image: TahaTesser,
  },
];

export const Testimonials = () => (
  <section className="relative flex w-full justify-center bg-shorebirdBg2 pb-20 pt-16">
    <div className="absolute -top-16" id="testimonials" />
    <div className="flex w-full flex-col justify-center lg:w-[1150px]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h2 className="mb-6 mt-6 text-center text-4xl font-bold text-white lg:text-5xl">
          Testimonials
        </h2>
        <p className="mb-6 text-center text-shorebirdTextGray">
          See what the community has to say about Shorebird.
        </p>

        <div className="mt-20 flex flex-col items-center gap-8 px-6 lg:flex-row lg:gap-5 xl:gap-10 xl:px-0">
          {testimonials.map((testimonial, index) => (
            <div
              className="flex w-11/12 flex-col rounded-xl bg-shorebirdBg3 px-6 py-4 text-white sm:w-4/5 md:w-[560px] lg:w-1/3"
              key={`${testimonial.name}-${index}`}
            >
              <div className="mb-2 flex">
                <QuoteIcon />
              </div>
              <div className="text-white">"{testimonial.quote}"</div>
              <div className="mb-2 mt-4 flex xl:mb-4 xl:mt-8">
                <div>
                  <img
                    className="rounded-full"
                    src={testimonial.image.src}
                    alt="customer"
                    width="45px"
                    height="5px"
                    aria-label={testimonial.name}
                  />
                </div>
                <div className="ml-4 flex flex-col">
                  <div className="font-medium text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-shorebirdTextGray">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
