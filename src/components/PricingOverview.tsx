import { motion } from 'framer-motion';

import { config } from '../config';
import { CheckArrowIcon } from '../assets/icons/CheckArrowIcon';

interface Feature {
  title: string;
  caption?: string;
}

export const PricingOverview = () => {
  return (
    <section className="relative flex w-screen justify-center bg-shorebirdBg2">
      <div className="absolute -top-16" id="pricing" />
      <div className="bg-shorebirdBg2 pb-20 pt-12 md:w-4/5 lg:w-[1050px] 2xl:w-[1150px]">
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
              <FreePlan />
              <ProPlan />
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
      <div className="mx-auto max-w-sm">
        <a
          href="/pricing"
          className="shorebird-button-secondary mt-8 inline-block w-full rounded-xl rounded-t-xl px-4 py-2 text-center font-bold leading-loose"
        >
          See Pricing Table
        </a>
      </div>
    </div>
  );
}

function FreePlan() {
  const features: Feature[] = [
    { title: '5K patch installs/month' },
    { title: '1 developer' },
    { title: 'Unlimited apps' },
    { title: 'Community support' },
  ];
  return (
    <div className="mb-8 w-[325px] px-1 lg:mb-0">
      <div>
        <div className="h-full rounded-3xl bg-shorebirdBg3 p-6">
          <p className="mb-2 text-left text-xl font-bold text-white">Free</p>
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

function ProPlan() {
  const features: Feature[] = [
    {
      title: '50K patch installs/month',
      caption: 'then $1 per 2,500 patch installs.',
    },
    { title: 'Unlimited developers' },
    { title: 'Unlimited apps' },
    { title: 'Community support' },
  ];
  return (
    <div className="mb-8 w-[325px] px-1 lg:mb-0">
      <div className="animate-gradient-xy rounded-3xl bg-gradient-to-r from-blue-400 via-purple-500 to-teal-500 p-1">
        <div className="h-full rounded-3xl bg-shorebirdBg3 p-6">
          <p className="text-left text-xl font-bold text-white">Pro</p>
          <div className="flex items-end justify-start">
            <div className="mr-2 mt-4 text-left text-4xl font-bold text-white sm:text-5xl">
              $20
            </div>
            <div className="text-gray-500">{'/ month'}</div>
          </div>
          <p className="mb-4 mt-4 text-left leading-loose text-gray-500">
            For apps that can scale.
          </p>
          <ul className="mb-2 text-white 2xl:mb-6">
            {features.map((feature, index) => (
              <FeatureListItem
                key={`pro-feature-${index}`}
                title={feature.title}
                caption={feature.caption}
              />
            ))}
          </ul>
          <a
            target="_blank"
            href={config.consoleUrl}
            className="plausible-event-name=Pro+Get+Started+Button+Clicked shorebird-button-primary mt-8 inline-block w-full rounded-xl rounded-t-xl px-4 py-2 text-center font-bold leading-loose"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

function EnterprisePlan() {
  const features: Feature[] = [
    { title: 'Volume discounts' },
    { title: 'Unlimited developers' },
    { title: 'Unlimited apps' },
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
            For large apps with custom needs.
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
            className="plausible-event-name=Enterprise+Get+Started+Button+Clicked shorebird-button-primary mt-8 inline-block w-full rounded-xl rounded-t-xl px-4 py-2 text-center font-bold leading-loose"
          >
            Schedule a Call
          </a>
        </div>
      </div>
    </div>
  );
}

function FeatureListItem({
  title,
  caption,
}: {
  title: string;
  caption?: string;
}) {
  return (
    <li className="mb-4 flex">
      <CheckArrowIcon />
      <div>
        <span className="flex gap-1">{title}</span>
        {caption && <span className="text-xs text-gray-500">{caption}</span>}
      </div>
    </li>
  );
}
