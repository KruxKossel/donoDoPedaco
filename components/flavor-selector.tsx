"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const FIXED_FLAVORS = [
  "Brigadeiro",
  "Leite Ninho",
  "Beijinho",
  "Abacaxi",
  "Ninho com Morango",
  "Brigadeiro de Morango"
]

interface FlavorSelectorProps {
  onChange: (flavors: string[]) => void
  maxFlavors?: number
}

export function FlavorSelector({ onChange, maxFlavors = 2 }: FlavorSelectorProps) {
  const [mode, setMode] = useState<"fixed" | "custom">("fixed")
  const [selectedFixedFlavors, setSelectedFixedFlavors] = useState<string[]>([])
  const [customFlavors, setCustomFlavors] = useState("")

  const handleFixedFlavorChange = (checked: boolean, flavor: string) => {
    let newFlavors: string[]
    
    if (checked) {
      if (selectedFixedFlavors.length >= maxFlavors) {
        return
      }
      newFlavors = [...selectedFixedFlavors, flavor]
    } else {
      newFlavors = selectedFixedFlavors.filter(f => f !== flavor)
    }
    
    setSelectedFixedFlavors(newFlavors)
    onChange(newFlavors)
  }

  const handleCustomFlavorsChange = (value: string) => {
    setCustomFlavors(value)
    const flavors = value.split(",").map(f => f.trim()).filter(Boolean)
    if (flavors.length <= maxFlavors) {
      onChange(flavors)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <Button
          type="button"
          variant={mode === "fixed" ? "default" : "outline"}
          onClick={() => setMode("fixed")}
          className="w-full sm:w-auto"
        >
          Sabores Tradicionais (R$58/kg)
        </Button>
        <Button
          type="button"
          variant={mode === "custom" ? "default" : "outline"}
          onClick={() => setMode("custom")}
          className="w-full sm:w-auto"
        >
          Sabores Personalizados
        </Button>
      </div>

      {mode === "fixed" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {FIXED_FLAVORS.map((flavor) => (
            <div key={flavor} className="flex items-center space-x-2">
              <Checkbox
                id={flavor}
                checked={selectedFixedFlavors.includes(flavor)}
                onCheckedChange={(checked) => 
                  handleFixedFlavorChange(checked as boolean, flavor)
                }
                disabled={!selectedFixedFlavors.includes(flavor) && 
                  selectedFixedFlavors.length >= maxFlavors}
              />
              <Label htmlFor={flavor} className="text-sm">
                {flavor}
              </Label>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <Input
            placeholder={`Digite até ${maxFlavors} sabores separados por vírgula`}
            value={customFlavors}
            onChange={(e) => handleCustomFlavorsChange(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            * Sabores personalizados podem ter preço diferenciado, a ser combinado com o confeiteiro
          </p>
        </div>
      )}
    </div>
  )
} 