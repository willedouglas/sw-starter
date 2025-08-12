import { JSX } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps): JSX.Element {
  return (
    <div
      className={`bg-white rounded-[2px] p-[15px] shadow-[0_0.5px_1px_0_var(--color-warm-gray)] border-[0.5px] border-[var(--color-warm-gray)] ${className}`}
    >
      {children}
    </div>
  );
}
