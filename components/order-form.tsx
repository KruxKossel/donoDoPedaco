"use client"

import { useState, useEffect } from "react"
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
import { OrderConfirmationDialog } from "@/components/order-confirmation-dialog"
import { FlavorSelector } from "@/components/flavor-selector"
import { SnackFlavorSelector } from "@/components/snack-flavor-selector"

interface OrderFormProps {
  type: "cake" | "snack"
}

// Constantes de validação
const STORE_HOURS = {
  open: "06:00",
  close: "18:30"
}

const WHATSAPP_NUMBER = "5516997783037" // Idealmente, isso viria de uma variável de ambiente

export function OrderForm({ type }: OrderFormProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})
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

  const validateDate = (date: string) => {
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      return "A data de retirada não pode ser no passado"
    }

    const dayOfWeek = selectedDate.getDay()
    if (dayOfWeek === 0) {
      return "A padaria não funciona aos domingos"
    }

    return ""
  }

  const validateTime = (time: string) => {
    if (!time) return ""

    const [hours, minutes] = time.split(":").map(Number)
    const [openHours, openMinutes] = STORE_HOURS.open.split(":").map(Number)
    const [closeHours, closeMinutes] = STORE_HOURS.close.split(":").map(Number)

    const timeValue = hours * 60 + minutes
    const openValue = openHours * 60 + openMinutes
    const closeValue = closeHours * 60 + closeMinutes

    if (timeValue < openValue || timeValue > closeValue) {
      return `Horário de funcionamento: ${STORE_HOURS.open} às ${STORE_HOURS.close}`
    }

    return ""
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Validação em tempo real
    if (name === "pickupDate") {
      const error = validateDate(value)
      setValidationErrors(prev => ({ ...prev, pickupDate: error }))
    }
    if (name === "pickupTime") {
      const error = validateTime(value)
      setValidationErrors(prev => ({ ...prev, pickupTime: error }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFlavorsChange = (flavors: string[]) => {
    setFormData(prev => ({ ...prev, flavors: flavors.join(", ") }))
  }

  const handleSnackFlavorsChange = (flavors: { [key: string]: number }) => {
    const flavorsText = Object.entries(flavors)
      .filter(([_, qty]) => qty > 0)
      .map(([flavor, qty]) => `${flavor}: ${qty}`)
      .join(", ")
    setFormData(prev => ({ ...prev, flavorsQuantity: flavorsText }))
  }

  const sanitizeText = (text: string) => {
    // Remove caracteres potencialmente perigosos para URLs
    return text.replace(/[<>{}[\]\\]/g, "")
  }

  const formatWhatsAppMessage = () => {
    let message = `Olá! Gostaria de fazer uma encomenda de ${type === "cake" ? "bolo" : "salgados"}:\n\n`

    if (type === "cake") {
      message += `Peso: ${formData.weight}kg\n`
      message += `Tipo de massa: ${formData.cakeType}\n`
      message += `Sabores: ${formData.flavors}\n`
      message += `Decoração: ${sanitizeText(formData.decoration)}\n`
    } else {
      message += `Quantidade total: ${formData.quantity}\n`
      message += `Sabores e quantidades: ${formData.flavorsQuantity}\n`
      message += `Divisão dos sabores: ${sanitizeText(formData.flavorsObservation)}\n`
      message += `Tipo: ${formData.cookingType}\n`
    }

    message += `\nRetirada:\nData: ${formData.pickupDate}\n`
    message += `Horário: ${formData.pickupTime}\n`
    message += `Nome: ${sanitizeText(formData.name)}`

    return encodeURIComponent(message)
  }

  const validateForm = () => {
    const errors: {[key: string]: string} = {}

    // Validação de data e hora
    const dateError = validateDate(formData.pickupDate)
    const timeError = validateTime(formData.pickupTime)

    if (dateError) errors.pickupDate = dateError
    if (timeError) errors.pickupTime = timeError

    // Validações específicas por tipo
    if (type === "cake") {
      if (!formData.flavors) {
        errors.flavors = "Selecione pelo menos um sabor"
      }
    } else {
      if (!formData.flavorsQuantity) {
        errors.flavorsQuantity = "Selecione as quantidades dos sabores"
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowConfirmation(true)
    }
  }

  const handleConfirm = () => {
    const message = formatWhatsAppMessage()
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
    setShowConfirmation(false)
  }

  // Reseta erros quando o tipo muda
  useEffect(() => {
    setValidationErrors({})
  }, [type])

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

        <div className="space-y-6">
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
                <Label className="text-sm sm:text-base">Sabores (até 2)</Label>
                <FlavorSelector onChange={handleFlavorsChange} maxFlavors={2} />
                {validationErrors.flavors && (
                  <p className="text-sm text-destructive" role="alert">{validationErrors.flavors}</p>
                )}
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
                {formData.quantity ? (
                  <SnackFlavorSelector 
                    totalQuantity={parseInt(formData.quantity) || 0} 
                    onChange={handleSnackFlavorsChange}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Primeiro, informe a quantidade total de salgados acima
                  </p>
                )}
                {validationErrors.flavorsQuantity && (
                  <p className="text-sm text-destructive" role="alert">{validationErrors.flavorsQuantity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="flavorsObservation" className="text-sm sm:text-base">Observações</Label>
                <Textarea
                  id="flavorsObservation"
                  name="flavorsObservation"
                  placeholder="Deseja tirar alguma dúvida? Ou nos informar se devemos separar, ou misturar os sabores?"
                  value={formData.flavorsObservation}
                  onChange={handleInputChange}
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
                aria-invalid={validationErrors.pickupDate ? "true" : "false"}
                aria-describedby={validationErrors.pickupDate ? "date-error" : undefined}
              />
              {validationErrors.pickupDate && (
                <p className="text-sm text-destructive" role="alert" id="date-error">
                  {validationErrors.pickupDate}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupTime" className="text-sm sm:text-base">Horário de Retirada</Label>
              <Input
                type="time"
                id="pickupTime"
                name="pickupTime"
                min={STORE_HOURS.open}
                max={STORE_HOURS.close}
                value={formData.pickupTime}
                onChange={handleInputChange}
                required
                className="text-sm sm:text-base"
                aria-invalid={validationErrors.pickupTime ? "true" : "false"}
                aria-describedby={validationErrors.pickupTime ? "time-error" : undefined}
              />
              {validationErrors.pickupTime && (
                <p className="text-sm text-destructive" role="alert" id="time-error">
                  {validationErrors.pickupTime}
                </p>
              )}
              <p className="text-xs sm:text-sm text-muted-foreground">
                Horário de retirada: segunda a sábado, das {STORE_HOURS.open} às {STORE_HOURS.close}
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
            Solicitar Orçamento
          </Button>
        </div>
      </form>

      <OrderConfirmationDialog
        isOpen={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirmation(false)}
        type={type}
      />
    </>
  )
}