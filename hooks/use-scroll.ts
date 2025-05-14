"use client"

import { useEffect, useState } from "react"

/**
 * Hook para detectar o scroll da página e executar ações
 * @returns Objeto com propriedades do scroll
 */
export function useScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Função para atualizar o estado do scroll
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolled(window.scrollY > 50)
    }

    // Adiciona o evento de scroll
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Remove o evento ao desmontar o componente
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return {
    scrollY,
    isScrolled
  }
}