import { ButtonLink } from '@/components/ui/button';
import config from '@/config';
import NewsletterSignupForm from '../newsletter/newsletter-form';

/**
 * "Get started / or subscribe" callout. No longer used by the blog post
 * layout (the live template puts the newsletter in the sidebar instead) but
 * kept for other layouts that still render it.
 */
function BlogCallout() {
  return (
    <div className="border-border bg-surface-2 max-w-screen-md rounded-2xl border p-6">
      <p className="body-s my-0">
        Shorebird empowers Flutter teams to focus on building great apps by
        handling the hard parts like zero-config CI or instant over-the-air
        updates.
      </p>
      <ButtonLink
        variant="primary"
        href={config.consoleUrl}
        target="_blank"
        rel="noopener"
        className="mt-4 w-full"
      >
        Get started
      </ButtonLink>
      <div className="body-xs before:border-border after:border-border flex items-center py-3 before:me-6 before:flex-1 before:border-t after:ms-6 after:flex-1 after:border-t">
        OR
      </div>
      <NewsletterSignupForm />
    </div>
  );
}

export { BlogCallout };
