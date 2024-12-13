import { useState } from 'react';
import { formatMoney, formatNumber } from '~/utils/formatters';

export function PricingCalculator() {
  const proPlanIncludedPatches = 50_000;
  const initialMauCount = 10_000;
  const [mauCount, setMauCount] = useState(initialMauCount);
  const initialNumPatchesPerMonth = 1;
  const [numPatchesPerMonth, setNumPatchesPerMonth] = useState(
    initialNumPatchesPerMonth,
  );
  const totalPatchInstalls = mauCount * numPatchesPerMonth;
  const [recommendedPlan, helpText, cta, cost] = (() => {
    if (totalPatchInstalls <= 5_000) {
      return [
        'Free',
        <span>Our free tier has everything you need. </span>,
        <NonEnterpriseCta />,
        0,
      ];
    }

    if (totalPatchInstalls <= 50_000) {
      return [
        'Pro',
        <span>
          Our Pro plan includes {formatNumber(proPlanIncludedPatches)} patch
          installs.
        </span>,
        <NonEnterpriseCta />,
        2000,
      ];
    }

    if (totalPatchInstalls < 2_000_000) {
      const numOverageInstalls = totalPatchInstalls - proPlanIncludedPatches;
      return [
        'Pro',
        <span>
          Our Pro plan includes ${formatNumber(proPlanIncludedPatches)} patches
          and supports{' '}
          <a
            className="link underline"
            href="https://shorebird.dev/blog/simplified-pricing/"
          >
            configurable overages
          </a>{' '}
          at $1 per 2,500 patch installs.
        </span>,
        <NonEnterpriseCta />,
        2000 + numOverageInstalls * 0.04,
      ];
    }

    return ['Enterprise', <div></div>, <EnterpriseCTA />, null];
  })();

  return (
    <div className="mt-8 flex flex-col items-center text-white">
      <div className="mt-4 text-center text-2xl font-semibold">
        Not sure which plan you should choose?
      </div>
      <div className="mx-auto mb-8 mt-2 min-w-full px-8 text-center text-sm text-shorebirdTextGray"></div>
      <div className="min-w-full items-start px-28">
        <div className="flex flex-col text-lg">
          <div className="">
            <span className="text-sm font-bold text-shorebirdTextGray">
              Approximate Monthly Active Users (MAUs)
            </span>
            <div className="relative">
              <input
                type="range"
                onChange={(e) => {
                  setMauCount(+e.target.value);
                }}
                value={mauCount}
                min="5000"
                max="2000000"
                step="5000"
                className="w-full"
              />

              <span className="absolute -bottom-6 start-0 text-sm text-gray-500 dark:text-gray-400">
                5,000 or fewer
              </span>
              <span className="absolute -bottom-6 start-1/4 -translate-x-1/2 text-sm text-gray-500 rtl:translate-x-1/2 dark:text-gray-400">
                500,000
              </span>
              <span className="absolute -bottom-6 start-2/4 -translate-x-1/2 text-sm text-gray-500 rtl:translate-x-1/2 dark:text-gray-400">
                1,000,000
              </span>
              <span className="absolute -bottom-6 start-3/4 -translate-x-1/2 text-sm text-gray-500 rtl:translate-x-1/2 dark:text-gray-400">
                1,500,000
              </span>
              <span className="absolute -bottom-6 end-0 text-sm text-gray-500 dark:text-gray-400">
                2,000,000 or more
              </span>
            </div>
          </div>
          <div className="w-full pt-12">
            <span className="text-sm font-bold text-shorebirdTextGray">
              Patches per Month
            </span>
            <div className="relative">
              <input
                type="range"
                onChange={(e) => {
                  setNumPatchesPerMonth(+e.target.value);
                }}
                value={numPatchesPerMonth}
                className="w-full"
                min="1"
                max="20"
              />

              <span className="absolute -bottom-6 start-0 text-sm text-gray-500 dark:text-gray-400">
                1
              </span>
              <span className="absolute -bottom-6 start-1/3 -translate-x-1/2 text-sm text-gray-500 rtl:translate-x-1/2 dark:text-gray-400">
                5
              </span>
              <span className="absolute -bottom-6 start-2/3 -translate-x-1/2 text-sm text-gray-500 rtl:translate-x-1/2 dark:text-gray-400">
                10
              </span>
              <span className="absolute -bottom-6 end-0 text-sm text-gray-500 dark:text-gray-400">
                20
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 block">
          <div className="text-2xl">
            Use the <span className="font-bold">{recommendedPlan}</span> plan
            {cost !== null && (
              <span className="ml-2 text-sm">
                ({totalPatchInstalls > 50_000 ? 'Up to ' : ''}
                {formatMoney(cost)} per month)
              </span>
            )}
          </div>
          <div className="text-m mt-2 max-w-2xl">
            You will want a plan with{' '}
            <span className="size-2 font-bold">
              {formatNumber(totalPatchInstalls)}
            </span>{' '}
            patch installs per month. {helpText}
            <div className="pt-2">{cta}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NonEnterpriseCta() {
  return (
    <div>
      <a className="link underline" href="https://console.shorebird.dev">
        Sign up
      </a>{' '}
      here.
    </div>
  );
}

function EnterpriseCTA() {
  return (
    <span>
      <a className="link underline" href="contact#sales">
        Contact us
      </a>{' '}
      for a discounted quote.
    </span>
  );
}
