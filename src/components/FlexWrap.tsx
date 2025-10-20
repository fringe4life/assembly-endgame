import { twMerge } from "tailwind-merge";
export default function FlexWrap({
  className,
  children,
}: React.ComponentPropsWithoutRef<"section">) {
  return (
    <section
      className={twMerge(
        "mx-auto mt-9 flex max-w-80 flex-wrap justify-center gap-[2px]",
        className
      )}
    >
      {children}
    </section>
  );
}
