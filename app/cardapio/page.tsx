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
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DestaqueCard } from "@/components/destaque-card"
import { CardapioBanner } from "@/components/cardapio-banner"
import { ProdutoCard } from "@/components/produto-card"
import { produtos } from "@/data/produtos"

// Produtos em destaque do dia
const destaques = [
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

      <CardapioBanner 
        titulo="Nosso Cardápio"
        descricao="Descubra a variedade de sabores e produtos artesanais que preparamos com carinho"
      />

      <section className="container mx-auto py-6 sm:py-8 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold">Destaques do Dia</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {destaques.map((destaque) => (
            <DestaqueCard key={destaque.titulo} {...destaque} />
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

          {Object.entries(produtos).map(([categoria, items]) => (
            <TabsContent key={categoria} value={categoria} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {items.map((produto) => (
                  <ProdutoCard key={produto.titulo} {...produto} />
                ))}
              </div>
            </TabsContent>
          ))}
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
          <p>© 2025 Panificadora Dono do Pedaço. Todos os direitos reservados.</p>
          <a 
            href="https://portifolio-ellen-kos.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-purple-600/70 hover:text-purple-600 transition-colors duration-300 font-medium"
            aria-label="Design por Ellen Oliveira"
          >
            Design by Ellen Oliveira
          </a>
        </div>
      </footer>
      
      <WhatsAppButton phoneNumber="5516997783037" />
    </div>
  )
}