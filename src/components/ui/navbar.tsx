import { LogoFull } from '@/components/logos/logo-full';
import { ButtonLink } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import config from '@/config';
import { cn } from '@/lib/utils';
import * as React from 'react';

type Theme = 'dark' | 'light';

const products = [
  {
    label: 'Code Push',
    description: 'Deploy on your schedule',
    href: '/product/code-push',
  },
  {
    label: 'Shorebird CI',
    description: 'Shave minutes off your build times',
    href: '/product/shorebird-ci',
  },
];

const links = [
  { label: 'Docs', href: config.docsUrl, external: true },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Customers', href: '/success-stories' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const signInUrl = `${config.consoleUrl}/login`;
const tryUrl = `${config.consoleUrl}/login`;

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7071 13.2071C10.3166 13.5976 9.68342 13.5976 9.29289 13.2071L4.29289 8.20711C3.90237 7.81658 3.90237 7.18342 4.29289 6.79289C4.68342 6.40237 5.31658 6.40237 5.70711 6.79289L10 11.0858L14.2929 6.79289C14.6834 6.40237 15.3166 6.40237 15.7071 6.79289C16.0976 7.18342 16.0976 7.81658 15.7071 8.20711L10.7071 13.2071Z"
        fill="#999999"
      />
    </svg>
  );
}

/** Three-line hamburger that morphs into an X (`.c_navigation--menu_button`). */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-6 w-6 flex-col items-end justify-center"
    >
      <span
        className={cn(
          'bg-text-1 absolute h-0.5 w-6 rounded transition-transform duration-300',
          open ? 'rotate-45' : '-translate-y-2',
        )}
      />
      <span
        className={cn(
          'bg-text-1 absolute h-0.5 w-6 rounded transition-opacity duration-300',
          open && 'opacity-0',
        )}
      />
      <span
        className={cn(
          'bg-text-1 absolute h-0.5 w-6 rounded transition-transform duration-300',
          open ? '-rotate-45' : 'translate-y-2',
        )}
      />
    </span>
  );
}

/**
 * Desktop "Products" dropdown (`.c_navigation--dropdown`). Opens on hover and
 * on click/Enter/Space, closes on Escape, blur-out and outside click.
 */
function ProductsDropdown() {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<number | undefined>(undefined);
  const id = React.useId();

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative flex h-full items-stretch"
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') {
          cancelClose();
          setOpen(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') scheduleClose();
      }}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="text-nav-link text-text-2 hover:text-text-1 flex h-full items-center gap-1 py-2 font-semibold transition-colors duration-300"
      >
        Products
        <ChevronIcon
          className={cn(
            'size-4 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>
      <div
        id={id}
        role="menu"
        hidden={!open}
        className="absolute top-full -left-4 z-50 pt-1"
      >
        <div className="border-border bg-surface-1 flex w-[20.5rem] flex-col overflow-hidden rounded-lg border">
          {products.map((item, i) => (
            <React.Fragment key={item.href}>
              {i > 0 && <div className="divider" aria-hidden="true" />}
              <a
                role="menuitem"
                href={item.href}
                className="bg-surface-1 hover:bg-surface-2 flex w-full flex-col gap-0.5 p-6 transition-colors duration-300"
              >
                <span className="body-xs-strong text-text-1">{item.label}</span>
                <span className="body-xs">{item.description}</span>
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Sticky site navigation (`.c_navigation`). It is dark by default and follows
 * the theme of the section under its bottom edge (`[data-theme="light"]` /
 * `.is--mode_1` wrappers, see `Section.astro`).
 *
 * Pass `initialTheme="light"` on pages whose first section is light to avoid
 * a dark flash before hydration.
 */
function Navbar({ initialTheme = 'dark' }: { initialTheme?: Theme }) {
  const [theme, setTheme] = React.useState<Theme>(initialTheme);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuOpenRef = React.useRef(false);
  const headerRef = React.useRef<HTMLElement>(null);
  menuOpenRef.current = menuOpen;

  React.useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      if (menuOpenRef.current) return;
      const rect = header.getBoundingClientRect();
      const y = Math.min(rect.bottom + 1, window.innerHeight - 1);
      const x = Math.floor(window.innerWidth / 2);
      const hits = document.elementsFromPoint(x, y);
      const target = hits.find((el) => !header.contains(el));
      const themed = target?.closest(
        '[data-theme], .is--mode_1, .is--mode_0',
      ) as HTMLElement | null;
      let next: Theme = 'dark';
      if (themed) {
        const attr = themed.getAttribute('data-theme');
        if (attr) next = attr === 'light' ? 'light' : 'dark';
        else next = themed.classList.contains('is--mode_1') ? 'light' : 'dark';
      }
      setTheme(next);
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      data-theme={theme}
      data-nav
      className="border-border bg-surface-1 h-nav sticky top-0 z-40 border-b transition-colors duration-300"
    >
      <div className="page-container flex h-full items-center justify-between gap-6 lg:gap-14">
        <a
          href="/"
          aria-label="Shorebird home"
          className="text-text-1 hover:text-text-1 flex shrink-0 items-center"
        >
          <LogoFull className="h-6 w-auto" />
        </a>

        {/* Desktop menu */}
        <nav
          aria-label="Main"
          className="hidden h-full flex-1 items-center justify-between lg:flex lg:pr-14"
        >
          <ul className="flex h-full items-center gap-6">
            <li className="h-full">
              <ProductsDropdown />
            </li>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className="text-nav-link text-text-2 hover:text-text-1 font-semibold transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <ButtonLink
              variant="secondary"
              size="small"
              href={signInUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6"
            >
              Sign in
            </ButtonLink>
            <ButtonLink
              variant="primary"
              size="small"
              href={tryUrl}
              target="_blank"
              rel="noreferrer"
            >
              Try for Free
            </ButtonLink>
          </div>
        </nav>

        {/* Mobile: small CTA + hamburger */}
        <Sheet
          open={menuOpen}
          onOpenChange={(open) => {
            // Anchor the sheet to the nav's real bottom edge (a banner may sit
            // above the sticky nav while the page is scrolled to the top).
            const bottom = headerRef.current?.getBoundingClientRect().bottom;
            document.documentElement.style.setProperty(
              '--nav-bottom',
              `${Math.max(0, Math.round(bottom ?? 0))}px`,
            );
            setMenuOpen(open);
          }}
        >
          <div className="flex items-center gap-4 lg:hidden">
            <ButtonLink
              variant="primary"
              size="small"
              href={tryUrl}
              target="_blank"
              rel="noreferrer"
            >
              Try for Free
            </ButtonLink>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="flex h-16 items-center justify-end pl-3"
              >
                <MenuGlyph open={menuOpen} />
              </button>
            </SheetTrigger>
          </div>
          <SheetContent
            side="top"
            hideClose
            overlayClassName="top-[var(--nav-bottom,var(--nav-height))] bg-black/60"
            aria-describedby={undefined}
            className={cn(
              'bg-surface-1 inset-x-0 top-[var(--nav-bottom,var(--nav-height))] bottom-0 h-auto gap-0 overflow-y-auto border-b-0 p-0 shadow-none',
              'data-[state=closed]:duration-200 data-[state=open]:duration-300',
            )}
            data-theme={theme}
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Site navigation
            </SheetDescription>
            {/* Close button drawn over the hamburger in the (inert) nav. */}
            <SheetClose asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="-top-nav h-nav absolute right-[var(--container-padding)] z-10 flex items-center justify-end pl-3"
              >
                <MenuGlyph open />
              </button>
            </SheetClose>

            <nav
              aria-label="Main"
              className="px-container flex min-h-full flex-col gap-20 pt-20 pb-20"
            >
              <ul className="border-border flex flex-col gap-8 border-t pt-8">
                <li className="flex flex-col gap-2">
                  <span className="text-nav-link text-text-2 font-semibold">
                    Products
                  </span>
                  <ul className="flex flex-col">
                    {products.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className="flex flex-col gap-0.5 py-2"
                        >
                          <span className="body-xs-strong text-text-1">
                            {item.label}
                          </span>
                          <span className="body-xs">{item.description}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noreferrer' : undefined}
                      className="text-nav-link text-text-2 hover:text-text-1 block font-semibold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex w-full flex-col gap-4">
                <ButtonLink
                  variant="secondary"
                  size="small"
                  href={signInUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Sign in
                </ButtonLink>
                <ButtonLink
                  variant="primary"
                  size="small"
                  href={tryUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Try for Free
                </ButtonLink>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export { Navbar };
