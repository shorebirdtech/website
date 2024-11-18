import { motion } from 'framer-motion';

import JungleeLogo from '../assets/brands/junglee.png';
import KijijiLogo from '../assets/brands/kijiji.png';
import TrackerLogo from '../assets/brands/tracker.png';
import ChaiLogo from '../assets/brands/chai-logo.svg';
import KalshiLogo from '../assets/brands/kalshi.webp';
import ApnaKlubLogo from '../assets/brands/apnaklub.webp';
import FlashCoLogo from '../assets/brands/flash_co.webp';
import TradelingLogo from '../assets/brands/tradeling.svg';
import InvoiceHomeLogo from '../assets/brands/invoice_home.webp';

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
    icon: KalshiLogo,
  },
  {
    name: 'ApnaKlub',
    url: 'https://www.apnaklub.com',
    icon: ApnaKlubLogo,
    includeName: true,
  },
  {
    name: "Flash.co",
    url: "https://flash.co",
    icon: FlashCoLogo,
    includeName: true,
  },
  {
    name: "Tradeling",
    url: "https://www.tradeling.com",
    image: TradelingLogo,
  },
  {
    name: "Invoice Home",
    url: "https://invoicehome.com",
    icon: InvoiceHomeLogo,
  }
];

const Marquee = ({ children }) => (
  <div className="overflow-hidden w-full">
    <div className="flex w-full">{children}</div>
  </div>
);

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
              <Marquee>
                {brands.map((brand) => (
                  <div
                    className="flex w-1/2 justify-center py-6 sm:w-1/3"
                    key={brand.name}
                  >
                    <style>
                      {`
.app-icon {
  width: 57px;
  height: 57px;
  border-radius: 9px; /* Adjust the radius as needed */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  object-fit: cover;
}
                      `}
                    </style>
                    <a target="_blank" href={brand.url}>
                      {brand.icon ? (
                        <div>
                        <img src={brand.icon.src} alt={brand.name} className='app-icon' />
                        {brand.includeName && <div className=''>{brand.name}</div>}
                        </div>
                      ) : (
                        <img src={brand.image.src} alt={brand.name} />
                      )}
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
