import { JSX } from "react";

import Divider from "@/components/Divider";

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function DetailSection({
  title,
  children,
}: DetailSectionProps): JSX.Element {
  return (
    <div>
      <div className="text-md font-bold text-black pb-[5px]">{title}</div>

      <div className="pb-[2.5px]">
        <Divider />
      </div>

      {children}
    </div>
  );
}
