import Image from "next/image"

interface CardapioBannerProps {
  titulo: string
  descricao: string
}

export function CardapioBanner({ titulo, descricao }: CardapioBannerProps) {
  return (
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
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-center">{titulo}</h1>
        <p className="max-w-md text-center text-sm sm:text-base">
          {descricao}
        </p>
      </div>
    </div>
  )
} 