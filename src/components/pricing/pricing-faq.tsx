import { Markdown } from '@/components/ui/markdown';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How many patch installs will I use?',
    answer:
      'You are only billed for successful patch installs.  \
    This occurs when the user opens your app with the new patch installed.  \
    A rule of thumb is number of patches per month times number of monthly active users.  \
    If you have 1000 MAU and you ship 4 patches per month, you will likely use about 4000 patch installs.',
  },
  {
    question: 'Do you offer discounts?',
    answer:
      'We offer committed use discounts for customers who commit to a certain number of patch installs per month.  We offer committed usage discounts starting at 2.5M patches per month.',
  },
  {
    question: 'How much are your Enterprise plans?',
    answer:
      'We offer our enterprise services starting at $2,000 per month.  Below that level we recommend our self-service plans.',
  },
  {
    question: 'Do patch installs expire?',
    answer:
      'Yes, patch install credits expire at the end of each billing period, typically one month.  We do not offer rollover credits.',
  },
  {
    question: 'Can I pay annually?',
    answer: 'Yes, all paid plans support annual or monthly billing.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept any method of payment Stripe accepts in your region.  Enterprise customers can also pay by invoice.',
  },
  {
    question: 'When am I charged for patch installs?',
    answer:
      'At the start of each billing period, you are billed for your pre-paid patches. \
       In the case of a Pro plan, this includes 50,000 pre-paid patch installs. \
      "Overage" patch installs are billed at the end of each billing period. \
      The initial invoice (month 1) will only include the prepaid patches, however successive months will include \
      overage bills as well.  For example, if you are using the Pro plan \
      (includes 50,000 pre-paid patches), and you use 100,000 patch installs each month, \
      you will be charged $20 when you sign up, and then $40 at the beginning of month 2 \
      ($20 for the 50,000 overage, and $20 for Month 2\'s Pro plan). \
      You can always check the status of your account and billing at \
      https://console.shorebird.dev/account.',
  },
];

function PricingFaq() {
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

export { PricingFaq };
