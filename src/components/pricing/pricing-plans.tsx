/**
 * Pricing page plan cards + billing toggle (Webflow `.c_toggle--wrap` and
 * `.c_tabs_pricing` / `.c_card_pricing`). One React island: the toggle
 * flips between the monthly and yearly card sets; the copy and checkout
 * links are copied verbatim from the live page.
 */
import { ButtonLink } from '@/components/ui/button';
import config from '@/config';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type Billing = 'monthly' | 'yearly';

interface Plan {
  name: string;
  description: string;
  price: string;
  period?: string;
  cta: string;
  href: string;
  variant: 'primary' | 'secondary';
}

const monthlyPlans: Plan[] = [
  {
    name: 'Free',
    description: 'Made for hobbyists, small apps, and demos.',
    price: '$0',
    period: '/month',
    cta: 'Join free',
    href: `${config.consoleUrl}/login`,
    variant: 'secondary',
  },
  {
    name: 'Pro',
    description:
      'Sized for usage from medium sized apps with scalable pricing.',
    price: '$20',
    period: '/month',
    cta: 'Get started',
    href: config.monthlyProPlanCheckoutUrl,
    variant: 'primary',
  },
  {
    name: 'Business',
    description: 'Great for teams with large apps and advanced needs.',
    price: '$400',
    period: '/month',
    cta: 'Get started',
    href: config.monthlyBusinessPlanCheckoutUrl,
    variant: 'secondary',
  },
  {
    name: 'Enterprise',
    description: 'Build a custom plan for enterprise apps & needs.',
    price: 'Custom',
    cta: 'Talk to sales',
    href: config.contactSales,
    variant: 'secondary',
  },
];

const yearlyPlans: Plan[] = [
  { ...monthlyPlans[0], period: '/year' },
  {
    ...monthlyPlans[1],
    price: '$240',
    period: '/year',
    href: config.yearlyProPlanCheckoutUrl,
  },
  {
    ...monthlyPlans[2],
    price: '$4,800',
    period: '/year',
    href: config.yearlyBusinessPlanCheckoutUrl,
  },
  monthlyPlans[3],
];

function BillingToggle({
  value,
  onChange,
}: {
  value: Billing;
  onChange: (value: Billing) => void;
}) {
  const options: Billing[] = ['monthly', 'yearly'];
  return (
    <div
      role="tablist"
      aria-label="Billing period"
      className="bg-surface-2 relative grid w-full flex-none grid-cols-2 rounded-full md:w-auto"
    >
      <span
        aria-hidden="true"
        className={cn(
          'bg-surface-1 outline-border absolute inset-y-0 z-[1] w-1/2 rounded-full outline-[1.5px] transition-transform duration-300 ease-out',
          value === 'yearly' ? 'translate-x-full' : 'translate-x-0',
        )}
      />
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="tab"
          aria-selected={value === option}
          onClick={() => onChange(option)}
          className="text-text-1 text-body-xs relative z-[2] cursor-pointer px-4 py-3 font-semibold capitalize"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="bg-surface-2 border-border flex h-full flex-col rounded-3xl border px-7 py-8">
      <p className="title-s pb-text-xs">{plan.name}</p>
      <p className="body-xs pb-text-s">{plan.description}</p>
      <div className="divider" />
      <div className="pt-text-s pb-text-m flex items-end gap-2">
        <p className="title-m">{plan.price}</p>
        {plan.period && <p className="body-s mb-[3px]">{plan.period}</p>}
      </div>
      <div className="flex flex-1 flex-col justify-end">
        <ButtonLink
          variant={plan.variant}
          href={plan.href}
          target="_blank"
          rel="noopener"
          className="w-full"
        >
          {plan.cta}
        </ButtonLink>
      </div>
    </div>
  );
}

/**
 * Header row of the pricing page: title + subtitle on the left, toggle on
 * the right (stacked on mobile), then the four plan cards.
 */
function PricingPlans() {
  const [billing, setBilling] = useState<Billing>('monthly');
  const plans = billing === 'yearly' ? yearlyPlans : monthlyPlans;
  return (
    <>
      <div className="gap-section-s md:gap-column-gap flex flex-col items-start md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col items-start">
          <h1 className="title-xxl pb-text-m">Pay as you grow</h1>
          <p className="body-m">
            Deliver instant updates with pricing that scales as you grow.
          </p>
        </div>
        <BillingToggle value={billing} onChange={setBilling} />
      </div>
      <div className="pb-section-s" />
      <div className="gap-x-column-gap gap-y-row-gap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </>
  );
}

export { PricingPlans };
