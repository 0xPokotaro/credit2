import { SVGProps } from "react";

interface CheckmarkIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function CheckmarkIcon({
  size = 20,
  className = "text-green-600",
  ...props
}: CheckmarkIconProps) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      width={size}
      height={size}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
