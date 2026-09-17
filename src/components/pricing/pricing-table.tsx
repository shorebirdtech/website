/**
 * "Plan comparison" table (Webflow `.c_pricing_table`). Desktop renders a
 * five-column grid (feature + four plans). Below `md` the live page shows a
 * single plan column picked from a dropdown, with the feature name on the
 * left of each row — same here, via a small React state.
 */
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

const plans = ['Free', 'Pro', 'Business', 'Enterprise'] as const;
type PlanName = (typeof plans)[number];

/** `true` renders the blue check; a string renders as-is (`'-'` is muted). */
type Cell = true | string;

interface Row {
  title: string;
  cells: [Cell, Cell, Cell, Cell];
}

const rows: Row[] = [
  {
    title: 'Monthly patch installs',
    cells: ['5,000', '50,000', '1,000,000', 'Custom'],
  },
  {
    title: 'Overage billing',
    cells: ['-', '$1 per 2,500 installs', '$1 per 2,500 installs', 'Custom'],
  },
  { title: 'Unlimited apps & releases', cells: [true, true, true, true] },
  { title: 'Console', cells: [true, true, true, true] },
  { title: 'Collaboration', cells: ['-', true, true, true] },
  { title: 'Patch rollbacks', cells: [true, true, true, true] },
  { title: 'Signed patches', cells: [true, true, true, true] },
  { title: 'Usage notifications', cells: [true, true, true, true] },
  { title: 'Staging', cells: [true, true, true, true] },
  { title: 'Analytics', cells: [true, true, true, 'Custom'] },
  {
    title: 'Support',
    cells: [
      'Community Discord',
      'Email based',
      'Private Discord',
      'Private Discord/Slack',
    ],
  },
  {
    title: 'User roles',
    cells: ['-', 'Admin, Developer', '+Viewer', '+App Manager'],
  },
  { title: 'Invoice billing', cells: ['-', '-', '-', true] },
  { title: 'SAML', cells: ['-', '-', '-', true] },
  { title: 'Audit logs', cells: ['-', '-', '-', true] },
];

function CheckIcon() {
  return (
    <svg
      aria-label="Included"
      role="img"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-brand-primary size-8 flex-none"
    >
      <path
        d="M27.2929 8.29289C27.6834 7.90237 28.3164 7.90237 28.707 8.29289C29.0975 8.68342 29.0975 9.31643 28.707 9.70696L12.707 25.707C12.3164 26.0975 11.6834 26.0975 11.2929 25.707L4.29289 18.707C3.90237 18.3164 3.90237 17.6834 4.29289 17.2929C4.68342 16.9024 5.31643 16.9024 5.70696 17.2929L11.9999 23.5859L27.2929 8.29289Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CellValue({ value }: { value: Cell }) {
  if (value === true) return <CheckIcon />;
  return (
    <p
      className={cn(
        'body-m-strong',
        value === '-' ? 'text-text-2' : 'text-text-1',
      )}
    >
      {value}
    </p>
  );
}

function PlanDropdown({
  value,
  onChange,
}: {
  value: PlanName;
  onChange: (plan: PlanName) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between py-4"
      >
        <span className="body-m-strong text-text-1">{value}</span>
        <span
          className={cn(
            'text-text-1 border-border hover:bg-border flex size-10 items-center justify-center rounded-full border transition-[background-color,transform] duration-200',
            open && 'rotate-180',
          )}
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5326 6.53073L8.53255 11.5307C8.46287 11.6007 8.38008 11.6561 8.28892 11.694C8.19775 11.7318 8.10001 11.7513 8.0013 11.7513C7.90259 11.7513 7.80485 11.7318 7.71369 11.694C7.62252 11.6561 7.53973 11.6007 7.47005 11.5307L2.47005 6.53073C2.32915 6.38984 2.25 6.19874 2.25 5.99948C2.25 5.80023 2.32915 5.60913 2.47005 5.46823C2.61095 5.32734 2.80204 5.24818 3.0013 5.24818C3.20056 5.24818 3.39165 5.32734 3.53255 5.46823L8.00193 9.93761L12.4713 5.46761C12.6122 5.32671 12.8033 5.24756 13.0026 5.24756C13.2018 5.24756 13.3929 5.32671 13.5338 5.46761C13.6747 5.60851 13.7539 5.7996 13.7539 5.99886C13.7539 6.19812 13.6747 6.38921 13.5338 6.53011L13.5326 6.53073Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="bg-surface-1 border-border absolute top-full right-0 left-0 z-20 mt-4 flex flex-col gap-4 rounded-lg border p-6"
        >
          {plans.map((plan) => (
            <li key={plan}>
              <button
                type="button"
                role="option"
                aria-selected={plan === value}
                onClick={() => {
                  onChange(plan);
                  setOpen(false);
                }}
                className={cn(
                  'body-m hover:text-text-1 w-full cursor-pointer text-left',
                  plan === value && 'text-text-1',
                )}
              >
                {plan}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PricingTable() {
  const [selected, setSelected] = useState<PlanName>('Free');
  const selectedIndex = plans.indexOf(selected);

  return (
    <div className="relative flex w-full flex-col">
      {/* Header row. */}
      <div className="border-border grid grid-cols-1 border-b md:grid-cols-5">
        <div className="hidden py-6 pr-5 md:block">
          <p className="title-s">Plan comparison</p>
        </div>
        <div className="md:hidden">
          <PlanDropdown value={selected} onChange={setSelected} />
        </div>
        {plans.map((plan) => (
          <div key={plan} className="hidden px-5 py-6 md:block">
            <p className="body-m">{plan}</p>
          </div>
        ))}
      </div>
      {rows.map((row) => (
        <div
          key={row.title}
          className="border-border grid grid-cols-1 border-b md:grid-cols-5"
        >
          {/* Mobile: feature name + the selected plan's value in one row. */}
          <div className="flex items-center justify-between gap-2 py-6 md:hidden">
            <p className="body-m">{row.title}</p>
            <CellValue value={row.cells[selectedIndex]} />
          </div>
          {/* Desktop: full row. */}
          <div className="hidden py-6 pr-5 md:block">
            <p className="body-m">{row.title}</p>
          </div>
          {row.cells.map((cell, i) => (
            <div key={plans[i]} className="hidden px-5 py-6 md:block">
              <CellValue value={cell} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export { PricingTable };
