import { JSX } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps): JSX.Element {
  return (
    <input
      className="h-[var(--size-medium)] rounded-[2px] border border-solid border-[0.5px] border-[var(--color-pinkish-grey)] bg-white shadow-[inset_0_0.5px_1.5px_0_var(--color-warm-gray)] text-xs font-bold px-[5px] py-[5px]"
      {...props}
    />
  );
}
