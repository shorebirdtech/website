import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Button variants ported from the Webflow design system:
 *
 * - `primary`   → `.g_button_primary`   (gradient pill, white text; hover
 *                 fades the darker gradient stop in over the whole button)
 * - `secondary` → `.g_button_secondary` (1.5px inset-border pill on the
 *                 current surface; `outline` is kept as an alias)
 * - `tertiary`  → plain text link in `--button-tertiary-text`, pair with
 *                 `<ArrowRightIcon />` or `trailing="arrow"`
 *
 * Sizes: `default` (1rem / 1.375rem padding) and `small`
 * (`data-wf--button-*--variant="small"`). The old shadcn sizes `sm`, `lg`
 * and `icon` are still accepted for pre-port callers.
 */
const buttonVariants = cva(
  "relative isolate inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[color,background-color,box-shadow] duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        primary:
          'overflow-hidden bg-linear-to-r from-button-primary-1 to-button-primary-2 text-button-primary-text hover:text-button-primary-text after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:bg-button-primary-2 after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100',
        secondary:
          'bg-transparent text-button-secondary-text shadow-[inset_0_0_0_1.5px_var(--button-secondary-border)] hover:bg-button-secondary-surface-hover hover:text-button-secondary-text hover:shadow-[0_2px_8px_-8px_rgba(0,0,0,0.8),inset_0_0_0_1.5px_var(--button-secondary-border)]',
        tertiary:
          'h-auto rounded-none bg-transparent p-0 text-button-tertiary-text hover:text-button-tertiary-text hover:underline hover:underline-offset-4',
        /* Legacy aliases. */
        default:
          'overflow-hidden bg-linear-to-r from-button-primary-1 to-button-primary-2 text-button-primary-text hover:text-button-primary-text after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:bg-button-primary-2 after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100',
        outline:
          'bg-transparent text-button-secondary-text shadow-[inset_0_0_0_1.5px_var(--button-secondary-border)] hover:bg-button-secondary-surface-hover hover:text-button-secondary-text hover:shadow-[0_2px_8px_-8px_rgba(0,0,0,0.8),inset_0_0_0_1.5px_var(--button-secondary-border)]',
        ghost: 'bg-transparent text-text-1 hover:bg-border-1 hover:text-text-1',
        link: 'h-auto rounded-none bg-transparent p-0 text-text-1 underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-[1.375rem] py-4 text-button-m',
        small: 'px-5 py-3 text-button-s',
        /* Legacy sizes. */
        sm: 'h-10 px-4 text-button-s',
        lg: 'px-7 py-5 text-button-m',
        icon: 'size-10 p-0',
      },
    },
    compoundVariants: [
      { variant: ['tertiary', 'link'], className: 'h-auto p-0' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

/**
 * The small "live" dot used by "View our Demo ●" (`.c_button--indicator`).
 */
function ButtonIndicator({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative flex size-2.5 shrink-0 items-center justify-center',
        className,
      )}
    >
      <span className="bg-nav-indicator-back absolute inset-0 rounded-full" />
      <span className="bg-nav-indicator-front relative size-2 rounded-full" />
    </span>
  );
}

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Optional trailing adornment: the blue "live" dot or a right arrow. */
    trailing?: 'dot' | 'arrow';
  };

function ArrowGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="size-4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10h12m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  trailing,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const adornment =
    trailing === 'dot' ? (
      <ButtonIndicator />
    ) : trailing === 'arrow' ? (
      <ArrowGlyph />
    ) : null;

  if (asChild && adornment) {
    // Slot needs exactly one child; append the adornment inside it.
    const child = React.Children.only(children) as React.ReactElement<{
      children?: React.ReactNode;
    }>;
    children = React.cloneElement(
      child,
      undefined,
      <>
        {child.props.children}
        {adornment}
      </>,
    );
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {!asChild && adornment}
    </Comp>
  );
}

/**
 * Anchor-flavoured button. Use for links so that the markup is a real `<a>`.
 */
function ButtonLink({
  className,
  variant,
  size,
  trailing,
  children,
  ...props
}: React.ComponentProps<'a'> &
  VariantProps<typeof buttonVariants> & {
    trailing?: 'dot' | 'arrow';
  }) {
  return (
    <a
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {trailing === 'dot' && <ButtonIndicator />}
      {trailing === 'arrow' && <ArrowGlyph />}
    </a>
  );
}

/**
 * Legacy: pre-port pages used a gradient-outlined pill. It now renders the
 * secondary (outlined) button so callers keep working.
 */
function GradientOutlineButton({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <Button variant="secondary" className={className}>
      {children}
    </Button>
  );
}

export {
  Button,
  ButtonIndicator,
  ButtonLink,
  buttonVariants,
  GradientOutlineButton,
};
