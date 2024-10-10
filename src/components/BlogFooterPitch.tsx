import { config } from '~/config';

export const BlogFooterPitch = () => {
  return (
    <div className="max-w-screen-md rounded-xl border p-4">
      <span className="my-0 font-light text-gray-400">
        <a href="/">Shorebird Code Push</a> allows you update your Flutter apps
        instantly, over the air, directly on end users' devices. It takes less
        than 5 minutes to integrate and requires no changes to your code or dev
        workflows. Code Push can update{' '}
        <span className="font-bold italic">any</span> Dart code and is designed
        to help you fix your app quickly and safely, while complying with Apple
        and Google store policies.
      </span>
      <a
        target="_blank"
        href={config.consoleUrl}
        className="plausible-event-name=Blog+Footer+Get+Started+Button+Clicked shorebird-button-primary mt-6 inline-block w-full rounded-xl rounded-t-xl px-4 py-2 text-center font-bold leading-loose"
      >
        Get Started With Shorebird
      </a>
    </div>
  );
};
