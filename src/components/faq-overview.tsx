import { Markdown } from '@/components/markdown';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Does Shorebird work for existing apps?',
    answer:
      'Yes. Shorebird requires no code changes to your Flutter app to adopt. See our [quick start guide](https://docs.shorebird.dev/guides/code_push_quickstart) to get started.',
  },
  {
    question: 'Does Shorebird comply with Play Store and App Store guidelines?',
    answer:
      'Yes. Shorebird has been designed to comply with Play Store and App Store guidelines. Code push is common in the industry, including several other commercial update products from Microsoft [App Center](https://appcenter.ms), [Expo](https://expo.dev), and [Ionic](https://ionic.io/). Refer to the [FAQs](https://docs.shorebird.dev/faq#does-shorebird-comply-with-play-store-guidelines) for more info.',
  },
  {
    question: 'Can I use this in production?',
    answer:
      'Yes! Shorebird is production ready on iOS and Android and has been used in production by thousands of apps since early 2023.  We safely deliver millions of patches every month on behalf of our customers.',
  },
  {
    question: 'Can Shorebird see my source code?',
    answer:
      'No. Shorebird never stores or transmits your source code. See our [documentation](https://docs.shorebird.dev/faq/#does-shorebird-store-my-source-code) for more information.',
  },
  {
    question: 'Can I self-host Shorebird or do you offer on-prem?',
    answer:
      'No. Shorebird only offers a centrally hosted solution at this time.',
  },
  {
    question: 'Where is the roadmap?',
    answer:
      'Shorebird is developed entirely in the public, including our [project boards](https://github.com/orgs/shorebirdtech/projects) shows what we are currently working on.',
  },
];

function FaqOverview() {
  return (
    <Accordion type="multiple" className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem value={`faq-${index}`} key={index}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent className="markdown">
            <Markdown content={faq.answer} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { FaqOverview };
