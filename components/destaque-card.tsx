import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface DestaqueCardProps {
  imagem: string
  titulo: string
  descricao: string
  badges: string[]
  preco: string
}

export function DestaqueCard({ imagem, titulo, descricao, badges, preco }: DestaqueCardProps) {
  return (
    <div className="bg-background border rounded-lg overflow-hidden flex flex-col sm:flex-row shadow-md hover:shadow-lg transition-all duration-300">
      <div className="h-[180px] sm:h-[200px] sm:w-[180px] md:w-[200px] relative">
        <Image
          src={imagem}
          alt={titulo}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 180px, 200px"
        />
        <Badge className="absolute top-2 right-2 bg-primary/70">Destaque</Badge>
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="font-bold text-base sm:text-lg">{titulo}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2">
          {descricao}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
          {badges.map((badge) => (
            <Badge variant="outline" className="text-xs" key={badge}>{badge}</Badge>
          ))}
        </div>
        <div className="mt-auto">
          <span className="font-bold text-sm sm:text-base">{preco}</span>
        </div>
      </div>
    </div>
  )
} 