import { motion } from 'framer-motion';

import { Marquee } from '~/components/ui/Marquee';

import ApnaKlubLogo from '../assets/brands/apna-klub.png';
import ChaiLogo from '../assets/brands/chai.png';
import FlashCoLogo from '../assets/brands/flash-co.png';
import InvoiceHomeLogo from '../assets/brands/invoice-home.png';
import JungleeLogo from '../assets/brands/junglee.png';
import KalshiLogo from '../assets/brands/kalshi.png';
import KijijiLogo from '../assets/brands/kijiji.png';
import TrackerLogo from '../assets/brands/tracker.png';
import TradelingLogo from '../assets/brands/tradeling.png';

const brands = [
  {
    name: 'Junglee Games',
    url: 'https://www.jungleegames.com',
    image: JungleeLogo,
  },
  {
    name: 'Kijiji',
    url: 'https://www.kijiji.ca',
    image: KijijiLogo,
  },
  {
    name: 'Tracker',
    url: 'https://tracker.fi',
    image: TrackerLogo,
  },
  {
    name: 'CHAI',
    url: 'https://chai-research.com/',
    image: ChaiLogo,
  },
  {
    name: 'Kalshi',
    url: 'https://kalshi.com',
    image: KalshiLogo,
  },
  {
    name: 'ApnaKlub',
    url: 'https://www.apnaklub.com',
    image: ApnaKlubLogo,
  },
  {
    name: 'Flash.co',
    url: 'https://flash.co',
    image: FlashCoLogo,
  },
  {
    name: 'Tradeling',
    url: 'https://www.tradeling.com',
    image: TradelingLogo,
  },
  {
    name: 'Invoice Home',
    url: 'https://invoicehome.com',
    image: InvoiceHomeLogo,
  },
];

export const Brands = () => (
  <section className="mb-8 w-full bg-shorebirdBg3 py-12 sm:py-24 lg:mb-16 lg:mt-16">
    <div className="absolute -top-16" id="brands" />
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto px-4 md:w-4/5 lg:w-[1000px] xl:w-[1100px] 2xl:w-[1200px]">
        <div className="-mx-4 flex flex-col items-center justify-center text-center lg:flex-row lg:text-left">
          <div className="mb-12 w-full px-4 lg:mb-0 lg:w-1/2">
            <div className="flex flex-col">
              <h2 className="shorebird-block-big-title mb-2 font-bold tracking-normal">
                Trusted by brands
              </h2>
              <h2 className="shorebird-block-big-title-primary mb-2 font-bold tracking-normal">
                all over the world
              </h2>
            </div>
          </div>
          <div className="mx-auto w-2/3 sm:w-[620px] lg:mx-0 lg:w-1/2 lg:pl-10">
            <div className="-m-4 flex flex-col flex-wrap items-center lg:flex-row">
              <Marquee fade={true} direction="left" reverse={false}>
                {brands.map((brand) => (
                  <div
                    className="flex max-w-32 justify-center py-6 md:max-w-48"
                    key={brand.name}
                  >
                    <a target="_blank" href={brand.url}>
                      <img src={brand.image.src} alt={brand.name} />
                    </a>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);
