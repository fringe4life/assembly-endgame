import { css, cx } from "../../styled-system/css";

export default function Badge({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cx(
        css({ rounded: "sm", p: "1", fontWeight: "bold" }),
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
