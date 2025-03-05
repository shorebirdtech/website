import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-button-primary-text shadow-xs',
        outline:
          'text-button-primary-text border border-input border-border-1 rounded-full bg-background hover:shadow-xs hover:bg-foreground/10 hover:border-foreground/40',
        secondary:
          'bg-secondary text-button-secondary-text shadow-xs hover:bg-secondary/80',
        ghost: 'text-button-primary-text',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-4 py-2',
        sm: 'h-10 rounded-full gap-1.5 px-3',
        lg: 'h-15 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-12 rounded-full p-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function GradientOutlineButton({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className="from-text-gradient-1 to-text-gradient-2 shadow-text-gradient-2 rounded-full bg-gradient-to-tr p-[2px]">
      <Button
        variant="ghost"
        className={cn(
          'bg-background hover:shadow-text-gradient-2 hover:bg-background/85 rounded-full hover:shadow-xs',
          className,
        )}
      >
        {children}
      </Button>
    </div>
  );
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants, GradientOutlineButton };
