import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge needs to know which custom `text-*` utilities are font sizes
 * (from the `--text-*` tokens in global.css) so that e.g.
 * `text-title-l text-text-1` keeps both classes instead of treating them as
 * conflicting colors.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'title-xxl',
            'title-xl',
            'title-l',
            'title-m',
            'title-s',
            'body-l',
            'body-m',
            'body-s',
            'body-xs',
            'label-s',
            'label-xs',
            'button-m',
            'button-s',
            'nav-link',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
