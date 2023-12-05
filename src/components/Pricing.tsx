import { motion } from 'framer-motion';

import { config } from '../config';
import { CheckArrowIcon } from '../assets/icons/CheckArrowIcon';
import { useState } from 'react';
import { DivMotion } from './DivMotion';

interface Feature {
  title: string;
}

interface Price {
  amount: string;
  quantity: string;
}

export const Pricing = () => {
  return (
    <section className="w-screen flex justify-center bg-shorebirdBg2 relative">
      <div className="absolute -top-16" id="pricing" />
      <div className="pb-20 pt-12 bg-shorebirdBg2  2xl:w-[1150px] lg:w-[1050px]  md:w-4/5 ">
        <DivMotion>
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="mt-6 mb-6 text-4xl lg:text-5xl font-bold font-heading text-white">
                Join the flock
              </h2>
              <p className="mb-6 text-shorebirdTextGray">
                Deliver instant updates to your users with pricing that scales
                as you grow.
              </p>
            </div>
            <div className="flex flex-wrap flex-col lg:flex-row items-center justify-center mt-20 gap-4">
              <HobbyPlan />
              <TeamPlan />
              <EnterprisePlan />
            </div>
          </div>
        </DivMotion>
      </div>
    </section>
  );
};

function HobbyPlan() {
  const features: Feature[] = [
    { title: 'Unlimited apps' },
    { title: '1 developer' },
    { title: '5K patch installs/month' },
    { title: 'Community support' },
  ];
  return (
    <div className="w-[325px] px-1 mb-8 lg:mb-0">
      <div>
        <div className="h-full p-6 bg-shorebirdBg3 rounded-3xl">
          <p className="mb-2 text-xl font-bold font-heading text-white text-left">
            Hobby
          </p>
          <div className="flex justify-start items-end">
            <div className="text-4xl sm:text-5xl font-bold text-white text-left mt-4 mr-2">
              $0
            </div>
            <div className="text-gray-500">{'/ month'}</div>
          </div>
          <p className="mt-4 mb-4 text-gray-500 leading-loose text-left">
            For small apps and demos.
          </p>
          <ul className="mb-2 2xl:mb-6 text-white">
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
            className="inline-block text-center py-2 px-4 w-full rounded-xl rounded-t-xl shorebird-button-primary font-bold leading-loose mt-8"
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
        <div className="text-4xl sm:text-5xl font-bold text-white text-left mt-4 mr-2">
          {price.amount}
        </div>
        <div className="text-gray-500 justify-end">{'/ month'}</div>
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
          className="inline-block text-center py-2 px-4 w-full rounded-xl rounded-t-xl shorebird-button-secondary font-bold leading-loose"
          type="button"
          onClick={() => setShowModal(true)}
        >
          View Tiers
        </button>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="rounded-lg shadow-lg relative flex flex-col  bg-shorebirdBg3 outline-none focus:outline-none text-white">
                  <div className="flex items-start justify-between p-5 rounded-t">
                    <h3 className="text-xl font-semibold">Teams Tiers</h3>
                  </div>
                  <div className="relative px-12 py-5 flex-auto">
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
                    className="text-center text-slate-100 font-bold pb-6"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  }

  return (
    <div className="w-[325px] px-1 mb-8 lg:mb-0">
      <div className="rounded-3xl bg-gradient-to-r from-blue-400 to-teal-500 via-purple-500 animate-gradient-xy p-1">
        <div className="h-full p-6 bg-shorebirdBg3 rounded-3xl">
          <p className="mb-2 text-xl font-bold font-heading text-white text-left">
            Team
          </p>
          <div className="flex justify-start items-end">
            <PriceSlider
              prices={prices}
              onChange={(price) => {
                setQuantity(price.quantity);
              }}
            />
          </div>
          <p className="mt-4 mb-4 text-gray-500 leading-loose text-left">
            For apps that can scale.
          </p>
          <ul className="mb-2 2xl:mb-6 text-white">
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
            className="inline-block text-center py-2 px-4 w-full rounded-xl rounded-t-xl shorebird-button-primary font-bold leading-loose"
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
    <div className="w-[325px] px-1 mb-8 lg:mb-0">
      <div>
        <div className="h-full p-6 bg-shorebirdBg3 rounded-3xl">
          <p className="mb-2 text-xl font-bold font-heading text-white text-left">
            Enterprise
          </p>
          <div className="flex justify-start items-end">
            <div className="text-3xl sm:text-4xl font-bold text-white text-left mt-4 mr-2 mb-2">
              Custom
            </div>
          </div>
          <p className="mt-4 mb-4 text-gray-500 leading-loose text-left">
            For very large apps.
          </p>
          <ul className="mb-2 2xl:mb-6 text-white">
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
            className="inline-block text-center py-2 px-4 w-full rounded-xl rounded-t-xl shorebird-button-primary font-bold leading-loose mt-8"
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
