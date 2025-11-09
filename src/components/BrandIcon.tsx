'use client'

import { useEffect, useState } from 'react'

interface BrandIconProps {
  iconType: 'youtube' | 'website' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok' | 'github' | 'custom'
  customIcon?: string
  color?: string
  size?: number
  className?: string
}

export function BrandIcon({ iconType, customIcon, color = 'currentColor', size = 24, className = '' }: BrandIconProps) {
  const [svgContent, setSvgContent] = useState<string>('')

  useEffect(() => {
    const loadIcon = async () => {
      if (iconType === 'custom' && customIcon) {
        setSvgContent(customIcon)
        return
      }

      try {
        const response = await fetch(`/icons/${iconType}.svg`)
        if (response.ok) {
          const svg = await response.text()
          setSvgContent(svg)
        }
      } catch (error) {
        console.error(`Failed to load icon: ${iconType}`, error)
      }
    }

    loadIcon()
  }, [iconType, customIcon])

  if (!svgContent) return null

  return (
    <div
      className={className}
      style={{ width: size, height: size, color }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
}

