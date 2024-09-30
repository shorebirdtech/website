import { config } from '../config';
import { CheckArrowIcon } from '~/assets/icons/CheckArrowIcon';

interface Feature {
  title: string;
  hobby?: string;
  pro?: string;
  teams?: string;
  enterprise?: string;
}

const features: Feature[] = [
  {
    title: 'Unlimited Apps, Releases and Patches',
    hobby: '✓',
    pro: '✓',
    teams: '✓',
    enterprise: '✓',
  },
  { title: 'Console', hobby: '✓', pro: '✓', teams: '✓', enterprise: '✓' },
  { title: 'Rollbacks', hobby: '✓', pro: '✓', teams: '✓', enterprise: '✓' },
  { title: 'Notifications', hobby: '✓', pro: '✓', teams: '✓', enterprise: '✓' },
  { title: 'Staging', hobby: '✓', pro: '✓', teams: '✓', enterprise: '✓' },
  // {
  //   title: 'Storage',
  //   hobby: '1 Month',
  //   pro: '1 Year',
  //   teams: 'Unlimited',
  //   enterprise: 'Unlimited',
  // },
  {
    title: 'Analytics',
    hobby: 'Basic',
    pro: 'Basic',
    teams: 'Advanced',
    enterprise: 'Advanced',
  },
  {
    title: 'Support',
    hobby: 'Community',
    pro: 'Semi-Private',
    teams: 'Private',
    enterprise: 'Personal',
  },
  // {
  //   title: 'Assets',
  //   hobby: '1mb',
  //   pro: '10mb',
  //   teams: 'Unlimited',
  //   enterprise: 'Unlimited',
  // },
  // {
  //   title: 'Organizations',
  //   pro: 'Basic',
  //   teams: 'Advanced',
  //   enterprise: 'Custom',
  // },
  {
    title: 'User Roles',
    hobby: 'Admin, Developer',
    pro: 'Admin, Developer',
    teams: 'Admin, Developer, Billing, View-Only',
    enterprise: 'Custom',
  },
  { title: 'Annual Billing', teams: '✓', enterprise: '✓' },
  // { title: 'White-Label Support', teams: '✓', enterprise: '✓' },
  {
    title: 'Signed Patches',
    hobby: '✓',
    pro: '✓',
    teams: '✓',
    enterprise: '✓',
  },
  { title: 'SAML', enterprise: 'Custom' },
];

export const PricingDetails = () => {
  const plans = [
    {
      name: 'Hobby',
      price: '$0',
      description: 'For small apps and demos.',
      cta: { link: config.consoleUrl, title: 'Get Started' },
    },
    {
      name: 'Pro',
      price: '$20',
      description: 'For apps that can scale.',
      cta: { link: config.consoleUrl, title: 'Get Started' },
    },
    //
    // { name: 'Teams', price: '$250', description: 'For teams that need more.' },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations.',
      cta: { link: config.contactSales, title: 'Schedule a Call' },
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

        <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:max-w-none xl:grid-cols-3">
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
                  {plan.name !== 'Enterprise' && (
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

        <div className="mt-16 overflow-hidden rounded-lg bg-shorebirdBg3 shadow">
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
