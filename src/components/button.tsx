import { css, cx } from "../../styled-system/css";

export default function Button({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...rest}
      className={cx(
        css({
          cursor: "pointer",
          rounded: "md",
          pl: "4",
          pr: "4",
          pt: "2",
          pb: "2",
        }),
        className
      )}
      type="button"
    >
      {children}
    </button>
  );
}
