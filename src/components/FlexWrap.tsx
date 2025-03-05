

import { twMerge } from "tailwind-merge"
export default function FlexWrap({className, children}: React.ComponentPropsWithoutRef<"section">){
    return (
        <section 
        className={twMerge("mx-auto justify-center max-w-80 flex flex-wrap gap-[2px] mt-9", className)}>
            {children}
        </section>
    )
}