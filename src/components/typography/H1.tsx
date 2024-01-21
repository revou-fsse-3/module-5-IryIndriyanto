import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  children: string;
}

export function H1({ className, children, ...props }: Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
