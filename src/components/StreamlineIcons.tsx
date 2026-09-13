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

/**
 * Official Streamline Plump Duo - Cozy Explorer Map Pin & Star
 */
export function StreamlineCompassDuo({ className = 'w-5 h-5', size, ...props }: StreamlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillOpacity="0.25"
        d="M42 21c0 12.919 -13.35 22.128 -17.056 24.436a1.765 1.765 0 0 1 -1.888 0C19.351 43.128 6 33.919 6 21c0 -9.941 8.059 -18 18 -18s18 8.059 18 18Z"
      />
      <path
        fill="currentColor"
        fillOpacity="0.75"
        d="M22.224 11.423c0.746 -1.439 2.805 -1.439 3.55 0l2.156 4.155 4.614 0.909c1.523 0.3 2.138 2.145 1.1 3.3L30.36 23.44l0.6 4.861c0.196 1.584 -1.45 2.747 -2.878 2.035L24 28.298l-4.081 2.038c-1.428 0.712 -3.074 -0.451 -2.878 -2.035l0.6 -4.861 -3.286 -3.654c-1.037 -1.154 -0.422 -3 1.101 -3.3l4.614 -0.908 2.155 -4.155Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M42 21c0 12.919 -13.35 22.128 -17.056 24.436a1.765 1.765 0 0 1 -1.888 0C19.351 43.128 6 33.919 6 21c0 -9.941 8.059 -18 18 -18s18 8.059 18 18Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22.224 11.423c0.747 -1.439 2.805 -1.439 3.551 0l2.156 4.155 4.613 0.909c1.523 0.3 2.139 2.145 1.1 3.3L30.36 23.44l0.6 4.861c0.195 1.584 -1.45 2.747 -2.878 2.035L24 28.298l-4.082 2.038c-1.427 0.712 -3.073 -0.451 -2.878 -2.035l0.6 -4.861 -3.285 -3.654c-1.038 -1.154 -0.422 -3 1.1 -3.3l4.614 -0.908 2.155 -4.155Z"
      />
    </svg>
  );
}

/**
 * Official Streamline Plump Duo - Bookworm Open Classic Book
 */
export function StreamlineBookDuo({ className = 'w-5 h-5', size, ...props }: StreamlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillOpacity="0.2"
        d="M37.8479 44.4957c2.551 -0.2182 4.4766 -2.1972 4.6643 -4.7506C42.7496 36.517 43 31.3657 43 24s-0.2504 -12.517 -0.4878 -15.74508c-0.1877 -2.55343 -2.1132 -4.5324 -4.6643 -4.75062C34.9089 3.25287 30.3696 3 24 3c-6.3695 0 -10.9088 0.25286 -13.8479 0.50429 -2.55102 0.21822 -4.47654 2.19719 -4.66429 4.75062C5.25045 11.483 5 16.6343 5 24c0 7.3657 0.25044 12.517 0.48779 15.7451 0.18775 2.5534 2.11328 4.5324 4.66431 4.7506C13.0912 44.7471 17.6304 45 24 45c6.3696 0 10.9088 -0.2529 13.8479 -0.5043Z"
      />
      <path
        fill="currentColor"
        fillOpacity="0.5"
        d="M14 3.2417v41.5162c-1.5012 -0.0795 -2.7802 -0.1711 -3.8479 -0.2624 -2.55104 -0.2182 -4.47656 -2.1972 -4.66431 -4.7506C5.25044 36.5168 5 31.3655 5 23.9998s0.25045 -12.517 0.48781 -15.74507c0.18775 -2.55344 2.11327 -4.53241 4.66429 -4.75063 1.0678 -0.09134 2.3467 -0.18287 3.8479 -0.2624Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M37.8479 44.4957c2.551 -0.2182 4.4766 -2.1972 4.6643 -4.7506C42.7496 36.517 43 31.3657 43 24s-0.2504 -12.517 -0.4878 -15.74508c-0.1877 -2.55343 -2.1132 -4.5324 -4.6643 -4.75062C34.9089 3.25287 30.3696 3 24 3c-6.3695 0 -10.9088 0.25286 -13.8479 0.50429 -2.55102 0.21822 -4.47654 2.19719 -4.66429 4.75062C5.25045 11.483 5 16.6343 5 24c0 7.3657 0.25044 12.517 0.48779 15.7451 0.18775 2.5534 2.11328 4.5324 4.66431 4.7506C13.0912 44.7471 17.6304 45 24 45c6.3696 0 10.9088 -0.2529 13.8479 -0.5043Z"
      />
      <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 3.2417v41.5162" />
      <path stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" d="M22 13h11M22 20h6" />
    </svg>
  );
}

/**
 * Official Streamline Plump Duo - Retro Gamer Handheld Gameboy
 */
export function StreamlineGameboyDuo({ className = 'w-5 h-5', size, ...props }: StreamlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillOpacity="0.25"
        d="M35.8764 44.4668c2.4574 -0.2273 4.3555 -2.0605 4.5731 -4.5188C40.7214 36.8764 41 31.8209 41 24s-0.2786 -12.8764 -0.5505 -15.94798c-0.2176 -2.45829 -2.1157 -4.29155 -4.5731 -4.51879C33.0585 3.27266 28.9316 3 24 3s-9.0585 0.27266 -11.8764 0.53323c-2.45739 0.22724 -4.3555 2.0605 -4.5731 4.51879C7.27861 11.1236 7 16.1791 7 24s0.27861 12.8764 0.5505 15.948c0.2176 2.4583 2.11571 4.2915 4.5731 4.5188C14.9415 44.7273 19.0684 45 24 45s9.0585 -0.2727 11.8764 -0.5332Z"
      />
      <path
        fill="currentColor"
        fillOpacity="0.6"
        d="M31.7513 26.7674c1.5625 -0.0967 2.8228 -1.1676 2.9865 -2.7245C34.8786 22.7035 35 20.7509 35 18c0 -2.7509 -0.1214 -4.7035 -0.2622 -6.0429 -0.1637 -1.5569 -1.424 -2.6278 -2.9865 -2.72447C29.9267 9.11974 27.2301 9 24 9c-3.2301 0 -5.9267 0.11974 -7.7513 0.23263 -1.5625 0.09667 -2.8228 1.16757 -2.9865 2.72447C13.1214 13.2965 13 15.2491 13 18c0 2.7509 0.1214 4.7035 0.2622 6.0429 0.1637 1.5569 1.424 2.6278 2.9865 2.7245C18.0733 26.8803 20.7699 27 24 27c3.2301 0 5.9267 -0.1197 7.7513 -0.2326Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M35.8764 44.4668c2.4574 -0.2273 4.3555 -2.0605 4.5731 -4.5188C40.7214 36.8764 41 31.8209 41 24s-0.2786 -12.8764 -0.5505 -15.94798c-0.2176 -2.45829 -2.1157 -4.29155 -4.5731 -4.51879C33.0585 3.27266 28.9316 3 24 3s-9.0585 0.27266 -11.8764 0.53323c-2.45739 0.22724 -4.3555 2.0605 -4.5731 4.51879C7.27861 11.1236 7 16.1791 7 24s0.27861 12.8764 0.5505 15.948c0.2176 2.4583 2.11571 4.2915 4.5731 4.5188C14.9415 44.7273 19.0684 45 24 45s9.0585 -0.2727 11.8764 -0.5332Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M31.7513 26.7674c1.5625 -0.0967 2.8228 -1.1676 2.9865 -2.7245C34.8786 22.7035 35 20.7509 35 18c0 -2.7509 -0.1214 -4.7035 -0.2622 -6.0429 -0.1637 -1.5569 -1.424 -2.6278 -2.9865 -2.72447C29.9267 9.11974 27.2301 9 24 9c-3.2301 0 -5.9267 0.11974 -7.7513 0.23263 -1.5625 0.09667 -2.8228 1.16757 -2.9865 2.72447C13.1214 13.2965 13 15.2491 13 18c0 2.7509 0.1214 4.7035 0.2622 6.0429 0.1637 1.5569 1.424 2.6278 2.9865 2.7245C18.0733 26.8803 20.7699 27 24 27c3.2301 0 5.9267 -0.1197 7.7513 -0.2326Z"
      />
      <circle cx="30.5" cy="35.5" r="3.5" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2.8" />
      <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M17.5 32v7M21 35.5h-7" />
    </svg>
  );
}

/**
 * Official Streamline Plump Duo - Cafe Regular Steaming Mug
 */
export function StreamlineCoffeeDuo({ className = 'w-5 h-5', size, ...props }: StreamlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillOpacity="0.25"
        d="M5.078 36.31c0.15 4.652 3.207 8.132 7.849 8.465C14.81 44.91 17.14 45 20 45c2.86 0 5.19 -0.09 7.073 -0.225 4.642 -0.333 7.698 -3.813 7.849 -8.465 0.048 -1.478 0.078 -3.233 0.078 -5.31 0 -5.568 -0.217 -8.922 -0.411 -10.813 -0.137 -1.328 -1.072 -2.34 -2.392 -2.535C30.164 17.35 26.42 17 20 17c-6.42 0 -10.165 0.35 -12.197 0.652 -1.32 0.195 -2.255 1.207 -2.392 2.535C5.217 22.077 5 25.432 5 31c0 2.077 0.03 3.832 0.078 5.31Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.078 36.31c0.15 4.652 3.207 8.132 7.849 8.465C14.81 44.91 17.14 45 20 45c2.86 0 5.19 -0.09 7.073 -0.225 4.642 -0.333 7.698 -3.813 7.849 -8.465 0.048 -1.478 0.078 -3.233 0.078 -5.31 0 -5.568 -0.217 -8.922 -0.411 -10.813 -0.137 -1.328 -1.072 -2.34 -2.392 -2.535C30.164 17.35 26.42 17 20 17c-6.42 0 -10.165 0.35 -12.197 0.652 -1.32 0.195 -2.255 1.207 -2.392 2.535C5.217 22.077 5 25.432 5 31c0 2.077 0.03 3.832 0.078 5.31Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M35 22h2.632c2.733 0 5.105 1.862 5.288 4.589a36.103 36.103 0 0 1 0 4.822C42.737 34.138 40.365 36 37.632 36H35"
      />
      <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M25 4v6M17 6v6" />
    </svg>
  );
}

/**
 * Official Streamline Plump Duo - Midnight Scholar Moon & Starry Constellation
 */
export function StreamlineMoonDuo({ className = 'w-5 h-5', size, ...props }: StreamlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillOpacity="0.25"
        d="M18.228 19.47c0 7.669 6.216 13.885 13.884 13.885 1.121 0 2.21 -0.133 3.254 -0.383 0.81 -0.195 1.595 0.54 1.271 1.31C33.987 40.578 27.76 45 20.5 45 10.835 45 3 37.165 3 27.5S10.835 10 20.5 10c0.571 0 0.849 0.68 0.506 1.138a13.823 13.823 0 0 0 -2.778 8.333Z"
      />
      <path
        fill="currentColor"
        fillOpacity="0.8"
        d="M38.324 27.404c-0.261 0.795 -1.386 0.795 -1.648 0l-1.615 -4.912a0.868 0.868 0 0 0 -0.553 -0.553l-4.912 -1.615c-0.795 -0.262 -0.795 -1.387 0 -1.648l4.912 -1.615a0.868 0.868 0 0 0 0.553 -0.553l1.615 -4.912c0.261 -0.795 1.386 -0.795 1.648 0l1.615 4.912a0.868 0.868 0 0 0 0.553 0.553l4.912 1.615c0.795 0.262 0.795 1.387 0 1.648l-4.912 1.615a0.868 0.868 0 0 0 -0.553 0.553l-1.615 4.912Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.228 19.47c0 7.669 6.217 13.885 13.885 13.885 1.12 0 2.21 -0.133 3.253 -0.383 0.811 -0.195 1.595 0.54 1.272 1.31C33.988 40.578 27.76 45 20.5 45 10.835 45 3 37.165 3 27.5S10.835 10 20.5 10c0.572 0 0.85 0.68 0.506 1.138a13.823 13.823 0 0 0 -2.778 8.333Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M38.324 27.404c-0.261 0.795 -1.386 0.795 -1.648 0l-1.615 -4.912a0.868 0.868 0 0 0 -0.553 -0.553l-4.912 -1.615c-0.795 -0.262 -0.795 -1.387 0 -1.648l4.912 -1.615a0.868 0.868 0 0 0 0.553 -0.553l1.615 -4.912c0.261 -0.795 1.386 -0.795 1.648 0l1.615 4.912a0.868 0.868 0 0 0 0.553 0.553l4.912 1.615c0.795 0.262 0.795 1.387 0 1.648l-4.912 1.615a0.868 0.868 0 0 0 -0.553 0.553l-1.615 4.912Z"
      />
      <path stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" d="M29 4v5M31.5 6.5h-5" />
    </svg>
  );
}

/**
 * Official Streamline Plump Duo - Tea Brewer Cozy Sprout & Herbal Leaf
 */
export function StreamlineLeafDuo({ className = 'w-5 h-5', size, ...props }: StreamlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillOpacity="0.25"
        d="M42.1159 3.88405S23.4569 -0.490561 12.7435 10.2228c-7.10016 7.1002 -7.69972 18.0123 -1.3391 24.3728 2.8914 2.8915 6.7234 4.3446 10.7104 4.4026C21.3828 37.1022 21 35.065 21 33c0 -1.8464 0.0984 -3.4907 0.2109 -4.7706 0.2734 -3.1088 2.3879 -6.2672 6.2393 -6.8119C29.1237 21.1808 31.5276 21 35 21c3.1573 0 5.4312 0.1494 7.0759 0.3545 2.0556 -8.8735 0.04 -17.47045 0.04 -17.47045Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.1908 35.3272c-0.2691 -0.2327 -0.5314 -0.4765 -0.7864 -0.7316 -6.36062 -6.3605 -5.76105 -17.2726 1.3391 -24.3728C23.4569 -0.490561 42.1159 3.88405 42.1159 3.88405S44.004 11.9372 42.2617 20.5"
      />
      <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M16.711 38c1.3706 0.5116 2.8139 0.8259 4.289 0.9452" />
      <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M37 9c-5 3.3333 -27 19.5 -27 36" />
      <path
        fill="currentColor"
        fillOpacity="0.8"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M25.1955 28.5798c0.1453 -1.6521 1.1727 -2.9695 2.8149 -3.2018C29.4481 25.1747 31.6563 25 35 25s5.5519 0.1747 6.9896 0.378c1.6422 0.2323 2.6696 1.5497 2.8149 3.2018C44.9089 29.7673 45 31.2925 45 33c0 4.5142 -2.3825 8.7382 -6.3963 10.8039C37.2629 44.494 35.9544 45 35 45c-0.9544 0 -2.2629 -0.506 -3.6037 -1.1961C27.3825 41.7382 25 37.5142 25 33c0 -1.7075 0.0911 -3.2327 0.1955 -4.4202Z"
      />
      <path stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M31 33.7333 34.7059 38 40 30" />
    </svg>
  );
}

/**
 * Official Streamline Core Duo - Heart / Favorite / Made With Care
 */
export function StreamlineHeart({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
          fill="currentColor"
          fillOpacity="0.25"
          d="M24.014 42.378 5.245 25.377c-10.201-10.201 4.794-29.786 18.769-13.941C37.989-4.41 52.916 15.244 42.783 25.377L24.014 42.378Z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.4"
          d="M24.014 42.378 5.245 25.377c-10.201-10.201 4.794-29.786 18.769-13.941 13.975-15.845 28.902 3.808 18.769 13.941L24.014 42.378Z"
        />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Duo - Bookmark
 */
export function StreamlineBookmark({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
          fill="currentColor"
          fillOpacity="0.25"
          d="M8.499 8.812c0.132-1.787 1.193-3.3 2.936-3.711C13.688 4.569 17.598 4 24 4s10.312 0.57 12.565 1.1c1.743 0.412 2.804 1.925 2.936 3.712 0.22 2.971 0.499 8.455 0.499 17.188 0 6.946-0.102 11.486-0.231 14.451-0.137 3.147-2.573 4.21-5.206 2.48l-7.271-4.77a6 6 0 0 0-6.584 0l-7.27 4.77c-2.634 1.73-5.07 0.667-5.207-2.48C8.101 37.486 8 32.946 8 26c0-8.733 0.278-14.217 0.499-17.188Z"
        />
        <path
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.499 8.812c0.132-1.787 1.193-3.3 2.936-3.711C13.688 4.569 17.598 4 24 4s10.312 0.57 12.565 1.1c1.743 0.412 2.804 1.925 2.936 3.712 0.22 2.971 0.499 8.455 0.499 17.188 0 6.946-0.102 11.486-0.231 14.451-0.137 3.147-2.573 4.21-5.206 2.48l-7.271-4.77a6 6 0 0 0-6.584 0l-7.27 4.77c-2.634 1.73-5.07 0.667-5.207-2.48C8.101 37.486 8 32.946 8 26c0-8.733 0.278-14.217 0.499-17.188Z"
        />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Phosphor Duotone - Headphones
 */
export function StreamlineHeadphones({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
        fill="currentColor"
        fillOpacity="0.3"
        d="M15 27v7.5c0 0.8-0.316 1.559-0.879 2.121C13.559 37.184 12.796 37.5 12 37.5H9c-0.796 0-1.559-0.316-2.121-0.879C6.316 36.059 6 35.296 6 34.5V24h6c0.796 0 1.559 0.316 2.121 0.879C14.684 25.441 15 26.204 15 27Zm21-3c-0.796 0-1.559 0.316-2.121 0.879-0.563 0.562-0.879 1.325-0.879 2.121v7.5c0 0.8 0.316 1.559 0.879 2.121 0.562 0.563 1.325 0.879 2.121 0.879h3c0.796 0 1.559-0.316 2.121-0.879 0.563-0.562 0.879-1.325 0.879-2.121V24h-6Z"
      />
      <path
        fill="currentColor"
        d="M37.854 10.249c-2.724-2.74-6.201-4.61-9.988-5.372-3.788-0.763-7.717-0.384-11.289 1.089-3.573 1.473-6.627 3.973-8.777 7.183C5.65 16.36 4.502 20.136 4.5 24v10.5c0 1.193 0.474 2.338 1.318 3.182C6.662 38.526 7.807 39 9 39h3c1.193 0 2.338-0.474 3.182-1.318C16.026 36.838 16.5 35.693 16.5 34.5v-7.5c0-1.193-0.474-2.338-1.318-3.182C14.338 22.974 13.193 22.5 12 22.5H7.568c0.374-4.1 2.267-7.912 5.307-10.687C15.916 9.038 19.883 7.5 24 7.5h0.126c4.099 0.017 8.044 1.565 11.062 4.34 3.017 2.775 4.89 6.576 5.25 10.66H36c-1.193 0-2.338 0.474-3.182 1.318C31.974 24.662 31.5 25.807 31.5 27v7.5c0 1.193 0.474 2.338 1.318 3.182C33.662 38.526 34.807 39 36 39h3c1.193 0 2.338-0.474 3.182-1.318C43.026 36.838 43.5 35.693 43.5 34.5V24c0.01-2.55-0.484-5.078-1.453-7.438-0.968-2.36-2.393-4.505-4.193-6.313ZM12 25.5c0.398 0 0.779 0.158 1.061 0.44.281.28.439.662.439 1.06v7.5c0 0.398-0.158 0.78-0.44 1.061C12.78 35.842 12.398 36 12 36H9c-0.398 0-0.78-0.158-1.061-0.439C7.658 35.28 7.5 34.898 7.5 34.5v-9H12Zm28.5 9c0 0.398-0.158 0.78-0.44 1.061S39.398 36 39 36h-3c-0.398 0-0.78-0.158-1.06-0.439S34.5 34.898 34.5 34.5V27c0-0.398 0.158-0.78 0.44-1.06S35.602 25.5 36 25.5h4.5v9Z"
      />
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Scissors (Hairstyle)
 */
export function StreamlineScissors({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
        <circle cx="12" cy="36" r="6" />
        <circle cx="36" cy="36" r="6" />
        <path d="M16.5 31.5 38 7" />
        <path d="M31.5 31.5 10 7" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Face Smile (Expression & Features)
 */
export function StreamlineFaceSmile({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
        <circle cx="24" cy="24" r="20" />
        <path d="M16 19h0.02" strokeWidth="4.5" />
        <path d="M32 19h0.02" strokeWidth="4.5" />
        <path d="M16 28c2 4 5.5 6.5 8 6.5s6-2.5 8-6.5" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Mustache (Facial Hair & Accents)
 */
export function StreamlineMustache({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
        d="M24 23c-4-6-10-8-15-5-5 3-5 10 0 12 6 2 11-3 15-7 4 4 9 9 15 7 5-2 5-9 0-12-5-3-11-1-15 5Z"
      />
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Sun (Mood Backdrop & Theme)
 */
export function StreamlineSun({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
        <circle cx="24" cy="24" r="10" />
        <path d="M24 4v5m0 30v5M4 24h5m30 0h5M9.86 9.86l3.53 3.53m21.22 21.22 3.53 3.53M9.86 38.14l3.53-3.53m21.22-21.22 3.53-3.53" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Male Symbol
 */
export function StreamlineMale({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
        <circle cx="19" cy="29" r="12" />
        <path d="m28 20 14-14m0 0h-10m10 0v10" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Female Symbol
 */
export function StreamlineFemale({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
        <circle cx="24" cy="18" r="12" />
        <path d="M24 30v14m-7-6h14" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Users (All / Diverse)
 */
export function StreamlineUsers({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
        <path d="M19 22a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm14-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
        <path d="M7 40c0-6.627 5.373-12 12-12s12 5.373 12 12M31 28.5c4.5 1 8 5 8 9.5" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Plump Line - Face Shape Silhouette Contour
 */
export function StreamlineFaceShape({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
        <path d="M10 16c0-6.627 6.268-12 14-12s14 5.373 14 12c0 8.5-5 18-14 24C15 34 10 24.5 10 16Z" />
        <path d="M18 20h0.02M30 20h0.02" strokeWidth="4.5" />
        <path d="M21 28c1 1.5 2 2 3 2s2-.5 3-2" />
      </g>
    </svg>
  );
}

/**
 * Official Streamline Phosphor Duotone - Star
 */
export function StreamlineStar({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
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
        fill="currentColor"
        fillOpacity="0.3"
        d="m42.949 20.398-9.131 7.875 2.79 11.773c0.074 0.303 0.056 0.62-0.05 0.913-0.107 0.293-0.298 0.547-0.55 0.731-0.25 0.184-0.55 0.29-0.861 0.303-0.312 0.013-0.62-0.066-0.886-0.227L24 35.454l-10.26 6.31c-0.266 0.161-0.574 0.24-0.885 0.227-0.312-0.014-0.612-0.119-0.863-0.303-0.251-0.184-0.442-0.438-0.549-0.731-0.106-0.293-0.124-0.61-0.05-0.913l2.79-11.773-9.131-7.875c-0.233-0.204-0.4-0.473-0.483-0.771-0.082-0.299-0.075-0.615 0.02-0.91 0.096-0.295 0.276-0.555 0.518-0.749 0.241-0.194 0.535-0.312 0.843-0.341l11.983-.975 4.616-11.175c0.118-0.288 0.319-0.535 0.577-0.709 0.259-0.173 0.563-0.266 0.875-0.266s0.615 0.093 0.874 0.266c0.258 0.174 0.459 0.421 0.577 0.709l4.616 11.175 11.983.975c0.309 0.029 0.603 0.147 0.845 0.341 0.242 0.194 0.422 0.455 0.518 0.75 0.095 0.295 0.102 0.611 0.02 0.91-0.083 0.299-0.251 0.568-0.485 0.772Z"
      />
      <path
        fill="currentColor"
        d="M44.846 18.236c-0.187-0.576-0.541-1.084-1.017-1.46-0.476-0.376-1.052-0.602-1.656-0.65l-11.063-.893-4.271-10.33c-0.231-0.562-0.624-1.044-1.13-1.383-0.505-0.339-1.1-0.52-1.708-0.52s-1.203 0.18-1.708 0.52c-0.506 0.339-0.899 0.82-1.13 1.383l-4.267 10.328-11.068.894c-0.606 0.051-1.182 0.28-1.658 0.658-0.476 0.377-0.83 0.887-1.018 1.464-0.187 0.578-0.2 1.198-0.037 1.784 0.164 0.585 0.496 1.108 0.956 1.505l8.437 7.281-2.57 10.886c-0.144 0.592-0.109 1.212 0.101 1.784 0.21 0.571 0.584 1.067 1.077 1.425 0.492 0.358 1.08 0.562 1.688 0.586 0.608 0.023 1.21-.135 1.728-0.454L24 37.217l9.474 5.828c0.519 0.315 1.119 0.47 1.726 0.444 0.606-0.025 1.191-0.229 1.682-0.586 0.49-0.358 0.864-0.852 1.074-1.421 0.21-0.57 0.247-1.188 0.107-1.779l-2.58-10.888 8.437-7.28c0.464-0.397 0.799-0.922 0.964-1.509 0.165-0.587 0.152-1.21-0.038-1.79ZM41.97 19.262l-9.131 7.875c-0.208 0.179-0.363 0.413-0.448 0.674-0.085 0.262-0.096 0.542-0.032 0.809l2.79 11.775a0.06 0.06 0 0 1-0.032 0.09c-0.034 0.026-0.043 0.02-0.071 0l-10.26-6.31c-0.236-0.145-0.508-0.222-0.786-0.222s-0.549 0.077-0.785 0.222l-10.26 6.313c-0.028 0.017-0.036 0.023-0.072 0a0.06 0.06 0 0 1-0.031-0.09l2.79-11.775c0.063-0.267 0.052-0.547-0.033-0.809s-0.239-0.494-0.447-0.674l-9.132-7.875c-0.022-0.019-0.043-0.036-0.024-0.094s0.034-0.05 0.062-0.054l11.985-.968c0.275-0.023 0.538-0.122 0.76-0.286 0.222-0.163 0.395-0.385 0.5-0.64l4.616-11.177c0.015-0.032 0.02-0.047 0.065-0.047s0.051 0.015 0.066 0.047l4.627 11.177c0.106 0.255 0.28 0.476 0.503 0.639 0.223 0.163 0.487 0.261 0.763 0.283l11.985 0.968c0.028 0 0.045 0 0.062 0.054 0.017 0.054 0 0.075-0.03 0.094Z"
      />
    </svg>
  );
}

/**
 * Official Streamline Line - Navigation Menu (Hamburger)
 */
export function StreamlineMenu({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

/**
 * Official Streamline Line - Security Lock
 */
export function StreamlineLock({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5a2.25 2.25 0 012.25 2.25v6a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18.75v-6a2.25 2.25 0 012.25-2.25z" />
    </svg>
  );
}

/**
 * Official Streamline Line - Sliders / Mixer Controls
 */
export function StreamlineSliders({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M6 3v5m0 4v9m12-18v9m0 4v5M12 3v2m0 4v13M3.5 8h5M15.5 16h5M9.5 5h5" />
    </svg>
  );
}

/**
 * Official Streamline Line - Magnifying Glass Search
 */
export function StreamlineSearch({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z" />
    </svg>
  );
}

/**
 * Official Streamline Line - Arrow Right
 */
export function StreamlineArrowRight({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-5.25-5.25M19.5 12l-5.25 5.25" />
    </svg>
  );
}

/**
 * Official Streamline Line - Arrow Left
 */
export function StreamlineArrowLeft({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l5.25-5.25M4.5 12l5.25 5.25" />
    </svg>
  );
}

/**
 * Official Streamline Line - Clock Time
 */
export function StreamlineClock({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
    </svg>
  );
}

/**
 * Official Streamline Line - Tag Category
 */
export function StreamlineTag({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l8.5 8.5a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182l-8.5-8.5A2.25 2.25 0 009.568 3zM6.75 6.75h.008v.008H6.75V6.75z" />
    </svg>
  );
}

/**
 * Official Streamline Line - Cloud Rain
 */
export function StreamlineCloudRain({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M4 14.899A7 7 0 1115.71 8h1.79a4.5 4.5 0 012.5 8.242M8 19v2m4-3v2m4-1v2" />
    </svg>
  );
}

/**
 * Official Streamline Line - Campfire Flame
 */
export function StreamlineFlame({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M12 2c1.5 3 4 5.5 4 8.5a4 4 0 01-8 0c0-1.5.5-2.5 1.5-3.5 0 3 2 4.5 2.5 4.5s1.5-.5 1.5-2c0-2-1.5-3.5-1-7.5zM12 22a8 8 0 01-8-8c0-4 3-7 4-8 .5 1.5 2 2.5 3 2.5s3-1 3.5-2.5c1 1.5 5.5 4.5 5.5 8a8 8 0 01-8 8z" />
    </svg>
  );
}

/**
 * Official Streamline Line - Wind Breeze
 */
export function StreamlineWind({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M4 8h12a3 3 0 10-3-3M2 12h16a3 3 0 11-3 3m-9 4h6a2 2 0 10-2-2" />
    </svg>
  );
}

/**
 * Official Streamline Line - Music Note
 */
export function StreamlineMusic({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12 0a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

/**
 * Official Streamline Line - Pause
 */
export function StreamlinePause({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" d="M10 4.5H7.5a1 1 0 00-1 1v13a1 1 0 001 1H10a1 1 0 001-1v-13a1 1 0 00-1-1zm6.5 0H14a1 1 0 00-1 1v13a1 1 0 001 1h2.5a1 1 0 001-1v-13a1 1 0 00-1-1z" />
    </svg>
  );
}

/**
 * Official Streamline Line - Play
 */
export function StreamlinePlay({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.75l14 7.25-14 7.25V4.75z" />
    </svg>
  );
}

/**
 * Official Streamline Line - Volume Speaker
 */
export function StreamlineVolume({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zm4.5 3.5a5 5 0 010 7M19 5.5a9 9 0 010 13" />
    </svg>
  );
}

/**
 * Official Streamline Line - Volume Mute
 */
export function StreamlineVolumeMute({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zm12 4l-6 6m0-6l6 6" />
    </svg>
  );
}

/**
 * Official Streamline Line - Copy Document
 */
export function StreamlineCopy({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M8 7v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-8a2 2 0 00-2 2zm-4 4V5a2 2 0 012-2h10" />
    </svg>
  );
}

/**
 * Official Streamline Line - Check Circle
 */
export function StreamlineCheckCircle({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 12.5l2 2 4.5-4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

/**
 * Official Streamline Line - Loader Spinner
 */
export function StreamlineLoader({ className = 'w-4 h-4 animate-spin', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M7.757 16.243l-2.121 2.121m12.728 0l-2.121-2.121M7.757 7.757L5.636 5.636" />
    </svg>
  );
}

/**
 * Official Streamline Line - Book Open Story
 */
export function StreamlineBookOpen({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

export function StreamlineChevronDown({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export function StreamlineChevronUp({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  );
}

export function StreamlineChevronLeft({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
}

export function StreamlineChevronRight({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

export function StreamlineArrowDown({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l5.25-5.25M12 19.5l-5.25-5.25" />
    </svg>
  );
}

export function StreamlineArrowUp({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-5.25 5.25M12 4.5l5.25 5.25" />
    </svg>
  );
}

export function StreamlinePlus({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

export function StreamlineTrash({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

export function StreamlineEdit({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
  );
}

export function StreamlineSave({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8" />
    </svg>
  );
}

export function StreamlineUpload({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  );
}

export function StreamlineDownload({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

export function StreamlineExternalLink({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5L21 3m0 0h-5.25M21 3v5.25M10.5 4.5H5.25A2.25 2.25 0 003 6.75v12A2.25 2.25 0 005.25 21h12a2.25 2.25 0 002.25-2.25v-5.25" />
    </svg>
  );
}

export function StreamlineShare({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
  );
}

export function StreamlineRotateCcw({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M2.5 2v6h6M2.66 15.57a10 10 0 10.57-8.38L2.5 8" />
    </svg>
  );
}

export function StreamlineRotateCw({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38L21.5 8" />
    </svg>
  );
}

export function StreamlineRefresh({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

export function StreamlineSkipBack({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M19 20L9 12l10-8v16zM5 19V5" />
    </svg>
  );
}

export function StreamlineSkipForward({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M5 4l10 8-10 8V4zM19 5v14" />
    </svg>
  );
}

export function StreamlineBookmarkCheck({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4zm4-11l2 2 4-4" />
    </svg>
  );
}

export function StreamlineBookMarked({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5zm6-17.5v8l3-2 3 2V2" />
    </svg>
  );
}

export function StreamlineLibrary({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M4 19.5v-15A2.5 2.5 0 016.5 2H19a1 1 0 011 1v18a1 1 0 01-1 1H6.5a2.5 2.5 0 01-2.5-2.5zm4-11.5h8m-8 4h6m-6 4h8M4 6v13.5a2.5 2.5 0 002.5 2.5H20" />
    </svg>
  );
}

export function StreamlineFileText({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

export function StreamlineImage({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

export function StreamlineEye({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StreamlineEyeOff({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}

export function StreamlineShoppingBag({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

export function StreamlineShieldCheck({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

export function StreamlineDollarSign({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  );
}

export function StreamlineSparkles({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

export function StreamlineCloud({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  );
}

export function StreamlineWifiOff({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M1 1l22 22m-5.28-17.72a15.938 15.938 0 00-10.72 0M5 12.55a10.94 10.94 0 015.17-2.39m4.83.39a10.95 10.95 0 013 2M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
    </svg>
  );
}

export function StreamlineAlertCircle({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
    </svg>
  );
}

export function StreamlineAlertTriangle({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h.01" />
    </svg>
  );
}

export function StreamlineHelpCircle({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m0 3.5v.5" />
    </svg>
  );
}

export function StreamlineMail({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export function StreamlineLink({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71m-1.75 6.82a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function StreamlineList({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

export function StreamlineColumns({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
    </svg>
  );
}

export function StreamlineSquare({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StreamlineType({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M4 7V4h16v3M9 20h6M12 4v16" />
    </svg>
  );
}

export function StreamlineZoomIn({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
    </svg>
  );
}

export function StreamlineZoomOut({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M8 11h6" />
    </svg>
  );
}

export function StreamlineMaximize({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

export function StreamlineMinimize({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M4 14h6v6m10-10h-6V4m0 6l7-7M3 21l7-7" />
    </svg>
  );
}

export function StreamlineZap({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export function StreamlineWand({ className = 'w-4 h-4', size, ...props }: StreamlineIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size} className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15 4V2m0 16v-2M8 9h2m10 0h-2m-2.172-4.828l1.414-1.414M4.758 15.242l1.414-1.414M2 22l10-10m7.172 1.172l1.414 1.414M16.242 4.758l1.414-1.414" />
    </svg>
  );
}

// Seamless drop-in compatibility aliases replacing generic Lucide icons with authentic Streamline icons
export {
  StreamlineChevronDown as ChevronDown,
  StreamlineChevronUp as ChevronUp,
  StreamlineChevronLeft as ChevronLeft,
  StreamlineChevronRight as ChevronRight,
  StreamlineArrowDown as ArrowDown,
  StreamlineArrowUp as ArrowUp,
  StreamlineArrowLeft as ArrowLeft,
  StreamlineArrowRight as ArrowRight,
  StreamlinePlus as Plus,
  StreamlineTrash as Trash2,
  StreamlineEdit as Edit2,
  StreamlineSave as Save,
  StreamlineUpload as Upload,
  StreamlineDownload as Download,
  StreamlineExternalLink as ExternalLink,
  StreamlineShare as Share2,
  StreamlineRotateCcw as RotateCcw,
  StreamlineRotateCw as RotateCw,
  StreamlineRefresh as RefreshCw,
  StreamlineSkipBack as SkipBack,
  StreamlineSkipForward as SkipForward,
  StreamlineBookmarkCheck as BookmarkCheck,
  StreamlineBookMarked as BookMarked,
  StreamlineLibrary as Library,
  StreamlineFileText as FileText,
  StreamlineImage as Image,
  StreamlineEye as Eye,
  StreamlineEyeOff as EyeOff,
  StreamlineShoppingBag as ShoppingBag,
  StreamlineShieldCheck as ShieldCheck,
  StreamlineDollarSign as DollarSign,
  StreamlineSparkles as Sparkles,
  StreamlineCloud as Cloud,
  StreamlineWifiOff as WifiOff,
  StreamlineAlertCircle as AlertCircle,
  StreamlineAlertTriangle as AlertTriangle,
  StreamlineHelpCircle as HelpCircle,
  StreamlineMail as Mail,
  StreamlineLink as Link,
  StreamlineList as List,
  StreamlineColumns as Columns,
  StreamlineSquare as Square,
  StreamlineType as Type,
  StreamlineZoomIn as ZoomIn,
  StreamlineZoomOut as ZoomOut,
  StreamlineMaximize as Maximize2,
  StreamlineMinimize as Minimize2,
  StreamlineZap as Zap,
  StreamlineWand as Wand2,
  StreamlineCheck as Check,
  StreamlineCheckCircle as CheckCircle,
  StreamlineCheckCircle as CheckCircle2,
  StreamlineClose as X,
  StreamlineSearch as Search,
  StreamlineSliders as Sliders,
  StreamlineSliders as SlidersHorizontal,
  StreamlineClock as Clock,
  StreamlineTag as Tag,
  StreamlineCloudRain as CloudRain,
  StreamlineFlame as Flame,
  StreamlineWind as Wind,
  StreamlineMusic as Music,
  StreamlinePause as Pause,
  StreamlinePlay as Play,
  StreamlineVolume as Volume2,
  StreamlineVolumeMute as VolumeX,
  StreamlineCopy as Copy,
  StreamlineLoader as Loader2,
  StreamlineBookOpen as BookOpen,
  StreamlineBook as Book,
  StreamlineBookmark as Bookmark,
  StreamlineCoffee as Coffee,
  StreamlineMoon as Moon,
  StreamlineSun as Sun,
  StreamlineHeart as Heart,
  StreamlineHeadphones as Headphones,
  StreamlineUser as User,
  StreamlineUsers as Users,
  StreamlineCompass as Compass,
  StreamlineCalendar as Calendar,
  StreamlineStar as Star,
  StreamlineLock as Lock,
  StreamlineMenu as Menu,
};




