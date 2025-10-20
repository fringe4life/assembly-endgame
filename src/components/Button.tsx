export default function Button({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...rest}
      type="button"
      className={`cursor-pointer rounded-md px-4 py-2 ${className}`}
    >
      {children}
    </button>
  );
}
