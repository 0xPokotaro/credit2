import { SVGProps } from "react";

interface CheckmarkSimpleIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function CheckmarkSimpleIcon({
  size = 24,
  className = "text-green-600",
  ...props
}: CheckmarkSimpleIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
