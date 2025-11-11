'use client'

import { useEffect, useState } from 'react'

export function useSubscription() {
  const [isActive, setIsActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    fetch('/api/subscription-status', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setIsActive(data.isActive)
        setStatus(data.status)
        setLoading(false)
        clearTimeout(timeoutId)
      })
      .catch((error) => {
        // Ignore abort errors (happens when component unmounts)
        if (error.name === 'AbortError') {
          return
        }
        console.error('Error fetching subscription status:', error)
        setIsActive(false)
        setLoading(false)
        clearTimeout(timeoutId)
      })

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [])

  return { isActive, loading, status }
}

