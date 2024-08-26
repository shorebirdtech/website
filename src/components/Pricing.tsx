import { motion } from 'framer-motion';

import { config } from '../config';
import { CheckArrowIcon } from '../assets/icons/CheckArrowIcon';
import { useState } from 'react';

interface Feature {
  title: string;
}

interface Price {
  amount: string;
  quantity: string;
}

export const Pricing = () => {
  return (
    <section className="relative flex w-screen justify-center bg-shorebirdBg2">
      <div className="absolute -top-16" id="pricing" />
      <div className="bg-shorebirdBg2 pb-20 pt-12 md:w-4/5 lg:w-[1050px] 2xl:w-[1150px] ">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-6 mt-6 text-4xl font-bold text-white lg:text-5xl">
                Join the flock
              </h2>
              <p className="mb-6 text-shorebirdTextGray">
                Deliver instant updates to your users with pricing that scales
                as you grow.
              </p>
            </div>
            <div className="mt-20 flex flex-col flex-wrap items-center justify-center gap-4 lg:flex-row">
              <HobbyPlan />
              {/* <TeamPlan /> */}
              <PayAsYouGoPlan />
              <EnterprisePlan />
            </div>
          </div>
          <PricesNote />
        </motion.div>
      </div>
    </section>
  );
};

function PricesNote() {
  return (
    <div className="mx-auto mb-8 mt-6 max-w-2xl px-8 text-center text-sm text-shorebirdTextGray">
      <p>
        *Prices are quoted in USD and sold as "patch installs per month",
        reflecting successful installs of a given patch. For example, 1 patch
        pushed to 10 devices is 10 installs. 2 patches pushed to 5 devices is
        also 10 installs.
      </p>
    </div>
  );
}

function HobbyPlan() {
  const features: Feature[] = [
    { title: 'Unlimited apps' },
    { title: '1 developer' },
    { title: '5K patch installs/month' },
    { title: 'Community support' },
  ];
  return (
    <div className="mb-8 w-[325px] px-1 lg:mb-0">
      <div>
        <div className="h-full rounded-3xl bg-shorebirdBg3 p-6">
          <p className="mb-2 text-left text-xl font-bold text-white">Hobby</p>
          <div className="flex items-end justify-start">
            <div className="mr-2 mt-4 text-left text-4xl font-bold text-white sm:text-5xl">
              $0
            </div>
            <div className="text-gray-500">{'/ month'}</div>
          </div>
          <p className="mb-4 mt-4 text-left leading-loose text-gray-500">
            For small apps and demos.
          </p>
          <ul className="mb-2 text-white 2xl:mb-6">
            {features.map((feature, index) => (
              <FeatureListItem
                key={`hobby-feature-${index}`}
                title={feature.title}
              />
            ))}
          </ul>
          <a
            target="_blank"
            href={config.consoleUrl}
            className="plausible-event-name=Hobby+Get+Started+Button+Clicked shorebird-button-primary mt-8 inline-block w-full rounded-xl rounded-t-xl px-4 py-2 text-center font-bold leading-loose"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

function PriceSlider({
  prices,
  onChange,
}: {
  prices: Price[];
  onChange: (price: Price) => void;
}) {
  const [priceIndex, setPriceIndex] = useState(0);
  const price = prices[priceIndex];
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-end">
        <div className="mr-2 mt-4 text-left text-4xl font-bold text-white sm:text-5xl">
          {price.amount}
        </div>
        <div className="justify-end text-gray-500">{'/ month'}</div>
      </div>
      <div className="h-4"></div>
      <input
        type="range"
        min={0}
        aria-label="Price slider"
        max={prices.length - 1}
        value={priceIndex}
        onChange={(e) => {
          const index = parseInt(e.target.value);
          setPriceIndex(index);
          onChange(prices[index]);
        }}
      ></input>
    </div>
  );
}

function PayAsYouGoPlan() {
  const features: Feature[] = [
    { title: 'Unlimited apps' },
    { title: 'Unlimited developers' },
    { title: '50K patch installs/month included' },
    { title: 'Control exactly how much you spend' },
    { title: 'Community support' },
  ];
  return (
    <div className="mb-8 w-[325px] px-1 lg:mb-0">
      <div>
        <div className="h-full rounded-3xl bg-shorebirdBg3 p-6">
          <p className="text-left text-xl font-bold text-white">
            Teams
          </p>
          <div className="flex items-end justify-start">
            <div className="mr-2 mt-4 text-left text-4xl font-bold text-white sm:text-5xl">
              $20
            </div>
            <div className="text-gray-500">{'/ month'}</div>
          </div>
          <p className="mb-4 text-left text-xs leading-loose text-gray-500">
            then $1 per 2,500 patch installs.
          </p>
          <p className="mb-4 mt-4 text-left leading-loose text-gray-500">
            For apps that can scale.
          </p>
          <ul className="mb-2 text-white 2xl:mb-6">
            {features.map((feature, index) => (
              <FeatureListItem
                key={`hobby-feature-${index}`}
                title={feature.title}
              />
            ))}
          </ul>
          <a
            target="_blank"
            href={config.consoleUrl}
            className="plausible-event-name=Pay+as+you+go+Get+Started+Button+Clicked shorebird-button-primary mt-8 inline-block w-full rounded-xl rounded-t-xl px-4 py-2 text-center font-bold leading-loose"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

function TeamPlan() {
  const prices: Price[] = [
    {
      amount: '$20',
      quantity: '50K',
    },
    {
      amount: '$100',
      quantity: '300K',
    },
    {
      amount: '$300',
      quantity: '1M',
    },
    {
      amount: '$700',
      quantity: '2.5M',
    },
    {
      amount: '$1,250',
      quantity: '5M',
    },
    {
      amount: '$2,000',
      quantity: '10M',
    },
  ];

  const features: Feature[] = [
    { title: 'Unlimited apps' },
    { title: 'Unlimited developers' },
  ];

  const [quantity, setQuantity] = useState(prices[0].quantity);
  const priceIndex = prices.findIndex((price) => price.quantity === quantity);
  const supportLevel = priceIndex > 3 ? 'Private' : 'Community';

  function AllTiersModal() {
    const [showModal, setShowModal] = useState(false);
    return (
      <>
        <button
          className="shorebird-button-secondary inline-block w-full rounded-xl rounded-t-xl px-4 py-2 text-center font-bold leading-loose"
          type="button"
          onClick={() => setShowModal(true)}
        >
          View Tiers
        </button>
        {showModal ? (
          <>
            <div
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <div className="relative mx-auto my-6 w-auto max-w-3xl">
                <div className="relative flex flex-col rounded-lg bg-shorebirdBg3  text-white shadow-lg outline-none focus:outline-none">
                  <div className="flex items-start justify-between rounded-t p-5">
                    <h3 className="text-xl font-semibold">Teams Tiers</h3>
                  </div>
                  <div className="relative flex-auto px-12 py-5">
                    <ul>
                      {prices.map((price, index) => (
                        <li
                          className="mb-4 flex"
                          key={`tiers-modal-${price.quantity}-${index}`}
                        >
                          <span>
                            <b>{price.amount}</b> for up to{' '}
                            <b>{price.quantity}</b> patch installs
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="pb-6 text-center font-bold text-slate-100"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        ) : null}
      </>
    );
  }

  return (
    <div className="mb-8 w-[325px] px-1 lg:mb-0">
      <div className="animate-gradient-xy rounded-3xl bg-gradient-to-r from-blue-400 via-purple-500 to-teal-500 p-1">
        <div className="h-full rounded-3xl bg-shorebirdBg3 p-6">
          <p className="mb-2 text-left text-xl font-bold text-white">Team</p>
          <div className="flex items-end justify-start">
            <PriceSlider
              prices={prices}
              onChange={(price) => {
                setQuantity(price.quantity);
              }}
            />
          </div>
          <p className="mb-4 mt-4 text-left leading-loose text-gray-500">
            For apps that can scale.
          </p>
          <ul className="mb-2 text-white 2xl:mb-6">
            <FeatureListItem
              key={`teams-patch-install-count`}
              title={`${quantity} patch installs/month`}
            />
            {features.map((feature, index) => (
              <FeatureListItem
                key={`teams-feature-${index}`}
                title={feature.title}
              />
            ))}
            <FeatureListItem
              key={`teams-support-level`}
              title={`${supportLevel} support`}
            />
          </ul>
          <a
            target="_blank"
            href={config.consoleUrl}
            className="plausible-event-name=Team+Get+Started+Button+Clicked shorebird-button-primary inline-block w-full rounded-xl rounded-t-xl px-4 py-2 text-center font-bold leading-loose"
          >
            Get Started
          </a>
          <div className="h-4"></div>
          <AllTiersModal />
        </div>
      </div>
    </div>
  );
}

function EnterprisePlan() {
  const features: Feature[] = [
    { title: 'Unlimited apps' },
    { title: 'Unlimited developers' },
    { title: 'High volume discounts' },
    { title: 'Private Support' },
  ];
  return (
    <div className="mb-8 w-[325px] px-1 lg:mb-0">
      <div>
        <div className="h-full rounded-3xl bg-shorebirdBg3 p-6">
          <p className="mb-2 text-left text-xl font-bold text-white">
            Enterprise
          </p>
          <div className="flex items-end justify-start">
            <div className="mb-2 mr-2 mt-4 text-left text-3xl font-bold text-white sm:text-4xl">
              Custom
            </div>
          </div>
          <p className="mb-4 mt-4 text-left leading-loose text-gray-500">
            For very large apps.
          </p>
          <ul className="mb-2 text-white 2xl:mb-6">
            {features.map((feature, index) => (
              <FeatureListItem
                key={`enterprise-feature-${index}`}
                title={feature.title}
              />
            ))}
          </ul>
          <a
            target="_blank"
            href={config.contactSales}
            className="shorebird-button-primary mt-8 inline-block w-full rounded-xl rounded-t-xl px-4 py-2 text-center font-bold leading-loose"
          >
            Schedule a Call
          </a>
        </div>
      </div>
    </div>
  );
}

function FeatureListItem({ title }: { title: string }) {
  return (
    <li className="mb-4 flex">
      <CheckArrowIcon />
      <span className="flex gap-1">{title}</span>
    </li>
  );
}
