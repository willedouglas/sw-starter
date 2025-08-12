import { JSX } from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export default function Link({ href, children }: LinkProps): JSX.Element {
  return (
    <a
      href={href}
      className="text-sm text-blue-600 hover:text-blue-800 underline hover:no-underline"
    >
      {children}
    </a>
  );
}
