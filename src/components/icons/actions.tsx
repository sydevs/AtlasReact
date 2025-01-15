import BaseIcon from "./base";
import { IconSvgProps } from "@/types";

export const UpArrowIcon: React.FC<IconSvgProps> = ({
  ...props
}) => (
  <BaseIcon
    view="0 0 24 24"
    paths={["m10 4l.707-.707L10 2.586l-.707.707zm8 17a1 1 0 1 0 0-2zM15.707 8.293l-5-5l-1.414 1.414l5 5zm-6.414-5l-5 5l1.414 1.414l5-5zM9 4v10h2V4zm7 17h2v-2h-2zm-7-7a7 7 0 0 0 7 7v-2a5 5 0 0 1-5-5z"]}
    pathProps={{ fill: "currentColor" }}
    {...props}
  />
);

export const RightArrowIcon: React.FC<IconSvgProps> = ({
  ...props
}) => (
  <BaseIcon
    view="0 0 20 20"
    paths={["M11 10l-3.141-3.42c-0.268-0.27-0.268-0.707 0-0.978 0.268-0.27 0.701-0.27 0.969 0l3.83 3.908c0.268 0.271 0.268 0.709 0 0.979l-3.83 3.908c-0.267 0.272-0.701 0.27-0.969 0s-0.268-0.707 0-0.978l3.141-3.419z"]}
    {...props}
  />
);

export const DownArrowIcon: React.FC<IconSvgProps> = ({
  ...props
}) => (
  <BaseIcon
    view="0 0 24 24"
    paths={["m5 10l7 7l7-7"]}
    {...props}
  />
);

export const CloseIcon: React.FC<IconSvgProps> = ({
  ...props
}) => (
  <BaseIcon
    view="0 0 20 20"
    paths={["M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z"]}
    {...props}
  />
);

export const SearchIcon: React.FC<IconSvgProps> = ({
  ...props
}) => (
  <BaseIcon
    view="0 0 20 20"
    paths={["M12.9 14.32c-1.34 1.049-3.050 1.682-4.908 1.682-4.418 0-8-3.582-8-8s3.582-8 8-8c4.418 0 8 3.582 8 8 0 1.858-0.633 3.567-1.695 4.925l0.013-0.018 5.35 5.33-1.42 1.42-5.33-5.34zM8 14c3.314 0 6-2.686 6-6s-2.686-6-6-6v0c-3.314 0-6 2.686-6 6s2.686 6 6 6v0z"]}
    {...props}
  />
);

export const ShareIcon: React.FC<IconSvgProps> = ({
  ...props
}) => (
  <BaseIcon
    view="0 0 26 32"
    paths={[
      "M5.881 14.789c-3.23 0-5.881 2.654-5.881 5.884v4.964c0 3.231 2.651 5.884 5.881 5.884h13.679c3.23 0 5.878-2.653 5.878-5.884v-4.964c0-3.23-2.648-5.884-5.878-5.884h-1.339v3.048h1.339c1.582 0 2.83 1.254 2.83 2.836v4.964c0 1.585-1.248 2.836-2.83 2.836h-13.679c-1.583 0-2.833-1.252-2.833-2.836v-4.964c0-1.583 1.251-2.836 2.833-2.836h1.336v-3.048h-1.336z",
      "M12.717 0l-8.229 8.229 2.158 2.155 6.071-6.074 6.077 6.074 2.155-2.155-8.232-8.229z",
      "M11.196 3.036v18.378h3.048v-18.378h-3.048z",
    ]}
    {...props}
  />
);

export const PlusSquareIcon: React.FC<IconSvgProps> = ({
  ...props
}) => (
  <BaseIcon
    view="0 0 24 24"
    paths={["M5 2c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v14c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h14c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-14c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879zM5 4h14c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v14c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-14c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-14c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293zM8 13h3v3c0 0.552 0.448 1 1 1s1-0.448 1-1v-3h3c0.552 0 1-0.448 1-1s-0.448-1-1-1h-3v-3c0-0.552-0.448-1-1-1s-1 0.448-1 1v3h-3c-0.552 0-1 0.448-1 1s0.448 1 1 1z"]}
    {...props}
  />
);

export const ExternalIcon: React.FC<IconSvgProps> = ({
  ...props
}) => (
  <BaseIcon
    paths={["M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H5v12h12v-6zM13 3v2h4.586l-7.793 7.793l1.414 1.414L19 6.414V11h2V3z"]}
    {...props}
  />
);
