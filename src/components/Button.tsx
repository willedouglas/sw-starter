import { JSX } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps): JSX.Element {
  const baseClasses =
    "h-[var(--size-small)] text-sm text-white font-bold border border-solid border-[0.5px] rounded-[10px] uppercase";

  const enabledClasses =
    "border-[var(--green-teal)] bg-[var(--green-teal)] cursor-pointer";

  const disabledClasses =
    "border-[var(--color-pinkish-grey)] bg-[var(--color-pinkish-grey)] cursor-not-allowed";

  const buttonClasses = `${baseClasses} ${
    props.disabled ? disabledClasses : enabledClasses
  }`;

  return (
    <button className={buttonClasses} {...props}>
      {props.children}
    </button>
  );
}
