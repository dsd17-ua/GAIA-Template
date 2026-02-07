import * as React from "react"
import { cn } from "@/lib/utils"

// Removed Radix UI primitives dependency for simplicity since I missed installing it.
// Using standard label with styling.

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => (
        <label
            ref={ref}
            className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                className
            )}
            {...props}
        />
    )
)
Label.displayName = "Label"

export { Label }
