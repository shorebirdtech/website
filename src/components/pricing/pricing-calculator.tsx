import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ArrowRightIcon } from '@phosphor-icons/react';
import React from 'react';

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

function PricingCalculator({ hideCTA }: { hideCTA?: boolean }) {
  const [activeUsers, setActiveUsers] = React.useState(5000);

  const calculatePrice = () => {
    const totalPatches = 1 * activeUsers; // Assume 1 patch per active user
    const plan = totalPatches > 5000 ? 'Pro' : 'Free';
    const platformFee = totalPatches > 5000 ? 20 : 0;
    const includedPatchInstalls = plan === 'Pro' ? 50000 : 5000;
    const overages = clamp(
      Math.ceil((totalPatches - includedPatchInstalls) * (1 / 2500)),
      0,
      Infinity,
    );

    return {
      total:
        activeUsers > 2000000
          ? null
          : `$${(platformFee + overages).toLocaleString()}`,
    };
  };
  const pricing = calculatePrice();
  const monthlyActiveUsers =
    activeUsers > 2000000 ? '2,000,000+' : activeUsers.toLocaleString();

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full flex-col justify-between gap-6 md:flex-row">
          <div className="flex flex-col">
            <p className="text-lg">Cost per patch</p>
            <p className="text-text-2 text-sm">
              Estimate the cost to send a patch to your users.
            </p>
          </div>
          {!hideCTA && (
            <a href="/pricing" className="items-start">
              <Button variant="outline" className="w-full font-light">
                View full pricing{' '}
                <ArrowRightIcon className="size-5" weight="bold" />
              </Button>
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-row gap-4 md:gap-8">
          <div className="flex flex-col">
            <p className="text-text-2 text-sm">Users</p>
            <p className="text-text-1 text-xl md:text-2xl">
              {monthlyActiveUsers}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-text-2 text-sm">Estimated Cost</p>
            <p className="text-text-1 text-xl md:text-2xl">
              {pricing.total ?? 'Contact Us '}
            </p>
          </div>
        </div>
        <div className="py-6">
          <Slider
            min={0}
            max={2001000}
            step={1000}
            value={activeUsers}
            onValueChange={(value, _, __) => setActiveUsers(value as number)}
          />
        </div>
        <div>
          <p className="text-text-2 text-sm">
            *Prices are quoted in USD and sold as "patch installs per month",
            reflecting successful installs of a given patch. For example, 1
            patch pushed to 10 devices is 10 installs. 2 patches pushed to 5
            devices is also 10 installs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
export { PricingCalculator };
