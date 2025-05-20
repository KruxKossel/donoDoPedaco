interface ProdutoCardProps {
  titulo: string
  descricao: string
  preco: string
}

export function ProdutoCard({ titulo, descricao, preco }: ProdutoCardProps) {
  return (
    <div className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-3 sm:p-4">
        <h3 className="font-medium text-sm sm:text-base">{titulo}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground my-2 min-h-[40px]">
          {descricao}
        </p>
        <div className="mt-4">
          <span className="font-bold text-sm sm:text-base">{preco}</span>
        </div>
      </div>
    </div>
  )
} 