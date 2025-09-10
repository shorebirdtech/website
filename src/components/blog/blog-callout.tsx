import { Ellipse } from '@/components/ellipse';
import { GradientOutlineButton } from '@/components/ui/button';
import config from '@/config';
import NewsletterSignupForm from '../newsletter/newsletter-form';

function BlogCallout() {
  return (
    <div className="border-border-1 max-w-screen-md rounded-xl border p-5">
      <span className="text-text-2 my-0 font-light">
        Shorebird is helping businesses succeed with Flutter allowing you to
        deliver updates faster, with confidence, and keep growing without
        slowing down.
      </span>
      <a
        target="_blank"
        href={config.consoleUrl}
        className="mt-4 inline-block w-full px-4 py-2"
      >
        <GradientOutlineButton className="w-full">
          <Ellipse /> Get started
        </GradientOutlineButton>
      </a>
      <div className="text-text-2 before:border-border-1 after:border-border-1 flex items-center py-3 text-sm before:me-6 before:flex-1 before:border-t after:ms-6 after:flex-1 after:border-t">
        OR
      </div>
      <NewsletterSignupForm />
    </div>
  );
}

export { BlogCallout };
