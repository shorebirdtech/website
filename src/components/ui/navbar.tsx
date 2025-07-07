import { DiscordLogo } from '@/components/logos/discord-logo';
import { GitHubLogo } from '@/components/logos/github-logo';
import { LogoFull } from '@/components/logos/logo-full';
import { Button, GradientOutlineButton } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import config from '@/config';
import {
  ArrowRight,
  Bookmark,
  Books,
  Building,
  List,
  Money,
  Question,
} from '@phosphor-icons/react';

function Navbar() {
  return (
    <Sheet>
      <nav className="border-border-1 flex items-center justify-between border-t-[1px] border-b-[1px] py-5">
        <div className="mx-auto flex w-11/12 items-center justify-between xl:w-10/12 2xl:w-[1280px]">
          <div className="flex w-full flex-row items-center gap-8 lg:gap-12">
            <a className="transition hover:scale-105" href="/">
              <LogoFull className="w-36" />
            </a>
            <div className="hidden flex-row gap-4 md:flex lg:gap-8">
              <a href="/pricing">Pricing</a>
              <a href="/about">About</a>
              <a href="/blog">Blog</a>
              <a href={config.docsUrl}>Docs</a>
              <a href="/faq">FAQs</a>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <a className="hidden lg:block" href={config.discordUrl}>
              <Button variant="outline" size="sm" className="font-light">
                <DiscordLogo className="size-5" />
                Support
              </Button>
            </a>
            <a className="hidden lg:block" href={config.githubUrl}>
              <Button variant="outline" size="sm" className="font-light">
                <GitHubLogo className="size-5" />
                2.7k
              </Button>
            </a>
            <a href={config.consoleUrl}>
              <GradientOutlineButton className="h-9 gap-1.5 rounded-full px-3 font-light">
                Get started <ArrowRight className="size-5" weight="bold" />
              </GradientOutlineButton>
            </a>
            <SheetTrigger asChild>
              <Button size="icon" className="md:hidden">
                <List className="size-6" />
              </Button>
            </SheetTrigger>
          </div>
        </div>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="border-border-1 border-b-2 py-4">
              <a href="/">
                <LogoFull className="w-36" />
              </a>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 px-6 text-lg">
            <a className="flex flex-row items-center gap-2" href="/pricing">
              <Money className="text-accent-primary-1 size-6" />
              Pricing
            </a>
            <a className="flex flex-row items-center gap-2" href="/about">
              <Building className="text-accent-primary-1 size-6" />
              About
            </a>
            <a className="flex flex-row items-center gap-2" href="/blog">
              <Bookmark className="text-accent-primary-1 size-6" />
              Blog
            </a>
            <a
              className="flex flex-row items-center gap-2"
              href={config.docsUrl}
            >
              <Books className="text-accent-primary-1 size-6" />
              Docs
            </a>
            <a className="flex flex-row items-center gap-2" href="/faq">
              <Question className="text-accent-primary-1 size-6" />
              FAQs
            </a>
          </div>
        </SheetContent>
      </nav>
    </Sheet>
  );
}

export { Navbar };
