"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Facebook, Instagram } from "lucide-react"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { OrderForm } from "@/components/order-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/**
 * Página inicial da Padaria Dono do Pedaço
 * 
 * Apresenta as principais seções do site:
 * - Banner principal com chamada para ação
 * - Seção de encomendas com formulário
 * - Categorias do cardápio com links diretos
 * - Informações de contato e localização
 * 
 * @component
 */

// Efeito de paralaxe para o banner
function useParallaxEffect(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollPosition = window.scrollY
        ref.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [ref])
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  useParallaxEffect(heroRef)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section 
        className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden bg-fixed bg-center bg-cover"
        ref={heroRef}
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <Image
          src="/images/hero.jpg"
          alt="Banner do Dono do Pedaço"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 animate-fade-in">
            O sabor que conquista
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-md mx-auto">
            Pedaço por pedaço
          </p>
          <Button size="lg" asChild className="animate-bounce-subtle">
            <Link href="/cardapio">Ver Cardápio</Link>
          </Button>
        </div>
      </section>

      <section id="encomendas" className="py-12 sm:py-16 md:py-24 container mx-auto scroll-mt-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Encomendas</h2>
        <div className="max-w-2xl mx-auto">
          <Tabs defaultValue="cake" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cake" className="text-sm sm:text-base">Bolo</TabsTrigger>
              <TabsTrigger value="snack" className="text-sm sm:text-base">Salgado</TabsTrigger>
            </TabsList>
            <TabsContent value="cake" className="mt-4 sm:mt-6">
              <OrderForm type="cake" />
            </TabsContent>
            <TabsContent value="snack" className="mt-4 sm:mt-6">
              <OrderForm type="snack" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="cardapio" className="py-12 sm:py-16 md:py-24 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Categorias do Cardápio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Categoria: Doces */}
            <div className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <Image
                  src="/images/doces.jpg"
                  alt="Doces"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white p-3 sm:p-4 text-sm sm:text-base font-medium">Delícias açucaradas para todos os gostos</p>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-base sm:text-lg mb-1">Doces</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">Delicie-se com nossas sobremesas.</p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">Do clássico ao gourmet.</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/cardapio?categoria=doces">Ver Mais</Link>
                </Button>
              </div>
            </div>

            {/* Categoria: Salgados */}
            <div className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <Image
                  src="/images/salgados.jpg"
                  alt="Salgados"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white p-3 sm:p-4 text-sm sm:text-base font-medium">Opções salgadas para satisfazer seu paladar</p>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-base sm:text-lg mb-1">Salgados</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">Deliciosas opções salgadas.</p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">Perfeitas para qualquer hora.</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/cardapio?categoria=salgados">Ver Mais</Link>
                </Button>
              </div>
            </div>

            {/* Categoria: Pães */}
            <div className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <Image
                  src="/images/paes.jpeg"
                  alt="Pães"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white p-3 sm:p-4 text-sm sm:text-base font-medium">Pães frescos e artesanais todos os dias</p>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-base sm:text-lg mb-1">Pães</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">Assados diariamente.</p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">Encontre seu pão favorito.</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/cardapio?categoria=paes">Ver Mais</Link>
                </Button>
              </div>
            </div>

            {/* Categoria: Outros */}
            <div className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <Image
                  src="/images/outros.jpg"
                  alt="Outros"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white p-3 sm:p-4 text-sm sm:text-base font-medium">Especialidades e itens exclusivos</p>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-base sm:text-lg mb-1">Outros</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">Itens especiais para você.</p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">Explore sabores únicos.</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/cardapio?categoria=outros">Ver Mais</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="py-12 sm:py-16 md:py-24 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Localização</h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-muted rounded-xl overflow-hidden h-[250px] sm:h-[300px] md:h-auto">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.5731666297403!2d-48.1814646!3d-21.8123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b8f650b9424d0d%3A0x7cb3f1a3f0d9e8b0!2sR.%20dos%20Eletricit%C3%A1rios%2C%201535%20-%20Jardim%20Arco-%C3%8Dris%2C%20Araraquara%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1710524800000!5m2!1spt-BR!2sbr"
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy"
                title="Localização da Panificadora Dono do Pedaço"
                aria-label="Mapa mostrando a localização da padaria"
              ></iframe>
            </div>
            
            <div className="bg-background p-4 sm:p-6 rounded-xl shadow-md">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Informações de Contato</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base mb-1">Endereço</h4>
                  <p className="text-sm text-muted-foreground">
                    R. dos Eletricitários, 1535 - Jardim Arco-Íris
                    <br />
                    Araraquara - SP
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm sm:text-base mb-1">Horário de Funcionamento</h4>
                  <p className="text-sm text-muted-foreground">
                    Segunda a Sábado: 6h às 18h30
                    <br />
                    Domingo: Fechado
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm sm:text-base mb-1">Contato</h4>
                  <p className="text-sm text-muted-foreground">
                    WhatsApp: (16) 99778-3037
                  </p>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://www.facebook.com/dono.dopedaco.3" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <span className="text-muted-foreground cursor-not-allowed">
                      <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="sr-only">Instagram - Em breve</span>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-background border-t py-4 sm:py-6">
        <div className="container mx-auto text-center text-xs sm:text-sm text-muted-foreground px-4">
          <p>© 2025 Panificadora Dono do Pedaço. Todos os direitos reservados.</p>
        </div>
      </footer>
      
      <WhatsAppButton phoneNumber="5516997783037" />
    </div>
  )
}