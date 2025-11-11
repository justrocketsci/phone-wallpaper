'use client'

import { useEffect, useState } from 'react'

export function useSubscription() {
  const [isActive, setIsActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/subscription-status')
      .then(res => res.json())
      .then(data => {
        setIsActive(data.isActive)
        setStatus(data.status)
        setLoading(false)
      })
      .catch(() => {
        setIsActive(false)
        setLoading(false)
      })
  }, [])

  return { isActive, loading, status }
}

