"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface OrderConfirmationDialogProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  type: "cake" | "snack"
}

export function OrderConfirmationDialog({
  isOpen,
  onConfirm,
  onCancel,
  type
}: OrderConfirmationDialogProps) {
  const message = type === "cake"
    ? "Você está ciente de que essa encomenda é para iniciar a conversa com o confeiteiro e que ele precisará confirmar se existe a possibilidade de realizar o serviço?"
    : "Você está ciente de que essa encomenda é para iniciar a conversa e será necessário confirmar se haverá disponibilidade para realizar o serviço?"

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="sm:max-w-[425px] max-h-[85vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Pedido</AlertDialogTitle>
          <AlertDialogDescription>
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:space-x-2">
          <AlertDialogCancel onClick={onCancel} className="mb-2 sm:mb-0">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 