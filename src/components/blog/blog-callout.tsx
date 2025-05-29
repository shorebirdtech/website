import { Ellipse } from '@/components/ellipse';
import { Button, GradientOutlineButton } from '@/components/ui/button';
import config from '@/config';

function BlogCallout() {
  return (
    <div className="border-border-1 max-w-screen-md rounded-xl border p-5">
      <span className="text-text-2 my-0 font-light">
        Shorebird allows you update your Flutter apps instantly, over the air.
        It takes less than 5 minutes to integrate and complies with Apple and
        Google store policies.
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
      <div id="mc_embed_signup" className="mt-4">
        <form
          action={config.newsletterSubscriptionUrl}
          method="get"
          id="mc-embedded-subscribe-form"
          target="_self"
        >
          <div className="mt-4 inline-block w-full px-4 py-2">
            <div>
              <Button
                variant="outline"
                className="w-full"
                id="mc-embedded-subscribe"
                type="submit"
                value="Subscribe to our Newsletter"
                name="subscribe"
              >
                Subscribe to our Newsletter
              </Button>
              {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="b_782cd1f159c245fdb1a73bfb3_f3a2318a39"
                  tabIndex={-1}
                  value=""
                  readOnly
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export { BlogCallout };
