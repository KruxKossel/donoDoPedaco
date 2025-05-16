"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useScroll } from "@/hooks/use-scroll"
import { cn } from "@/lib/utils"
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

/**
 * Componente Header - Cabeçalho principal do site
 * 
 * Características:
 * - Responsivo (mobile e desktop)
 * - Menu de navegação com links para todas as seções
 * - Suporte a scroll suave para links internos
 * - Toggle de tema claro/escuro
 * - Logo e nome da padaria
 * - Menu mobile para telas pequenas
 * 
 * @component
 */

// Interface para os links de navegação
interface NavLink {
  href: string
  label: string
  exactPath?: string
}

export function Header() {
  const pathname = usePathname()
  const { isScrolled } = useScroll()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Links de navegação do site
  const navLinks: NavLink[] = [
    { href: pathname === "/" ? "/" : "/", label: "Home", exactPath: "/" },
    { href: pathname === "/" ? "#cardapio" : "/cardapio", label: "Cardápio" },
    { href: pathname === "/" ? "#encomendas" : "/#encomendas", label: "Encomendas" },
    { href: pathname === "/" ? "#contato" : "/#contato", label: "Endereço" }
  ]

  // Implementação do scroll suave
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const href = target.getAttribute("href")
      
      // Verifica se é um link interno com âncora (#)
      if (href && href.startsWith("#")) {
        e.preventDefault()
        const targetId = href.substring(1)
        const element = document.getElementById(targetId)
        
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start"
          })
          setMobileMenuOpen(false)
        }
      }
    }

    // Adiciona o evento de clique a todos os links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", handleLinkClick as any)
    })

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener("click", handleLinkClick as any)
      })
    }
  }, [])

  // Previne scroll quando menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  return (
    <header 
      className={cn(
        "sticky top-0 w-full transition-all duration-300 z-40",
        isScrolled || mobileMenuOpen 
          ? "bg-background border-b shadow-sm" 
          : "bg-background/95 backdrop-blur-sm border-b"
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-16 sm:h-20">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.PNG"
              alt="Logo Dono do Pedaço"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-lg sm:text-xl font-bold">
              Dono do Pedaço
            </span>
          </Link>
          <nav className="hidden md:flex">
            <ul className="flex gap-4 sm:gap-6">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className={cn(
                      "transition-colors duration-200 hover:text-primary text-sm sm:text-base py-2",
                      (pathname === link.exactPath || 
                       (pathname === "/cardapio" && link.href.includes("cardapio")))
                        ? "text-primary font-medium border-b-2 border-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <ModeToggle />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "md:hidden relative z-50",
              mobileMenuOpen && "bg-background hover:bg-background"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Menu mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-md transition-all duration-300",
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
        role="dialog"
        aria-modal={mobileMenuOpen}
        aria-label="Menu de navegação"
      >
        <nav className="fixed inset-y-0 right-0 w-full max-w-xs h-full bg-background shadow-xl border-l">
          <div className="h-16 sm:h-20" aria-hidden="true" /> {/* Espaçador para o header */}
          <div className="px-4 py-6">
            <ul className="space-y-4">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block py-2 text-lg transition-colors duration-200",
                      (pathname === link.exactPath || 
                       (pathname === "/cardapio" && link.href.includes("cardapio")))
                        ? "text-primary font-medium"
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}