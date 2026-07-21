import { forwardRef } from "react"

const Card = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-card border border-border bg-surface shadow-card ${className || ""}`}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-container-md pb-0 ${className || ""}`} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={`text-lg font-semibold leading-none tracking-tight text-text ${className || ""}`} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={`text-sm text-text-secondary ${className || ""}`} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-container-md pt-4 ${className || ""}`} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex items-center p-container-md pt-0 ${className || ""}`} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
