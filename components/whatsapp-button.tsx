"use client"

import { PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
  className?: string
}

/**
 * Botão flutuante do WhatsApp que redireciona para o chat com a padaria
 * @param phoneNumber - Número de telefone no formato internacional (ex: 5516997783037)
 * @param message - Mensagem pré-definida opcional
 * @param className - Classes CSS adicionais
 */
export function WhatsAppButton({
  phoneNumber = "5516997783037",
  message = "Olá! Gostaria de fazer um pedido na Panificadora Dono do Pedaço.",
  className
}: WhatsAppButtonProps) {
  // Função para abrir o chat do WhatsApp
  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message)
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(url, "_blank")
  }

  return (
    <Button
      onClick={openWhatsApp}
      className={cn(
        "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#1da851] shadow-lg p-0 flex items-center justify-center transition-transform hover:scale-110 active:scale-95",
        "after:content-[''] after:absolute after:inset-0 after:bg-white/20 after:rounded-full after:scale-0 after:opacity-0 hover:after:scale-150 hover:after:opacity-100 after:transition-all after:duration-500",
        className
      )}
      aria-label="Contato via WhatsApp"
    >
      <PhoneCall className="h-5 w-5 sm:h-6 sm:w-6 text-white relative z-10" />
      <span className="sr-only">Contato via WhatsApp</span>
    </Button>
  )
}