import { useState } from 'react';

/**
 * The Code Push guide download form (Webflow `#email-form` on
 * `/code-push-guide`). Posts first/last name + email to the Loops newsletter
 * endpoint with `source=ebook-CP-guide` / `userGroup=web-download`, then
 * swaps to the "Thank you" state with the PDF download link, like the
 * Webflow `.w-form-done` block.
 */
const LOOPS_ENDPOINT =
  'https://app.loops.so/api/newsletter-form/clkle380400tojo0nmapdkds7';
const GUIDE_PDF = '/guides/shorebird-code-push-guide.pdf';

type FormState = 'idle' | 'submitting' | 'done' | 'error';

const inputClass =
  'h-11 w-full max-w-[280px] rounded-[10px] border border-[#ccc] bg-white px-3 text-sm text-[#333] placeholder:text-[#757575] focus:border-[#816aa8] focus:outline-none';
const buttonClass =
  'flex h-11 w-full max-w-[280px] cursor-pointer items-center justify-center rounded-[10px] bg-[#816aa8] px-4 text-lg font-medium text-white transition-colors hover:bg-[#6f5a93] hover:text-white hover:no-underline disabled:opacity-60';

function GuideForm() {
  const [state, setState] = useState<FormState>('idle');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === 'submitting') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    // Honeypot: Webflow's hidden "country" field.
    if (data.get('country')) return;
    setState('submitting');
    const body = new URLSearchParams();
    for (const key of ['firstName', 'lastName', 'email']) {
      body.set(key, String(data.get(key) ?? ''));
    }
    body.set('source', 'ebook-CP-guide');
    body.set('userGroup', 'web-download');
    fetch(LOOPS_ENDPOINT, {
      method: 'POST',
      body: body.toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        setState('done');
      })
      .catch(() => setState('error'));
  };

  if (state === 'done') {
    return (
      <div className="flex w-full flex-col items-center gap-4 text-center md:items-start md:text-left">
        <p className="body-m text-text-1">
          Thank you! Download the guide below and we&apos;ve also emailed you a
          link.
        </p>
        <a
          href={GUIDE_PDF}
          target="_blank"
          rel="noopener"
          className={buttonClass}
        >
          Download the guide
        </a>
      </div>
    );
  }

  return (
    <form
      id="email-form"
      name="email-form"
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-2.5 md:items-start"
    >
      <input
        className={inputClass}
        maxLength={256}
        name="firstName"
        placeholder="First name"
        type="text"
        id="firstName"
        autoComplete="given-name"
      />
      <input
        className={inputClass}
        maxLength={256}
        name="lastName"
        placeholder="Last name"
        type="text"
        id="lastName"
        autoComplete="family-name"
        required
      />
      <input
        className={inputClass}
        maxLength={256}
        name="email"
        placeholder="Email"
        type="email"
        id="email"
        autoComplete="email"
        required
      />
      <input
        className="absolute hidden"
        tabIndex={-1}
        autoComplete="off"
        name="country"
        placeholder="country"
        type="text"
        id="country"
      />
      <button
        type="submit"
        className={buttonClass}
        disabled={state === 'submitting'}
      >
        {state === 'submitting' ? 'Please wait...' : 'Submit'}
      </button>
      {state === 'error' && (
        <p className="body-s text-text-1 w-full max-w-[280px] text-center">
          Oops! Something went wrong while submitting the form.
        </p>
      )}
    </form>
  );
}

export { GuideForm };
