export default function NewGame({
  children,
  ...rest
}: React.ComponentPropsWithRef<"button">) {
  return (
    <button
      type="reset"
      className="h-10 w-57 cursor-pointer rounded-sm bg-sky-400 text-neutral-900 capitalize focus:bg-sky-300 focus:outline-4 focus:outline-green-600"
      {...rest}
    >
      {children}
    </button>
  );
}
