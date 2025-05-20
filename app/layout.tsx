/**
 * Layout principal da aplicação
 * Configura o tema, fonte, metadata e estrutura base do site
 */
import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Carrega a fonte Inter do Google Fonts com suporte a caracteres latinos
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Dono do Pedaço",
  description: "Padaria artesanal em Araraquara",
  icons: {
    icon: "/images/logo.PNG",
    shortcut: "/images/logo.PNG",
    apple: "/images/logo.PNG",
  },
  keywords: ["padaria", "Araraquara", "pães", "doces", "salgados", "artesanal"],
  authors: [{ name: "Dono do Pedaço" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Dono do Pedaço",
    description: "Padaria artesanal em Araraquara",
    siteName: "Dono do Pedaço",
    url: "https://dono-do-pedaco.vercel.app",
  }
}

// Configurações de viewport para melhor experiência mobile
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Permitir zoom até 5x para melhor acessibilidade
  minimumScale: 1,
  userScalable: true, // Habilitar zoom para melhor acessibilidade
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="color-scheme" content="light dark" />
        <link rel="canonical" href="https://dono-do-pedaco.vercel.app" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="dono-do-pedaco-theme"
        >
          <main className="flex-1">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}