import { cn } from '@/lib/utils';
import { Slider as BaseSlider } from '@base-ui-components/react/slider';

interface SliderProps {
  className?: string;
  min: number;
  max: number;
  step: number;
  defaultValue?: number;
  value?: number;
  onValueChange?: (
    value: number | number[],
    event: Event,
    activeThumbIndex: number,
  ) => void;
}

function Slider({
  className,
  min,
  max,
  step,
  defaultValue,
  value,
  onValueChange,
}: SliderProps) {
  return (
    <BaseSlider.Root
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
    >
      <BaseSlider.Control
        className={cn(
          'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
          className,
        )}
      >
        <BaseSlider.Track className="bg-border-1 h-1.5 w-full rounded-full">
          <BaseSlider.Indicator
            className={cn(
              'from-text-gradient-1 to-text-gradient-2 absolute rounded-full bg-gradient-to-r data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
            )}
          />
          <BaseSlider.Thumb className="border-border-1 from-text-gradient-1 to-text-gradient-2 ring-accent-secondary-1 block size-4 shrink-0 cursor-pointer rounded-full border bg-gradient-to-r shadow-sm hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 md:transition-[color,box-shadow]" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
export { Slider };
