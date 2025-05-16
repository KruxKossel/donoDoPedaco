export const STORE_CONFIG = {
  hours: {
    open: "06:00",
    close: "18:30"
  },
  whatsapp: {
    number: "5516997783037",
    defaultMessage: "Olá! Gostaria de fazer um pedido na Panificadora Dono do Pedaço."
  },
  orders: {
    cake: {
      minWeight: 1.5,
      pricePerKg: 58,
      maxFlavors: 2
    },
    snack: {
      minQuantity: 20,
      pricePerUnit: 1
    }
  }
} as const 