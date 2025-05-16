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
  loading = "lazy",
  quality = 75,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        className={cn(
          "transition-all duration-300 ease-in-out",
          isLoading 
            ? "scale-110 blur-sm" 
            : "scale-100 blur-0"
        )}
        onLoadingComplete={() => setIsLoading(false)}
        priority={priority}
        loading={loading}
        quality={quality}
        {...props}
      />
      {isLoading && (
        <div 
          className="absolute inset-0 bg-muted/50 animate-pulse" 
          aria-hidden="true"
        />
      )}
    </div>
  )
} 