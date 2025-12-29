import clsx from 'clsx';

interface LayoutFooterProps {
  className?: string;
}

export function LayoutFooter({ className }: LayoutFooterProps) {
  return (
    <footer
      className={clsx(
        'text-colorTextSecondary flex h-10 shrink-0 flex-wrap items-center justify-center text-xs md:text-sm',
        className,
      )}
    >
      Copyright &copy;&nbsp; 2025
      <>&nbsp;</>
      <span>
        <a
          href="https://github.com/tzuyi0817"
          rel="noreferrer noopener"
          target="_blank"
        >
          Tzuyi &nbsp;
        </a>
      </span>
      All right reserved
    </footer>
  );
}
