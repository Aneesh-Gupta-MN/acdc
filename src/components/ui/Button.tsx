// Button provides named, accessible actions with the brand's two contrast-safe visual variants.
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; as?: "link" }) | (ButtonHTMLAttributes<HTMLButtonElement> & { as: "button"; href?: never });

export function Button({ className, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-touch items-center justify-center rounded-sm px-5 py-3 text-sm font-semibold tracking-[-0.01em] transition-colors",
    "focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold",
    className,
  );
  if (props.as === "button") {
    const { as: ignored, ...buttonProps } = props;
    void ignored;
    return <button className={classes} {...buttonProps} />;
  }
  const { as: ignored, ...linkProps } = props;
  void ignored;
  return <Link className={classes} {...linkProps} />;
}

export function PrimaryButton(props: ButtonProps) {
  return <Button className="bg-burgundy text-ivory hover:bg-burgundy-deep" {...props} />;
}

export function SecondaryButton(props: ButtonProps) {
  return <Button className="border border-burgundy text-burgundy hover:bg-cream" {...props} />;
}
