import { config } from '../config';
import { CheckArrowIcon } from '~/assets/icons/CheckArrowIcon';
import { PricingCalculator } from './PricingCalculator';

interface Feature {
  title: string;
  free?: string;
  pro?: string;
  business?: string;
  enterprise?: string;
}

const features: Feature[] = [
  {
    title: 'Monthly Base Cost',
    free: 'Free',
    pro: '$20',
    business: '$400',
    enterprise: 'Custom',
  },
  {
    title: 'Included Patch Installs',
    free: '5,000',
    pro: '50,000',
    business: '1,000,000',
    enterprise: 'Custom',
  },
  {
    title: 'Overage Billing',
    pro: '$1 per 2,500 installs',
    business: '$1 per 2,500 installs',
    enterprise: 'Custom',
  },
  {
    title: 'Unlimited Apps & Releases',
    free: '✓',
    pro: '✓',
    business: '✓',
    enterprise: '✓',
  },
  { title: 'Console', free: '✓', pro: '✓', business: '✓', enterprise: '✓' },
  {
    title: 'Collaboration',
    pro: '✓',
    business: '✓',
    enterprise: '✓',
  },
  {
    title: 'Patch Rollbacks',
    free: '✓',
    pro: '✓',
    business: '✓',
    enterprise: '✓',
  },
  {
    title: 'Signed Patches',
    free: '✓',
    pro: '✓',
    business: '✓',
    enterprise: '✓',
  },
  {
    title: 'Usage Notifications',
    free: '✓',
    pro: '✓',
    business: '✓',
    enterprise: '✓',
  },
  { title: 'Staging', free: '✓', pro: '✓', business: '✓', enterprise: '✓' },
  {
    title: 'Analytics',
    free: '✓',
    pro: '✓',
    business: '✓',
    enterprise: 'Custom',
  },
  {
    title: 'Support',
    free: 'Community Discord',
    pro: 'Semi-Private',
    business: 'Private',
    enterprise: 'Private',
  },
  {
    title: 'User Roles',
    free: 'Admin, Developer',
    pro: 'Admin, Developer',
    business: 'Admin, Developer',
    enterprise: 'Custom',
  },
  { title: 'Invoice Billing', enterprise: '✓' },
  { title: 'Annual Billing', enterprise: '✓' },
  { title: 'SAML', enterprise: 'Custom' },
];

export const PricingDetails = () => {
  const plans = [
    {
      name: 'Free',
      price: 'Free',
      description: 'Great for hobbyists, small apps, and demos.',
      cta: { link: config.consoleUrl, title: 'Try It' },
    },
    {
      name: 'Pro',
      price: '$20',
      description: 'Great for medium sized apps with scalable pricing.',
      cta: { link: config.proPlanCheckoutUrl, title: 'Buy Now' },
    },
    {
      name: 'Business',
      price: '$400',
      description: 'Great for large apps with advanced needs.',
      cta: { link: config.businessPlanCheckoutUrl, title: 'Buy Now' },
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Great for enterprise apps with custom needs.',
      cta: { link: config.contactSales, title: 'Talk to Sales' },
    },
  ];

  return (
    <div className="bg-shorebirdBg2 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mt-20 text-4xl font-extrabold text-white lg:text-5xl">
            Choose the right plan for you
          </h2>
          <p className="mt-4 text-xl text-shorebirdTextGray">
            Whether you're just starting out or scaling up, find the plan that
            fits your needs.
          </p>
        </div>

        <div className="mx-auto my-auto mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:max-w-4xl xl:max-w-none xl:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border200 divide-y divide-gray-200 rounded-lg bg-shorebirdBg3 shadow-sm ${
                plan.name.toLowerCase() == 'pro'
                  ? 'animate-gradient-xy rounded-3xl bg-gradient-to-r from-blue-400 via-purple-500 to-teal-500 p-1'
                  : ''
              }`}
            >
              <div className="rounded-lg bg-shorebirdBg3 p-6">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-4 text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.price.startsWith('$') && (
                    <span className="text-base font-medium text-gray-500">
                      {' / month'}
                    </span>
                  )}
                </p>
                <a
                  className="shorebird-button-primary mt-8 inline-block w-full rounded-xl rounded-t-xl bg-indigo-600 px-4 py-2 text-center font-bold leading-loose text-white"
                  href={plan.cta.link}
                >
                  {plan.cta.title}
                </a>
              </div>
            </div>
          ))}
        </div>

        <PricingCalculator />

        <div className="mx-auto mb-8 mt-12 px-8 text-sm text-shorebirdTextGray">
          <p>
            *Prices are quoted in USD and sold as "patch installs per month",
            reflecting successful installs of a given patch. For example, 1
            patch pushed to 10 devices is 10 installs. 2 patches pushed to 5
            devices is also 10 installs.
          </p>
        </div>

        <WhichPlan />

        <div className="mt-16 overflow-x-auto rounded-lg bg-shorebirdBg3 shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-shorebirdBg1">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Feature
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-shorebirdDivider">
              {features.map((feature) => (
                <tr key={feature.title}>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center">{feature.title}</div>
                  </td>
                  {plans.map((plan) => (
                    <td
                      key={`${feature.title}-${plan.name}`}
                      className="px-6 py-4 text-center text-sm"
                    >
                      {feature[plan.name.toLowerCase() as keyof Feature] ? (
                        feature[plan.name.toLowerCase() as keyof Feature] ===
                        '✓' ? (
                          <CheckArrowIcon className="mx-auto h-5 w-5 text-green-500" />
                        ) : (
                          feature[plan.name.toLowerCase() as keyof Feature]
                        )
                      ) : (
                        <span className="mx-auto h-5 w-5 text-gray-300">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};



function WhichPlan() {
  return (
    <div className="text-left text-sm text-shorebirdTextGray">
      <div className="text-2xl font-bold text-white">Which plan is right for me?</div>

      <p>
        If you're just starting out, either on a hobby app or building a proof
        of concept with Shorebird, the Free plan is a great way to get
        started. You can always upgrade to Pro or Enterprise later.
      </p>

      <p>
        If you're an established business or have a high volume of patch
        installs, the Pro plan is the best choice. You get more installs and
        unlimited developers.  The pro plan will scale to any number of patch
        installs.  Patches are billed at $1 per 2,500 installs after the first
        50,000.

        For example if you have 90,000 MAU and plan to send one patch a month,
        you would pay $20 for the first 50,000 installs, and $12 for the
        remaining 40,000 installs for a total of $32 per month.

        Similarly if you have an app with bursty traffic, you only pay for
        what you use with the Pro plan.  If we installed no patches for you one
        month, you only pay the $20 base fee.  If we installed 1,000,000 for you
        the next next, you would pay $20 for the first 50,000 installs, and $400
        for the remaining 950,000 installs for a total of $420 for the month.

        Most customers start with the Pro plan.
      </p>

      <p>
        For users with high volume needs, or who need a custom solution, the
        Enterprise plan is the best choice.  We offer volume discounts starting
        at 1M patch installs per month.  We also offer private support
        and custom solutions for those spending over $2,000 per month.
      </p>
    </div>
  )
}
