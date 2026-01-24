'use client'

import { useEffect, useState, useCallback } from 'react'

interface UseCreditsReturn {
  credits: number
  hasCredits: boolean
  loading: boolean
  refresh: () => Promise<void>
}

export function useCredits(): UseCreditsReturn {
  const [credits, setCredits] = useState(0)
  const [hasCredits, setHasCredits] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchCredits = useCallback(async () => {
    try {
      const response = await fetch('/api/credits')
      const data = await response.json()
      setCredits(data.credits || 0)
      setHasCredits(data.hasCredits || false)
    } catch (error) {
      console.error('Error fetching credits:', error)
      setCredits(0)
      setHasCredits(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    fetch('/api/credits', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setCredits(data.credits || 0)
        setHasCredits(data.hasCredits || false)
        setLoading(false)
        clearTimeout(timeoutId)
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return
        }
        console.error('Error fetching credits:', error)
        setCredits(0)
        setHasCredits(false)
        setLoading(false)
        clearTimeout(timeoutId)
      })

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [])

  return { credits, hasCredits, loading, refresh: fetchCredits }
}
