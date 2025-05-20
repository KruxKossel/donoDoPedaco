interface Produto {
  titulo: string
  descricao: string
  preco: string
}

interface CategoriaProdutos {
  [key: string]: Produto[]
}

export const produtos: CategoriaProdutos = {
  doces: [
    {
      titulo: "Torta de Limão",
      descricao: "Torta cremosa de limão com base crocante",
      preco: "R$ 5,00"
    },
    {
      titulo: "Pudim",
      descricao: "Pudim cremoso de leite condensado",
      preco: "R$ 8,00"
    },
    {
      titulo: "Mousse de Maracujá",
      descricao: "Mousse leve e refrescante de maracujá",
      preco: "R$ 4,00"
    },
    {
      titulo: "Bolo de Pote",
      descricao: "Bolo cremoso servido em pote individual",
      preco: "R$ 7,00"
    },
    {
      titulo: "Brigadeiro",
      descricao: "Brigadeiro tradicional",
      preco: "R$ 3,00"
    },
    {
      titulo: "Beijinho",
      descricao: "Beijinho de coco",
      preco: "R$ 3,00"
    },
    {
      titulo: "Bombocado",
      descricao: "Doce tradicional de coco",
      preco: "R$ 3,50"
    },
    {
      titulo: "Bolo Simples",
      descricao: "Sabores: limão, laranja, coco, chocolate, cenoura, formigueiro, fubá, milho",
      preco: "R$ 15,00"
    }
  ],
  salgados: [
    {
      titulo: "Mini Salgado",
      descricao: "Sabores: queijo, milho, brócolis, mortadela, calabresa, presunto, carne, frango, kibe",
      preco: "R$ 1,00"
    },
    {
      titulo: "Lanche Natural",
      descricao: "Lanche natural fresco",
      preco: "R$ 5,00"
    }
  ],
  paes: [
    {
      titulo: "Pão Francês",
      descricao: "Em média: R$ 1,20 | Kg: R$ 17,00",
      preco: "R$ 1,20"
    },
    {
      titulo: "Pão de Leite",
      descricao: "Em média: R$ 1,20 | Kg: R$ 17,00",
      preco: "R$ 1,20"
    },
    {
      titulo: "Mini Pão de Queijo",
      descricao: "Pão de queijo tradicional mineiro",
      preco: "R$ 1,00"
    },
    {
      titulo: "Pão Caseiro",
      descricao: "Pão caseiro tradicional",
      preco: "R$ 10,00"
    },
    {
      titulo: "Pão de Milho",
      descricao: "Pão de milho caseiro",
      preco: "R$ 10,00"
    },
    {
      titulo: "Caseirinho",
      descricao: "Pão caseiro individual",
      preco: "R$ 7,00"
    },
    {
      titulo: "Torrada",
      descricao: "Torrada crocante",
      preco: "R$ 7,00"
    }
  ],
  frios: [
    {
      titulo: "Muçarela",
      descricao: "100g: R$ 6,50 | Kg: R$ 65,00",
      preco: "R$ 6,50/100g"
    },
    {
      titulo: "Presunto",
      descricao: "100g: R$ 3,50 | Kg: R$ 35,00",
      preco: "R$ 3,50/100g"
    },
    {
      titulo: "Mortadela",
      descricao: "100g: R$ 3,00 | Kg: R$ 30,00",
      preco: "R$ 3,00/100g"
    }
  ],
  bebidas: [
    {
      titulo: "Refrigerante 350ml",
      descricao: "Fanta, Sprite, Guaraná, Pepsi e Schweppes",
      preco: "R$ 4,50"
    },
    {
      titulo: "Tiss 350ml",
      descricao: "Limão, laranja, tubaína e guaraná",
      preco: "R$ 3,00"
    },
    {
      titulo: "Premium 350ml",
      descricao: "Coca-Cola e Tônica",
      preco: "R$ 5,00"
    },
    {
      titulo: "Mini 269ml",
      descricao: "Guaraná e Pepsi",
      preco: "R$ 3,50"
    },
    {
      titulo: "Mini Coca-Cola",
      descricao: "220ml",
      preco: "R$ 3,50"
    },
    {
      titulo: "H2OH",
      descricao: "500ml",
      preco: "R$ 6,00"
    },
    {
      titulo: "Refrigerante 600ml",
      descricao: "Soda e Guaraná",
      preco: "R$ 5,50"
    },
    {
      titulo: "Coca-Cola 2L",
      descricao: "Refrigerante 2 litros",
      preco: "R$ 15,00"
    },
    {
      titulo: "Poty 2L",
      descricao: "Refrigerante 2 litros",
      preco: "R$ 7,00"
    },
    {
      titulo: "Roller 2L",
      descricao: "Refrigerante 2 litros",
      preco: "R$ 8,00"
    },
    {
      titulo: "Kuat 2L",
      descricao: "Refrigerante 2 litros",
      preco: "R$ 6,50"
    },
    {
      titulo: "Tiss 2L",
      descricao: "Refrigerante 2 litros",
      preco: "R$ 6,00"
    },
    {
      titulo: "Suco Nativo",
      descricao: "290ml",
      preco: "R$ 3,00"
    },
    {
      titulo: "Suco DaFruta",
      descricao: "1 litro",
      preco: "R$ 7,00"
    },
    {
      titulo: "Suco em Pó",
      descricao: "Diversos sabores",
      preco: "R$ 1,50"
    },
    {
      titulo: "Água Sem Gás",
      descricao: "500ml",
      preco: "R$ 2,50"
    },
    {
      titulo: "Água Com Gás",
      descricao: "500ml",
      preco: "R$ 3,00"
    },
    {
      titulo: "Leite de Chocolate",
      descricao: "200ml",
      preco: "R$ 2,00"
    }
  ],
  outros: [
    {
      titulo: "Farinha de Rosca",
      descricao: "Farinha de rosca caseira",
      preco: "R$ 7,00"
    },
    {
      titulo: "Leite",
      descricao: "Leite integral",
      preco: "R$ 7,00"
    },
    {
      titulo: "Margarina",
      descricao: "250g",
      preco: "R$ 5,00"
    }
  ]
} 