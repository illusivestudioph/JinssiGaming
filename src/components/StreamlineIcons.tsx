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
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5">
        <path d="M38.306 28.529c4.049 -0.001 7.065 -3.332 6.48 -7.338C43.33 11.236 34.652 3 24.005 3 12.403 3 3 12.402 3 24s9.404 21 21.005 21c3.143 0 5.48 -0.644 5.936 -2.511 0.457 -1.868 -0.165 -2.37 -2.283 -7.532 -1.083 -2.64 0.094 -5.07 1.827 -5.935 1.646 -0.823 5.269 -0.492 8.821 -0.493Z" />
        <path d="M23 14a5 5 0 1 0 10 0 5 5 0 1 0 -10 0" />
        <path d="M10 21.5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0 -9 0" />
        <path d="M15 34.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 1 0 -7 0" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Compass Navigator (Cozy Explorer)
 */
export function StreamlineCompass({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5">
        <path d="M35.8352 35.8347c-4.2533 4.2535 -21.6814 7.9288 -29.72818 9.436 -2.01853 0.3781 -3.74661 -1.3574 -3.36118 -3.3745 1.54273 -8.074 5.28734 -25.5984 9.42026 -29.7314 4.133 -4.13312 21.6566 -7.87682 29.7302 -9.41911 2.0171 -0.38532 3.7525 1.3427 3.3744 3.36116 -1.5071 8.04655 -5.1821 25.47435 -9.4355 29.72785Z" />
        <path d="M24 17c-3.866 0 -7 3.134 -7 7s3.134 7 7 7 7 -3.134 7 -7 -3.134 -7 -7 -7Z" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Book 1 (Bookworm)
 */
export function StreamlineBook({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5">
        <path d="M37.8479 44.4957c2.551 -0.2182 4.4766 -2.1972 4.6643 -4.7506C42.7496 36.517 43 31.3657 43 24s-0.2504 -12.517 -0.4878 -15.74508c-0.1877 -2.55343 -2.1132 -4.5324 -4.6643 -4.75062C34.9089 3.25287 30.3696 3 24 3c-6.3695 0 -10.9088 0.25286 -13.8479 0.50429 -2.55102 0.21822 -4.47654 2.19719 -4.66429 4.75062C5.25045 11.483 5 16.6343 5 24c0 7.3657 0.25044 12.517 0.48779 15.7451 0.18775 2.5534 2.11328 4.5324 4.66431 4.7506C13.0912 44.7471 17.6304 45 24 45c6.3696 0 10.9088 -0.2529 13.8479 -0.5043Z" />
        <path d="M14 3.2417v41.5162" />
        <path d="M22 12h12" />
        <path d="M22 19h6" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Controller 1 (Retro Gamer)
 */
export function StreamlineGamepad({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5">
        <path d="M44.865 33.492c-0.415 -9.61 -1.708 -15.937 -2.725 -19.566 -0.694 -2.474 -2.84 -4.11 -5.398 -4.357C33.848 9.291 29.5 8.998 24 8.998c-5.5 0 -9.847 0.293 -12.74 0.571 -2.559 0.247 -4.705 1.883 -5.399 4.357 -1.017 3.629 -2.31 9.956 -2.725 19.566 -0.171 3.943 2.218 7.506 6.164 7.506 0.524 0 1.014 -0.017 1.473 -0.045 3.17 -0.201 5.383 -2.716 6.373 -5.734l0.04 -0.117c0.33 -1.006 1.052 -1.84 2.077 -2.1 1.05 -0.269 2.63 -0.537 4.737 -0.537 2.108 0 3.688 0.268 4.738 0.536 1.025 0.262 1.748 1.095 2.078 2.101l0.038 0.117c0.99 3.018 3.205 5.533 6.374 5.733 0.458 0.03 0.95 0.046 1.472 0.046 3.947 0 6.336 -3.563 6.165 -7.506Z" />
        <path d="M15 17v8" />
        <path d="m19 21 -8 0" />
        <path d="m33 24 0 1" />
        <path d="m30 21 -1 0" />
        <path d="M33 17v1" />
        <path d="m37 21 -1 0" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Coffee Mug (Cafe Regular)
 */
export function StreamlineCoffee({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5">
        <path d="M5.078 36.31c0.15 4.652 3.207 8.132 7.849 8.465C14.81 44.91 17.14 45 20 45c2.86 0 5.19 -0.09 7.073 -0.225 4.642 -0.333 7.698 -3.813 7.849 -8.465 0.048 -1.478 0.078 -3.233 0.078 -5.31 0 -5.568 -0.217 -8.922 -0.411 -10.813 -0.137 -1.328 -1.072 -2.34 -2.392 -2.535C30.164 17.35 26.42 17 20 17c-6.42 0 -10.165 0.35 -12.197 0.652 -1.32 0.195 -2.255 1.207 -2.392 2.535C5.217 22.077 5 25.432 5 31c0 2.077 0.03 3.832 0.078 5.31Z" />
        <path d="M35 22h2.632c2.733 0 5.105 1.862 5.288 4.589a36.103 36.103 0 0 1 0 4.822C42.737 34.138 40.365 36 37.632 36H35" />
        <path d="M25 3v7" />
        <path d="M17 5v7" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Moon Stars (Midnight Scholar)
 */
export function StreamlineMoon({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5">
        <path d="M18.228 19.47c0 7.669 6.216 13.885 13.884 13.885 1.121 0 2.21 -0.133 3.254 -0.383 0.81 -0.195 1.595 0.54 1.271 1.31C33.987 40.578 27.76 45 20.5 45 10.835 45 3 37.165 3 27.5S10.835 10 20.5 10c0.571 0 0.849 0.68 0.506 1.138a13.823 13.823 0 0 0 -2.778 8.333Z" />
        <path d="M38.324 27.404c-0.261 0.795 -1.386 0.795 -1.648 0l-1.615 -4.912a0.868 0.868 0 0 0 -0.553 -0.553l-4.912 -1.615c-0.795 -0.262 -0.795 -1.387 0 -1.648l4.912 -1.615a0.868 0.868 0 0 0 0.553 -0.553l1.615 -4.912c0.261 -0.795 1.386 -0.795 1.648 0l1.615 4.912a0.868 0.868 0 0 0 0.553 0.553l4.912 1.615c0.795 0.262 0.795 1.387 0 1.648l-4.912 1.615a0.868 0.868 0 0 0 -0.553 0.553l-1.615 4.912Z" />
        <path d="M29 4v6" />
        <path d="m32 7 -6 0" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Pencil Circle (Edit Profile / Character)
 */
export function StreamlinePencil({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5">
        <path d="M41.887 16.436c1.938 -1.939 2.676 -4.773 1.022 -6.96A22.42 22.42 0 0 0 40.86 7.14a22.544 22.544 0 0 0 -2.336 -2.05c-2.187 -1.653 -5.021 -0.915 -6.96 1.023L16.127 21.551c-0.544 0.544 -0.917 1.234 -0.99 2 -0.126 1.298 -0.241 3.725 0.022 7.491a1.94 1.94 0 0 0 1.799 1.799c3.766 0.263 6.193 0.148 7.492 0.023 0.765 -0.074 1.455 -0.447 1.999 -0.99l15.438 -15.438Z" />
        <path d="M39.548 18.775c-0.572 -1.265 -1.808 -3.41 -4.36 -5.963 -2.552 -2.551 -4.697 -3.788 -5.962 -4.36" />
        <path d="M42.973 23.947c0.018 0.349 0.027 0.7 0.027 1.053 0 11.046 -8.954 20 -20 20S3 36.046 3 25 11.954 5 23 5c0.353 0 0.704 0.01 1.053 0.027" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Calendar Mark (Member Joined Date)
 */
export function StreamlineCalendar({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5">
        <path d="M22 25h4" />
        <path d="M32 25h4" />
        <path d="M16 25h-4" />
        <path d="M22 35h4" />
        <path d="M32 35h4" />
        <path d="M16 35h-4" />
        <path d="M11.003 8.563c-1.137 0.11 -2.12 0.225 -2.952 0.336 -2.199 0.293 -3.877 1.948 -4.192 4.144C3.451 15.887 3 20.41 3 26.5c0 6.09 0.451 10.614 0.859 13.458 0.315 2.196 1.993 3.85 4.192 4.144 3.13 0.417 8.38 0.898 15.949 0.898 7.568 0 12.818 -0.48 15.949 -0.898 2.199 -0.293 3.877 -1.948 4.192 -4.144 0.408 -2.844 0.859 -7.368 0.859 -13.458 0 -6.089 -0.451 -10.613 -0.859 -13.457 -0.315 -2.196 -1.993 -3.851 -4.192 -4.144a82.173 82.173 0 0 0 -2.952 -0.336" />
        <path d="M29 8.074A164.037 164.037 0 0 0 24 8c-1.796 0 -3.462 0.027 -5 0.074" />
        <path d="M29.013 9.27c0.043 2.08 1.409 3.694 3.489 3.726a32.976 32.976 0 0 0 0.996 0c2.08 -0.032 3.446 -1.646 3.489 -3.726a61.262 61.262 0 0 0 0 -2.54c-0.043 -2.08 -1.409 -3.694 -3.489 -3.726a32.444 32.444 0 0 0 -0.996 0c-2.08 0.032 -3.446 1.646 -3.489 3.726a61.262 61.262 0 0 0 0 2.54Z" />
        <path d="M11.013 9.27c0.043 2.08 1.409 3.694 3.489 3.726a32.976 32.976 0 0 0 0.996 0c2.08 -0.032 3.446 -1.646 3.489 -3.726a61.262 61.262 0 0 0 0 -2.54c-0.043 -2.08 -1.409 -3.694 -3.489 -3.726a32.444 32.444 0 0 0 -0.996 0c-2.08 0.032 -3.446 1.646 -3.489 3.726a61.262 61.262 0 0 0 0 2.54Z" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Guidance Free - Remove X Cross (Modal Close)
 */
export function StreamlineClose({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 6L6 18M6 6l12 12"
      />
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Check Thick (Confirmation)
 */
export function StreamlineCheck({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.5"
        d="M43.696 9.135c0.98 1.336 0.762 3.135 -0.15 4.518 -8.535 12.93 -14.682 20.785 -18.083 24.85 -1.687 2.015 -4.617 2.163 -6.525 0.354A164.987 164.987 0 0 1 4.955 23.794c-1.21 -1.483 -1.46 -3.576 -0.282 -5.085 1.024 -1.312 2.193 -2.438 3.25 -3.33 1.753 -1.48 4.284 -1.144 5.86 0.524 4.863 5.152 7.794 8.75 7.794 8.75s4.818 -7.04 12.548 -17.87c1.197 -1.677 3.33 -2.458 5.132 -1.459 1.447 0.803 3.129 2.025 4.439 3.81Z"
      />
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Login 1 / Sign Out
 */
export function StreamlineLogOut({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5">
        <path d="M30.897 15c-0.07 -2.863 -0.168 -5.128 -0.262 -6.84 -0.137 -2.504 -1.93 -4.516 -4.425 -4.762C24.06 3.186 21.027 3 17 3c-4.027 0 -7.061 0.186 -9.21 0.398 -2.496 0.246 -4.288 2.258 -4.425 4.763C3.188 11.382 3 16.562 3 24c0 7.438 0.188 12.618 0.365 15.84 0.137 2.504 1.93 4.516 4.425 4.762 2.15 0.212 5.183 0.398 9.21 0.398 4.027 0 7.061 -0.186 9.21 -0.398 2.495 -0.246 4.288 -2.258 4.425 -4.762 0.094 -1.712 0.191 -3.977 0.262 -6.84" />
        <path d="M18.866 34.122c1.11 0.94 2.608 0.236 2.706 -1.215 0.085 -1.287 0.177 -2.885 0.24 -4.622l19.505 -0.71c1.25 -0.045 2.348 -0.868 2.493 -2.11 0.051 -0.442 0.087 -0.936 0.087 -1.465 0 -0.53 -0.036 -1.024 -0.087 -1.465 -0.145 -1.242 -1.242 -2.065 -2.493 -2.11l-19.504 -0.71a156.04 156.04 0 0 0 -0.241 -4.624c-0.097 -1.45 -1.597 -2.155 -2.707 -1.215 -0.977 0.827 -2.262 1.984 -3.886 3.577 -2.67 2.62 -3.966 4.453 -4.576 5.5a2.047 2.047 0 0 0 0 2.09c0.61 1.047 1.906 2.88 4.576 5.501 1.624 1.594 2.91 2.751 3.887 3.578Z" />
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
        strokeWidth="2"
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
