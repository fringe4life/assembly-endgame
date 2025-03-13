



export default function NewGame({children, ...rest}: React.ComponentPropsWithRef<"button">){
    return <button  type="reset" className="focus:outline-4 focus:outline-green-600 focus:bg-sky-300 bg-sky-400 w-57 text-neutral-900 h-10 rounded-sm capitalize cursor-pointer" {...rest}>{children}</button>
}