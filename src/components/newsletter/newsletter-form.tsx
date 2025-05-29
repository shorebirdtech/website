import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowCounterClockwiseIcon } from '@phosphor-icons/react';

const INIT = 'INIT';
const SUBMITTING = 'SUBMITTING';
const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';
const formStates = [INIT, SUBMITTING, ERROR, SUCCESS] as const;

export default function NewsletterSignupForm() {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<(typeof formStates)[number]>(INIT);
  const [errorMessage, setErrorMessage] = useState('');

  const resetForm = () => {
    setEmail('');
    setFormState(INIT);
    setErrorMessage('');
  };

  const hasRecentSubmission = () => {
    const time = new Date();
    const timestamp = time.valueOf();
    const previousTimestamp = localStorage.getItem('loops-form-timestamp');

    if (
      previousTimestamp &&
      Number(previousTimestamp) + 60 * 1000 > timestamp
    ) {
      setFormState(ERROR);
      setErrorMessage('Too many signups, please try again in a little while');
      return true;
    }

    localStorage.setItem('loops-form-timestamp', timestamp.toString());
    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formState !== INIT) return;
    if (!isValidEmail(email)) {
      setFormState(ERROR);
      setErrorMessage('Please enter a valid email');
      return;
    }
    if (hasRecentSubmission()) return;
    setFormState(SUBMITTING);

    const formBody = `userGroup=${encodeURIComponent(
      'newsletter-signup',
    )}&email=${encodeURIComponent(email)}&mailingLists=`;

    fetch(
      `https://app.loops.so/api/newsletter-form/clkle380400tojo0nmapdkds7`,
      {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
      .then((res: any) => [res.ok, res.json(), res])
      .then(([ok, dataPromise, res]) => {
        if (ok) {
          resetForm();
          setFormState(SUCCESS);
        } else {
          dataPromise.then((data: any) => {
            setFormState(ERROR);
            setErrorMessage(data.message || res.statusText);
            localStorage.setItem('loops-form-timestamp', '');
          });
        }
      })
      .catch((error) => {
        setFormState(ERROR);
        if (error.message === 'Failed to fetch') {
          setErrorMessage(
            'Too many signups, please try again in a little while',
          );
        } else if (error.message) {
          setErrorMessage(error.message);
        }
        localStorage.setItem('loops-form-timestamp', '');
      });
  };

  switch (formState) {
    case SUCCESS:
      return (
        <div className="flex w-full items-center justify-center rounded-lg bg-green-300 p-3">
          <p className="text-center text-xl text-green-800">
            Thanks, we'll be in touch!
          </p>
        </div>
      );
    case ERROR:
      return (
        <div className="flex flex-col">
          <SignUpFormError />
          <BackButton />
        </div>
      );
    default:
      return (
        <>
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full flex-col items-center justify-center gap-2 space-x-2 sm:flex-row"
          >
            <Input
              className="border-border-1"
              type="email"
              name="email"
              placeholder="Subscribe to our newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <SignUpFormButton />
          </form>
        </>
      );
  }

  function SignUpFormError() {
    return (
      <div className="flex w-full items-center justify-center rounded-lg bg-red-300 p-3">
        <p className="text-center text-xl text-red-800">
          {errorMessage || 'Oops! Something went wrong, please try again'}
        </p>
      </div>
    );
  }

  function BackButton() {
    return (
      <Button variant="ghost" className="hover:underline" onClick={resetForm}>
        <ArrowCounterClockwiseIcon className="size-5" /> Try Again
      </Button>
    );
  }

  function SignUpFormButton() {
    return (
      <Button
        variant="outline"
        size="sm"
        className="w-full sm:w-min"
        type="submit"
      >
        {formState === SUBMITTING ? 'Please wait...' : 'Subscribe'}
      </Button>
    );
  }
}

function isValidEmail(email: any) {
  return /.+@.+/.test(email);
}
