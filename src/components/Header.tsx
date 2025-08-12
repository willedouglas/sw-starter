interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white h-[25px] flex items-center justify-center shadow-[0_1px_0_0_var(--color-gray)] border-[0.5px] border-[var(--color-warm-gray)]">
      <h1 className="text-green-teal text-sm font-bold">{title}</h1>
    </header>
  );
}
