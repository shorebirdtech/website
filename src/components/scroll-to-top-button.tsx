import { Button } from '@/components/ui/button';
import { CaretUpIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
  }, []);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setIsVisible(true);
    } else if (scrolled <= 300) {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          variant="outline"
          size="icon"
          className="fixed right-6 bottom-6 z-50 flex size-12 cursor-pointer items-center justify-center transition"
          onClick={scrollToTop}
        >
          <CaretUpIcon weight="bold" className="text-accent-primary-1 size-8" />
        </Button>
      )}
    </>
  );
}

export { ScrollToTopButton };
