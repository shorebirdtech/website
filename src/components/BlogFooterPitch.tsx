import { motion } from 'framer-motion';

export const BlogFooterPitch = () => {
  return (
    <div className="mx-auto max-w-screen-md">
      <p className="mx-auto mb-8 max-w-2xl font-light italic text-gray-400 md:mb-12">
        <a href="/">Shorebird Code Push</a> allows you update your Flutter apps
        instantly, over the air, directly on end users' devices. It takes less
        than 5 minutes to integrate and requires no changes to your code or dev
        workflows. Code Push can update *any* Dart code and is designed to help
        you fix your app quickly and safely, while complying with Apple and
        Google store policies.
      </p>
    </div>
  );
};
