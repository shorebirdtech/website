import { cn } from '@/lib/utils.ts';

function Spacer({ className }: { className?: string }) {
  return <div className={cn('h-4', className)}></div>;
}

export { Spacer };
