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
          action="https://dev.us21.list-manage.com/subscribe/post?u=782cd1f159c245fdb1a73bfb3&amp;id=f3a2318a39&amp;f_id=007fece1f0"
          method="post"
          id="mc-embedded-subscribe-form"
          target="_self"
        >
          <div className="mx-auto mb-3 max-w-screen-sm items-center gap-2 space-y-4 sm:flex sm:space-y-0">
            <div className="relative w-full">
              <label
                htmlFor="mce-EMAIL"
                className="text-text-2 mb-2 hidden text-sm font-medium"
              >
                Email address
              </label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="text-text-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                className="border-border-1 text-text-1 placeholder-text-text-2 block w-full rounded-lg border p-3 pl-10 text-sm md:rounded-lg"
                placeholder="Subscribe to our newsletter"
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                autoComplete="email"
                required={false}
              />
            </div>
            <div>
              <Button
                variant="outline"
                className="w-full md:w-auto"
                id="mc-embedded-subscribe"
                type="submit"
                value="Subscribe"
                name="subscribe"
              >
                Subscribe
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
