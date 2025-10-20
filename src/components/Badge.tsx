export default function Badge({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={`text-md rounded-sm p-1 font-bold drop-shadow-md ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
