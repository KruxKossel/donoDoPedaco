"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface OrderFormProps {
  type: "cake" | "snack"
}

export function OrderForm({ type }: OrderFormProps) {
  const [formData, setFormData] = useState({
    // Campos comuns
    name: "",
    pickupDate: "",
    pickupTime: "",
    
    // Campos específicos para bolo
    weight: type === "cake" ? "1.5" : "",
    cakeType: "",
    flavors: "",
    decoration: "",
    
    // Campos específicos para salgados
    quantity: "",
    flavorsQuantity: "",
    flavorsObservation: "",
    cookingType: "frito",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const formatWhatsAppMessage = () => {
    let message = `Olá! Gostaria de fazer uma encomenda de ${type === "cake" ? "bolo" : "salgados"}:\n\n`

    if (type === "cake") {
      message += `Peso: ${formData.weight}kg\n`
      message += `Tipo de massa: ${formData.cakeType}\n`
      message += `Sabores: ${formData.flavors}\n`
      message += `Decoração: ${formData.decoration}\n`
    } else {
      message += `Quantidade total: ${formData.quantity}\n`
      message += `Sabores e quantidades: ${formData.flavorsQuantity}\n`
      message += `Divisão dos sabores: ${formData.flavorsObservation}\n`
      message += `Tipo: ${formData.cookingType}\n`
    }

    message += `\nRetirada:\nData: ${formData.pickupDate}\n`
    message += `Horário: ${formData.pickupTime}\n`
    message += `Nome: ${formData.name}`

    return encodeURIComponent(message)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = formatWhatsAppMessage()
    window.open(`https://wa.me/5516997783037?text=${message}`, "_blank")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {type === "cake" && (
        <div className="bg-muted/30 p-3 sm:p-4 rounded-lg text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
          Esse formulário é apenas para agilizar o processo, informações adicionais podem ser conversadas com o confeiteiro. 
          Bolos acima de 2kg devem ser pagos com 50% antecipado. Devolução só com cancelamento 2 dias antes da data combinada. 
          Valor por kg: R$ 58 (sujeito a alteração conforme sabor).
        </div>
      )}

      {type === "snack" && (
        <div className="bg-muted/30 p-3 sm:p-4 rounded-lg text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
          Valor por unidade: R$ 1,00. Encomendas acima de R$ 50 devem ser pagas 50% antecipado. 
          Devolução só com cancelamento 2 dias antes da retirada.
        </div>
      )}

      <div className="grid gap-6">
        {type === "cake" && (
          <>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm sm:text-base">Peso (kg)</Label>
                <Input
                  type="number"
                  id="weight"
                  name="weight"
                  min="1.5"
                  step="0.5"
                  value={formData.weight}
                  onChange={handleInputChange}
                  required
                  className="text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cakeType" className="text-sm sm:text-base">Tipo de Massa</Label>
                <Select name="cakeType" onValueChange={(value) => handleSelectChange("cakeType", value)} required>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder="Selecione o tipo de massa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="branca">Branca</SelectItem>
                    <SelectItem value="chocolate">Chocolate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="flavors" className="text-sm sm:text-base">Sabores (até 2)</Label>
              <Input
                id="flavors"
                name="flavors"
                placeholder="Ex: brigadeiro, leite ninho"
                value={formData.flavors}
                onChange={handleInputChange}
                required
                className="text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="decoration" className="text-sm sm:text-base">Decoração Desejada</Label>
              <Textarea
                id="decoration"
                name="decoration"
                placeholder="Descreva como gostaria que o bolo fosse decorado"
                value={formData.decoration}
                onChange={handleInputChange}
                required
                className="text-sm sm:text-base min-h-[100px]"
              />
            </div>
          </>
        )}

        {type === "snack" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm sm:text-base">Quantidade Total de Salgados</Label>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                min="20"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="flavorsQuantity" className="text-sm sm:text-base">Sabores e Quantidades</Label>
              <Textarea
                id="flavorsQuantity"
                name="flavorsQuantity"
                placeholder="Ex: Frango - 10, Queijo - 10, Misto"
                value={formData.flavorsQuantity}
                onChange={handleInputChange}
                required
                className="text-sm sm:text-base min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="flavorsObservation" className="text-sm sm:text-base">Observações</Label>
              <Textarea
                id="flavorsObservation"
                name="flavorsObservation"
                placeholder=""
                value={formData.flavorsObservation}
                onChange={handleInputChange}
                required
                className="text-sm sm:text-base min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Tipo</Label>
              <RadioGroup
                defaultValue="frito"
                onValueChange={(value) => handleSelectChange("cookingType", value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="frito" id="frito" />
                  <Label htmlFor="frito" className="text-sm sm:text-base">Frito</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cru" id="cru" />
                  <Label htmlFor="cru" className="text-sm sm:text-base">Cru</Label>
                </div>
              </RadioGroup>
            </div>
          </>
        )}

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="pickupDate" className="text-sm sm:text-base">Data de Retirada</Label>
            <Input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleInputChange}
              required
              className="text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickupTime" className="text-sm sm:text-base">Horário de Retirada</Label>
            <Input
              type="time"
              id="pickupTime"
              name="pickupTime"
              min="06:00"
              max="18:30"
              value={formData.pickupTime}
              onChange={handleInputChange}
              required
              className="text-sm sm:text-base"
            />
            <p className="text-xs sm:text-sm text-muted-foreground">
              Horário de retirada: segunda a sábado, das 6h às 18h30
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm sm:text-base">Nome de quem vai retirar</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="text-sm sm:text-base"
          />
        </div>

        <Button type="submit" className="w-full text-sm sm:text-base py-6">
          Enviar Pedido via WhatsApp
        </Button>
      </div>
    </form>
  )
}