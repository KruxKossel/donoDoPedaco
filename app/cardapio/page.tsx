/**
 * Página do cardápio da Padaria Dono do Pedaço
 * 
 * Apresenta todos os produtos organizados por categorias:
 * - Destaques do dia
 * - Doces
 * - Salgados
 * - Pães
 * - Frios
 * - Bebidas
 * - Outros
 * 
 * Inclui informações adicionais sobre:
 * - Retirada de produtos
 * - Alérgenos
 * - Encomendas
 * 
 * @component
 */
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"

// Tipos para os produtos em destaque
interface DestaqueProduto {
  imagem: string
  titulo: string
  descricao: string
  badges: string[]
  preco: string
}

// Produtos em destaque do dia
const destaques: DestaqueProduto[] = [
  {
    imagem: "/images/miniSalgado.jpg",
    titulo: "Mini Salgado",
    descricao: "Deliciosos salgadinhos feitos artesanalmente. Sabores: queijo, carne, frango e calabresa. Massa crocante e recheio suculento.",
    badges: ["Mais vendido", "Fresco do dia"],
    preco: "R$ 1,00 /un"
  },
  {
    imagem: "/images/paoCaseiro.jpg",
    titulo: "Pão Caseiro",
    descricao: "Pão caseiro tradicional, feito com fermentação natural. Massa macia e saborosa, perfeita para o café da manhã ou lanche.",
    badges: ["Artesanal", "Receita especial"],
    preco: "R$ 10,00"
  }
]

export default function CardapioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image
          src="https://images.pexels.com/photos/1756062/pexels-photo-1756062.jpeg"
          alt="Variedade de pães e produtos de padaria"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-center">Nosso Cardápio</h1>
          <p className="max-w-md text-center text-sm sm:text-base">
            Descubra a variedade de sabores e produtos artesanais que preparamos com carinho
          </p>
        </div>
      </div>

      <section className="container mx-auto py-6 sm:py-8 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold">Destaques do Dia</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {destaques.map((destaque) => (
            <div key={destaque.titulo} className="bg-background border rounded-lg overflow-hidden flex flex-col sm:flex-row shadow-md hover:shadow-lg transition-all duration-300">
              <div className="h-[180px] sm:h-[200px] sm:w-[180px] md:w-[200px] relative">
                <Image
                  src={destaque.imagem}
                  alt={destaque.titulo}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 180px, 200px"
                />
                <Badge className="absolute top-2 right-2 bg-primary/70">Destaque</Badge>
              </div>
              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <h3 className="font-bold text-base sm:text-lg">{destaque.titulo}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                  {destaque.descricao}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                  {destaque.badges.map((badge) => (
                    <Badge variant="outline" className="text-xs" key={badge}>{badge}</Badge>
                  ))}
                </div>
                <div className="mt-auto">
                  <span className="font-bold text-sm sm:text-base">{destaque.preco}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-6 sm:py-8 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Nosso Cardápio</h2>
        <Tabs defaultValue="doces" className="w-full">
          <TabsList className="mb-4 sm:mb-6 w-full justify-start overflow-x-auto flex-nowrap">
            <TabsTrigger value="doces" className="text-sm sm:text-base">Doces</TabsTrigger>
            <TabsTrigger value="salgados" className="text-sm sm:text-base">Salgados</TabsTrigger>
            <TabsTrigger value="paes" className="text-sm sm:text-base">Pães</TabsTrigger>
            <TabsTrigger value="frios" className="text-sm sm:text-base">Frios</TabsTrigger>
            <TabsTrigger value="bebidas" className="text-sm sm:text-base">Bebidas</TabsTrigger>
            <TabsTrigger value="outros" className="text-sm sm:text-base">Outros</TabsTrigger>
          </TabsList>

          <TabsContent value="doces" className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Torta de Limão</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Torta cremosa de limão com base crocante
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 5,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Pudim</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Pudim cremoso de leite condensado
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 8,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Mousse de Maracujá</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Mousse leve e refrescante de maracujá
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 4,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Bolo de Pote</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Bolo cremoso servido em pote individual
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 7,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Brigadeiro</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Brigadeiro tradicional
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 3,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Beijinho</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Beijinho de coco
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 3,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Bombocado</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Doce tradicional de coco
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 3,50</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Bolo Simples</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Sabores: limão, laranja, coco, chocolate, cenoura, formigueiro, fubá, milho
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 15,00</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="salgados" className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Mini Salgado</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Sabores: queijo, milho, brócolis, mortadela, calabresa, presunto, carne, frango, kibe
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 1,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Lanche Natural</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Lanche natural fresco
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 5,00</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="paes" className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Pão Francês</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Em média: R$ 1,20 | Kg: R$ 17,00
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 1,20</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Pão de Leite</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Em média: R$ 1,20 | Kg: R$ 17,00
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 1,20</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Mini Pão de Queijo</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Pão de queijo tradicional mineiro
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 1,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Pão Caseiro</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Pão caseiro tradicional
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 10,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Pão de Milho</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Pão de milho caseiro
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 10,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Caseirinho</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Pão caseiro individual
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 7,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Torrada</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Torrada crocante
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 7,00</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="frios" className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Muçarela</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    100g: R$ 6,50 | Kg: R$ 65,00
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 6,50/100g</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Presunto</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    100g: R$ 3,50 | Kg: R$ 35,00
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 3,50/100g</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Mortadela</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    100g: R$ 3,00 | Kg: R$ 30,00
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 3,00/100g</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bebidas" className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Refrigerante 350ml</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Fanta, Sprite, Guaraná, Pepsi e Schweppes
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 4,50</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Tiss 350ml</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Limão, laranja, tubaína e guaraná
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 3,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Premium 350ml</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Coca-Cola e Tônica
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 5,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Mini 269ml</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Guaraná e Pepsi
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 3,50</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Mini Coca-Cola</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    220ml
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 3,50</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">H2OH</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    500ml
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 6,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Refrigerante 600ml</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Soda e Guaraná
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 5,50</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Coca-Cola 2L</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Refrigerante 2 litros
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 15,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Poty 2L</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Refrigerante 2 litros
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 7,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Roller 2L</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Refrigerante 2 litros
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 8,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Kuat 2L</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Refrigerante 2 litros
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 6,50</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Tiss 2L</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Refrigerante 2 litros
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 6,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Suco Nativo</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    290ml
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 3,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Suco DaFruta</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    1 litro
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 7,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Suco em Pó</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Diversos sabores
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 1,50</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Água Sem Gás</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    500ml
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 2,50</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Água Com Gás</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    500ml
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 3,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Leite de Chocolate</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    200ml
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 2,00</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="outros" className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Farinha de Rosca</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Farinha de rosca caseira
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 7,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Leite</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    Leite integral
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 7,00</span>
                  </div>
                </div>
              </div>

              <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-sm sm:text-base">Margarina</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
                    250g
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-sm sm:text-base">R$ 5,00</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="bg-muted/30 rounded-lg p-4 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Informações Adicionais</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Retirada</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Não realizamos entregas. Os pedidos devem ser retirados presencialmente na padaria. 
                Consulte pelo WhatsApp para saber sobre disponibilidade e prazos.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-red-500 font-medium">
                ⚠️ Atenção: A padaria não abre aos domingos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Alérgenos</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Nossos produtos podem conter glúten, leite, ovos, soja e castanhas.
                Consulte-nos para opções específicas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Encomendas</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Produtos especiais sob encomenda devem ser solicitados com 48h de antecedência.
                Retirada somente de segunda a sábado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-background border-t py-4 sm:py-6">
        <div className="container mx-auto text-center text-xs sm:text-sm text-muted-foreground px-4">
          <p>© 2025 Dono do Pedaço. Todos os direitos reservados.</p>
        </div>
      </footer>
      
      <WhatsAppButton phoneNumber="5516997783037" />
    </div>
  )
}