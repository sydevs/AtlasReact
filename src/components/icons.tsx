import * as React from "react";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 48 48"
    width={size || height}
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m41.968 28.944v-.006a17.956 17.956 0 0 0 -3.422-9.531c-.267-.362-.545-.723-.832-1.053l-.006-.007a17.927 17.927 0 0 0 -3.641-3.254 12.629 12.629 0 0 0 .933-4.093 11 11 0 0 0 -22 0c0 5.768 9.762 19.967 10.177 20.568a1 1 0 0 0 1.646 0c.218-.316 3.015-4.384 5.621-9.011a2.822 2.822 0 0 0 .43.55 2.935 2.935 0 0 0 2.126.893h5.814a15.729 15.729 0 0 1 1.049 4h-9.863a1 1 0 0 0 0 2h10a15.463 15.463 0 0 1 -.114 1.888c-.043.382-.1.762-.174 1.139-.023.121-.054.24-.079.361-.055.255-.112.509-.18.761-.038.141-.081.279-.123.419q-.1.345-.22.686-.077.216-.159.429c-.041.107-.087.211-.13.317h-3.821a1 1 0 0 1 0-2 1 1 0 0 0 0-2h-6a.976.976 0 0 1 -.5-.135 1 1 0 0 0 -1 1.731 3.007 3.007 0 0 0 1.5.404h3.171a3 3 0 0 0 2.829 4h2.843a16.159 16.159 0 0 1 -3.538 4.236 15.955 15.955 0 0 1 -18.027 1.764h6.722a3.013 3.013 0 0 0 3-3 3 3 0 0 0 -3-3h-12.847a15.934 15.934 0 0 1 -2.125-7.062c-.019-.31-.028-.628-.028-.938a15.927 15.927 0 0 1 .516-4h6.484a1 1 0 0 0 0-2h-5.823c.08-.194.153-.384.244-.589a15.889 15.889 0 0 1 3.251-4.705 1 1 0 0 0 -1.416-1.412 18.1 18.1 0 0 0 -4.456 7.406 17.853 17.853 0 0 0 -.8 5.3c0 .351.01.712.032 1.058a18 18 0 0 0 29.568 12.706 18.111 18.111 0 0 0 4.8-6.348 17.378 17.378 0 0 0 1.474-5.294 17.554 17.554 0 0 0 .126-2.122c0-.361-.01-.712-.032-1.056zm-17.968 12.056a.976.976 0 0 1 -.306.713.965.965 0 0 1 -.694.287h-9.564c-.1-.083-.186-.169-.279-.254-.2-.181-.389-.364-.575-.554-.131-.133-.257-.269-.382-.406-.172-.189-.341-.38-.5-.576-.057-.069-.112-.14-.168-.21h11.468a1 1 0 0 1 1 1zm0-11.783c-3.113-4.676-9-14.323-9-18.217a9 9 0 0 1 18 0c0 3.894-5.887 13.541-9 18.217zm9.285-12.239a15.993 15.993 0 0 1 1.285 1.022h-1.57c-.065 0-.126.015-.19.019q.248-.525.475-1.041zm-1 4.715a.952.952 0 0 1 -.285-.693 1 1 0 0 1 1-1h3.467c.158.2.319.391.466.59a16.127 16.127 0 0 1 .91 1.392l.009.018h-4.852a.975.975 0 0 1 -.712-.307z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m15 30h4a1 1 0 0 0 0-2h-4a3 3 0 0 0 0 6h6a1 1 0 0 0 0-2h-6a1 1 0 0 1 0-2z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m24 4a7 7 0 1 0 7 7 7.008 7.008 0 0 0 -7-7zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1 -5 5z"
      clipRule="evenodd"
    />
  </svg>
);

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const RightArrowIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.512 4.43a.75.75 0 0 1 1.057.082l6 7a.75.75 0 0 1 0 .976l-6 7a.75.75 0 0 1-1.138-.976L14.012 12L8.431 5.488a.75.75 0 0 1 .08-1.057"
      clipRule="evenodd"
    />
  </svg>
);

export const LeftArrowIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M15.488 4.43a.75.75 0 0 1 .081 1.058L9.988 12l5.581 6.512a.75.75 0 1 1-1.138.976l-6-7a.75.75 0 0 1 0-.976l6-7a.75.75 0 0 1 1.057-.081"
      clipRule="evenodd"
    />
  </svg>
);

export const OnlineCallIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      fill="currentColor"
      d="M21.995 6.25A2.25 2.25 0 0 0 19.745 4H4.25A2.25 2.25 0 0 0 2 6.25v11.505a2.25 2.25 0 0 0 2.25 2.25h9.758c.036-.427.194-.847.478-1.206l.8-1.01a2.2 2.2 0 0 1 1.708-.832V15.75l-.005-.143A1.75 1.75 0 0 0 15.245 14H8.75l-.144.006A1.75 1.75 0 0 0 7 15.75l-.001 2.754H4.25a.75.75 0 0 1-.75-.75V6.25a.75.75 0 0 1 .75-.75h15.495a.75.75 0 0 1 .75.75v3.773c.335-.05.687-.025 1.03.088l.43.14l.04.014zM15 10a3 3 0 1 0-6 0a3 3 0 0 0 6 0m4.192 2.995l.476-1.205c.242-.614.92-.933 1.548-.728l.431.141c.724.237 1.326.806 1.35 1.569c.1 3.11-2.476 7.583-5.213 9.055c-.673.362-1.468.123-2.035-.391l-.337-.305a1.253 1.253 0 0 1-.142-1.706l.8-1.01c.29-.367.767-.53 1.22-.42l1.292.313q1.654-1.095 1.774-3.079l-.917-.964a1.2 1.2 0 0 1-.247-1.27"
    />
  </svg>
);

export const CancelIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m5 19l7-7m0 0l7-7m-7 7L5 5m7 7l7 7"
    />
  </svg>
);


export const HelpIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825M12 22q-2.075 0-3.9-.787t-3.175-2.138T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
      />
    </svg>
  );
};
