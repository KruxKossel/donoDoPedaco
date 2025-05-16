"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const SNACK_FLAVORS = [
  "Frango",
  "Carne",
  "Presunto",
  "Mortadela",
  "Queijo",
  "Kibe",
  "Brócolis",
  "Calabresa",
  "Milho"
]

interface FlavorQuantity {
  [key: string]: number
}

interface SnackFlavorSelectorProps {
  totalQuantity: number
  onChange: (flavors: FlavorQuantity) => void
}

export function SnackFlavorSelector({ totalQuantity, onChange }: SnackFlavorSelectorProps) {
  const [quantities, setQuantities] = useState<FlavorQuantity>({})
  const [error, setError] = useState<string>("")

  const getCurrentTotal = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + (qty || 0), 0)
  }

  const handleQuantityChange = (flavor: string, value: string) => {
    const numValue = value === "" ? 0 : parseInt(value)
    const newQuantities = { ...quantities, [flavor]: numValue }
    const newTotal = Object.values(newQuantities).reduce((sum, qty) => sum + (qty || 0), 0)

    if (newTotal > totalQuantity) {
      setError(`O total de salgados (${newTotal}) excede a quantidade máxima de ${totalQuantity} unidades`)
    } else {
      setError("")
      setQuantities(newQuantities)
      onChange(newQuantities)
    }
  }

  useEffect(() => {
    // Limpa as quantidades quando o total muda
    setQuantities({})
    onChange({})
    setError("")
  }, [totalQuantity])

  const formatFlavorQuantities = () => {
    const selectedFlavors = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([flavor, qty]) => `${flavor}: ${qty}`)
      .join(", ")
    return selectedFlavors
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SNACK_FLAVORS.map((flavor) => (
          <div key={flavor} className="flex items-center gap-3">
            <Label htmlFor={flavor} className="flex-grow text-sm">
              {flavor}
            </Label>
            <Input
              type="number"
              id={flavor}
              min="0"
              max={totalQuantity}
              value={quantities[flavor] || ""}
              onChange={(e) => handleQuantityChange(flavor, e.target.value)}
              className="w-20 text-sm"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm">
        <span>Total selecionado: {getCurrentTotal()}</span>
        <span>Máximo: {totalQuantity}</span>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {getCurrentTotal() < totalQuantity && (
        <p className="text-sm text-muted-foreground">
          Faltam {totalQuantity - getCurrentTotal()} unidades para atingir o total
        </p>
      )}
    </div>
  )
} 