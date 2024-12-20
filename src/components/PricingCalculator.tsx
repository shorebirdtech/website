'use client';

import * as React from 'react';
import { Calculator } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Slider } from '~/components/ui/slider';
import { config } from '~/config';

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export const PricingCalculator = () => {
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
  const displayActiveUsers =
    activeUsers > 2000000 ? '2,000,000+' : activeUsers.toLocaleString();

  return (
    <Card className="mx-auto mt-8 w-full border-zinc-800 bg-shorebirdBg3">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-white" />
          <CardTitle className="text-xl text-white">Cost Per Patch</CardTitle>
        </div>
        <CardDescription className="text-zinc-400">
          Estimate the cost to send a patch to your users.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="users" className="text-lg font-bold text-white">
            Active Users: {displayActiveUsers}
          </Label>
          <Slider
            id="users"
            min={0}
            max={2000001}
            step={1000}
            value={[activeUsers]}
            onValueChange={(value) => setActiveUsers(value[0])}
            className="py-2 [&>.relative]:h-2 [&>.relative]:rounded-full [&>.relative]:bg-zinc-800 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-shorebirdPrimary"
          />
        </div>
        <div className="border-t border-zinc-800 pt-2">
          <div className="mb-2 mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-white">
              Estimated Cost:
            </span>

            {pricing.total && (
              <span className="text-2xl font-extrabold text-white">
                {pricing.total}
                <span className="ml-1 text-sm text-zinc-400"></span>
              </span>
            )}
            {pricing.total === null && (
              <a
                className="text-xl font-extrabold text-white hover:text-[#0196C0] hover:underline hover:underline-offset-2"
                href={config.contactSales}
              >
                Contact Us
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
