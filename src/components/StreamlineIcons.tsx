import React from 'react';

export interface StreamlineIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * Official Streamline Plump Line - Paint Palette
 */
export function StreamlinePalette({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <g>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
          d="M38.306 28.529c4.049 -0.001 7.065 -3.332 6.48 -7.338C43.33 11.236 34.652 3 24.005 3 12.403 3 3 12.402 3 24s9.404 21 21.005 21c3.143 0 5.48 -0.644 5.936 -2.511 0.457 -1.868 -0.165 -2.37 -2.283 -7.532 -1.083 -2.64 0.094 -5.07 1.827 -5.935 1.646 -0.823 5.269 -0.492 8.821 -0.493Z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
          d="M23 14a5 5 0 1 0 10 0 5 5 0 1 0 -10 0"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
          d="M10 21.5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0 -9 0"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
          d="M15 34.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 1 0 -7 0"
        />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Sharp Material - Dice 2
 */
export function StreamlineDice({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <g>
        <path
          fill="currentColor"
          d="M21 21H3V3h18zM5 19h14V5H5zm4.75 -2.25h-2.5v-2.5h2.5zm7 -7h-2.5v-2.5h2.5z"
        />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Guidance - User 1
 */
export function StreamlineUser({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.5 20.247V16S16 14.5 12 14.5 5.5 16 5.5 16v4.247M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5 1.5 17.799 1.5 12Zm10.426 0.5S8.5 10.68 8.5 8c0 -1.933 1.569 -3.5 3.504 -3.5A3.495 3.495 0 0 1 15.5 8c0 2.68 -3.426 4.5 -3.426 4.5h-0.148Z"
      />
    </svg>
  );
}

/**
 * Official Streamline Core - Glasses
 */
export function StreamlineGlasses({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.61536 1c0 -0.414214 0.33578 -0.75 0.75004 -0.75h0.9615c0.7089 0 1.3888 0.281627 1.8901 0.78293 0.5013 0.50129 0.783 1.1812 0.783 1.89015v6.06881L14 9v2.8846c0 0.4539 -0.1803 0.8893 -0.5013 1.2103 -0.321 0.3209 -0.7563 0.5013 -1.2102 0.5013H9.40386c-0.45393 0 -0.88926 -0.1804 -1.21024 -0.5013 -0.32098 -0.321 -0.5013 -0.7564 -0.5013 -1.2103V9.75H6.30769v2.1346c0 0.4539 -0.18032 0.8893 -0.5013 1.2103 -0.32097 0.3209 -0.75631 0.5013 -1.21024 0.5013H1.71154c-0.45393 0 -0.889267 -0.1804 -1.210242 -0.5013C0.180322 12.7739 0 12.3385 0 11.8846V2.92308c0 -0.70895 0.281627 -1.38885 0.782926 -1.89015C1.28423 0.531627 1.96413 0.25 2.67308 0.25h0.96154c0.41421 0 0.75 0.335786 0.75 0.75 0 0.41421 -0.33579 0.75 -0.75 0.75h-0.96154c-0.31112 0 -0.6095 0.12359 -0.82949 0.34359 -0.22 0.21999 -0.34359 0.51837 -0.34359 0.82949V8.25h11V2.92308c0 -0.31112 -0.1236 -0.6095 -0.3436 -0.82949 -0.22 -0.22 -0.5184 -0.34359 -0.8295 -0.34359h-0.9615c-0.41426 0 -0.75004 -0.33579 -0.75004 -0.75ZM1.5 9.75v2.1346c0 0.0561 0.02229 0.1099 0.06196 0.1496 0.03967 0.0397 0.09348 0.062 0.14958 0.062h2.88461c0.05611 0 0.10991 -0.0223 0.14958 -0.062 0.03968 -0.0397 0.06196 -0.0935 0.06196 -0.1496V9.75H1.5Zm7.69232 0v2.1346c0 0.0561 0.02229 0.1099 0.06196 0.1496 0.03967 0.0397 0.09348 0.062 0.14958 0.062h2.88464c0.0561 0 0.1099 -0.0223 0.1496 -0.062 0.0396 -0.0397 0.0619 -0.0935 0.0619 -0.1496V9.75H9.19232Z"
      />
    </svg>
  );
}

/**
 * Official Streamline Flex - Multiple Stars / Sparkles
 */
export function StreamlineStars({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.17483 4.3108c0.09152 -0.76022 0.37892 -1.42597 0.80571 -1.96906 0.33409 -0.42513 0.9666 -0.42513 1.30066 0 0.4268 0.54309 0.7142 1.20884 0.8058 1.96906 0.7602 0.09152 1.4259 0.37892 1.969 0.80571 0.4251 0.33409 0.4251 0.96661 0 1.3007 -0.5431 0.42679 -1.2088 0.71419 -1.969 0.80571 -0.0915 0.76022 -0.3789 1.42597 -0.8057 1.96906 -0.33411 0.42513 -0.96662 0.42513 -1.30071 0 -0.4268 -0.54309 -0.71419 -1.20884 -0.80572 -1.96906 -0.76021 -0.09152 -1.42597 -0.37892 -1.96906 -0.80571 -0.42513 -0.33409 -0.42513 -0.96661 0 -1.3007 0.54309 -0.42679 1.2088 -0.71419 1.96902 -0.80571Z"
      />
      <path
        fill="currentColor"
        d="M2.48502 9.14741c0.07441 -0.61805 0.30806 -1.1593 0.65505 -1.60083 0.27161 -0.34563 0.78584 -0.34563 1.05746 0 0.34698 0.44153 0.58063 0.98278 0.65504 1.60083 0.61805 0.07441 1.1593 0.30806 1.60084 0.65505 0.34563 0.27164 0.34563 0.78584 0 1.05744 -0.44154 0.347 -0.98275 0.5807 -1.60081 0.6551 -0.0744 0.618 -0.30806 1.1593 -0.65504 1.6008 -0.27161 0.3456 -0.78584 0.3456 -1.05746 0 -0.34698 -0.4415 -0.58063 -0.9828 -0.65504 -1.6008 -0.61805 -0.0745 -1.15931 -0.3081 -1.600838 -0.6551 -0.345629 -0.2716 -0.345629 -0.7858 0 -1.05744 0.441528 -0.34699 0.982748 -0.58064 1.600798 -0.65505Z"
      />
    </svg>
  );
}
