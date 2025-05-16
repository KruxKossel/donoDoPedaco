"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string
}

export function OptimizedImage({
  alt,
  src,
  className,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("relative", className)}>
      <Image
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoadingComplete={() => setIsLoading(false)}
        priority={priority}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </div>
  )
} 