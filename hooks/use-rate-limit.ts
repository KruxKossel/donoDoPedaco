"use client"

import { useState, useEffect } from "react"

interface RateLimitConfig {
  maxAttempts: number    // Número máximo de tentativas
  timeWindow: number     // Janela de tempo em minutos
  storageKey: string     // Chave para armazenamento local
}

interface RateLimitState {
  attempts: number
  lastAttempt: number
}

export function useRateLimit({ maxAttempts, timeWindow, storageKey }: RateLimitConfig) {
  const [isBlocked, setIsBlocked] = useState(false)
  const [remainingAttempts, setRemainingAttempts] = useState(maxAttempts)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)

  useEffect(() => {
    // Carrega o estado do rate limit do localStorage
    const loadRateLimit = () => {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const state: RateLimitState = JSON.parse(stored)
        const now = Date.now()
        const timePassed = (now - state.lastAttempt) / 1000 / 60 // em minutos

        if (timePassed < timeWindow) {
          setIsBlocked(state.attempts >= maxAttempts)
          setRemainingAttempts(Math.max(0, maxAttempts - state.attempts))
          if (state.attempts >= maxAttempts) {
            setTimeRemaining(Math.ceil(timeWindow - timePassed))
          }
        } else {
          // Reset se passou o tempo da janela
          localStorage.removeItem(storageKey)
          setIsBlocked(false)
          setRemainingAttempts(maxAttempts)
          setTimeRemaining(null)
        }
      }
    }

    loadRateLimit()
    // Atualiza o tempo restante a cada minuto
    const interval = setInterval(loadRateLimit, 60000)
    return () => clearInterval(interval)
  }, [maxAttempts, timeWindow, storageKey])

  const registerAttempt = () => {
    const stored = localStorage.getItem(storageKey)
    const now = Date.now()
    let state: RateLimitState

    if (stored) {
      state = JSON.parse(stored)
      const timePassed = (now - state.lastAttempt) / 1000 / 60

      if (timePassed >= timeWindow) {
        // Reset se passou o tempo da janela
        state = { attempts: 1, lastAttempt: now }
      } else {
        state.attempts += 1
        state.lastAttempt = now
      }
    } else {
      state = { attempts: 1, lastAttempt: now }
    }

    localStorage.setItem(storageKey, JSON.stringify(state))
    
    const newRemainingAttempts = Math.max(0, maxAttempts - state.attempts)
    setRemainingAttempts(newRemainingAttempts)
    
    if (state.attempts >= maxAttempts) {
      setIsBlocked(true)
      setTimeRemaining(timeWindow)
    }

    return !isBlocked
  }

  return {
    isBlocked,
    remainingAttempts,
    timeRemaining,
    registerAttempt
  }
} 