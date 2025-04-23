import config from '@/config';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { GradientOutlineButton } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowRight, Check, Minus } from '@phosphor-icons/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Feature {
  title: string;
  free?: string;
  pro?: string;
  business?: string;
  enterprise?: string;
}

const monthlyFeatures: Feature[] = [
  {
    title: 'Base Cost',
    free: '$0',
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
  { title: 'SAML', enterprise: 'Custom' },
];

const yearlyFeatures: Feature[] = [
  {
    title: 'Base Cost',
    free: '$0',
    pro: '$240',
    business: '$4,800',
    enterprise: 'Custom',
  },
  {
    title: 'Included Patch Installs',
    free: '5,000',
    pro: '600,000',
    business: '12,000,000',
    enterprise: 'Custom',
  },
  {
    title: 'Overage Billing',
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
  { title: 'SAML', enterprise: 'Custom' },
];

const monthlyPlans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Made for hobbyists, small apps, and demos.',
    cta: { link: config.consoleUrl, title: 'Get Started' },
  },
  {
    name: 'Pro',
    price: '$20',
    description:
      'Sized for usage from medium sized apps with scalable pricing.',
    cta: { link: config.monthlyProPlanCheckoutUrl, title: 'Buy Now' },
  },
  {
    name: 'Business',
    price: '$400',
    description: 'Great for large apps with advanced needs.',
    cta: { link: config.monthlyBusinessPlanCheckoutUrl, title: 'Buy Now' },
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Build a custom plan for enterprise apps & needs.',
    cta: { link: config.contactSales, title: 'Talk to Sales' },
  },
];

const yearlyPlans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Made for hobbyists, small apps, and demos.',
    cta: { link: config.consoleUrl, title: 'Get Started' },
  },
  {
    name: 'Pro',
    price: '$240',
    description:
      'Sized for usage from medium sized apps with scalable pricing.',
    cta: { link: config.yearlyProPlanCheckoutUrl, title: 'Buy Now' },
  },
  {
    name: 'Business',
    price: '$4,800',
    description: 'Great for large apps with advanced needs.',
    cta: { link: config.yearlyBusinessPlanCheckoutUrl, title: 'Buy Now' },
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Build a custom plan for enterprise apps & needs.',
    cta: { link: config.contactSales, title: 'Talk to Sales' },
  },
];

const pricingConfig = {
  monthly: {
    plans: monthlyPlans,
    features: monthlyFeatures,
  },
  yearly: {
    plans: yearlyPlans,
    features: yearlyFeatures,
  },
};

function PricingPlans({ includeTable }: { includeTable?: boolean }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = isAnnual
    ? pricingConfig.yearly.plans
    : pricingConfig.monthly.plans;
  return (
    <>
      <div className="bg-segmented-control-background grid grid-cols-2 rounded-full">
        <button
          onClick={() => setIsAnnual(false)}
          className={cn(
            'rounded-full',
            'px-4',
            'py-3',
            !isAnnual ? 'bg-segmented-control-foreground' : '',
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsAnnual(true)}
          className={cn(
            'rounded-full',
            'px-4',
            'py-3',
            isAnnual ? 'bg-segmented-control-foreground' : '',
          )}
        >
          Yearly
        </button>
      </div>
      <div className="h-8"></div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => {
          const isEnterprise = plan.name === 'Enterprise';
          return (
            <Card key={plan.name}>
              <CardHeader>
                <div className="flex w-full flex-col gap-3">
                  <p className="text-lg">{plan.name}</p>
                  <p className="text-text-2 text-sm">{plan.description}</p>
                  <hr className="text-border-1 mt-2" />
                </div>
              </CardHeader>
              <CardContent className="flex w-full flex-col justify-center gap-6">
                <h2 className="text-text-1 text-3xl">
                  {plan.price}{' '}
                  {!isEnterprise ? (
                    <span className="text-text-2 text-sm">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  ) : null}
                </h2>
                <a href={plan.cta.link}>
                  <GradientOutlineButton className="w-full px-8 font-light">
                    {plan.cta.title}{' '}
                    <ArrowRight className="size-5" weight="bold" />
                  </GradientOutlineButton>
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {includeTable && <PricingTable isAnnual={isAnnual} />}
    </>
  );
}

function PricingTable({ isAnnual }: { isAnnual: boolean }) {
  const { plans, features } = isAnnual
    ? pricingConfig.yearly
    : pricingConfig.monthly;
  return (
    <div className="w-full pt-18">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg font-light">
              PLAN COMPARISON
            </TableHead>
            {plans.map((plan) => (
              <TableHead
                className="text-center text-lg font-normal"
                key={plan.name}
              >
                {plan.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.title}>
              <TableCell className="text-normal">{feature.title}</TableCell>
              {plans.map((plan) => (
                <TableCell
                  key={`${feature.title}-${plan.name}`}
                  className="text-center"
                >
                  {feature[plan.name.toLowerCase() as keyof Feature] ? (
                    feature[plan.name.toLowerCase() as keyof Feature] ===
                    '✓' ? (
                      <Check
                        weight="bold"
                        className="text-accent-primary-1 inline h-5 w-5"
                      />
                    ) : (
                      feature[plan.name.toLowerCase() as keyof Feature]
                    )
                  ) : (
                    <Minus
                      weight="bold"
                      className="inline h-5 w-5 text-gray-500"
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export { PricingPlans };
