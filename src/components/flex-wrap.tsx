import { css, cx } from "../../styled-system/css";

interface FlexWrapProps extends React.ComponentPropsWithoutRef<"section"> {}

export default function FlexWrap({
  children,
  className: classNameProp,
  ...props
}: FlexWrapProps) {
  return (
    <section
      {...props}
      className={cx(
        css({
          mx: "auto",
          mt: "9",
          maxW: "80",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.5",
          display: "flex",
        }),
        classNameProp
      )}
    >
      {children}
    </section>
  );
}
