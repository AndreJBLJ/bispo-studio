// Conteúdo da landing. Fonte: valores.md enviado pelo André em 2026-11-04 e PRODUCT.md.
// As duas versões da página (/ e /estudio) leem daqui, então preço mudou, muda nas duas.

export const WHATSAPP = "5511977122310";
export const WHATSAPP_LABEL = "(11) 97712-2310";

export function whatsappLink(mensagem: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

export const MSG_ORCAMENTO =
  "Oi, André! Vi o site do Bispo Studio e quero um orçamento de site para o meu negócio de impressão 3D.";

export type Plano = {
  id: "essencial" | "profissional" | "loja";
  nome: string;
  preco: string;
  mensalidade: string;
  paraQue: string;
  compra: string;
  prazo: string;
  ajustes: string;
  inclui: string[];
  destaque?: boolean;
};

export const PLANOS: Plano[] = [
  {
    id: "essencial",
    nome: "Essencial",
    preco: "1.100",
    mensalidade: "150",
    paraQue: "Uma página que apresenta o seu produto e leva o cliente direto para o seu WhatsApp.",
    compra: "pelo WhatsApp",
    prazo: "até 2 semanas",
    ajustes: "1 vez",
    inclui: [
      "1 página pensada para o celular",
      "Botão de WhatsApp com a mensagem já escrita",
      "Preparada para aparecer no Google",
    ],
  },
  {
    id: "profissional",
    nome: "Profissional",
    preco: "2.700",
    mensalidade: "150",
    paraQue: "Um site com mais páginas, para o cliente confiar em você antes de comprar.",
    compra: "pelo WhatsApp",
    prazo: "cerca de 1 mês",
    ajustes: "2 vezes",
    inclui: [
      "Até 5 páginas: início, produtos, sobre você e contato",
      "Botão de WhatsApp e formulário de contato",
      "Preparado para aparecer no Google",
    ],
  },
  {
    id: "loja",
    nome: "Loja",
    preco: "6.400",
    mensalidade: "150",
    paraQue: "A mais completa: o cliente escolhe, paga no site e você só embala.",
    compra: "no site, com Pix ou cartão",
    prazo: "cerca de 2 meses",
    ajustes: "2 vezes",
    inclui: [
      "Painel para você cadastrar produtos, fotos e preços",
      "Pagamento pelo Mercado Pago e frete calculado pelo CEP",
      "Pedidos no painel, com aviso no seu WhatsApp",
    ],
    destaque: true,
  },
];

export function msgPlano(p: Plano) {
  return `Oi, André! Vi o site do Bispo Studio e quero um orçamento do plano ${p.nome} (a partir de R$ ${p.preco}).`;
}

export const MENSALIDADE = {
  valor: "150",
  cobre: ["Hospedagem", "Domínio", "Cópia de segurança", "Pequenas alterações: trocar foto, texto ou preço"],
  nota: "Você não precisa entender de servidor nem pagar hospedagem à parte. Nos planos sem painel, a troca de preço e foto é pedida ao André e já entra na mensalidade. No plano Loja, você mesmo troca pelo painel.",
};

export const PAGAMENTO =
  "50% de entrada para começar e 50% na entrega, com o site no ar. Depois disso segue a mensalidade, e eu continuo cuidando dele.";

export const PRECIFICA = {
  anual: "19,90",
  mensal: "29,90",
  msgAnual: "Oi, André! Quero assinar o Precifica 3D no plano de 12 meses (R$ 19,90 por mês).",
  msgMensal: "Oi, André! Quero assinar o Precifica 3D no plano mensal (R$ 29,90 por mês).",
  msgBonus: "Oi, André! Quero fechar um site com 12 meses de mensalidade e ganhar o Precifica 3D de bônus.",
};

export type Pergunta = { q: string; a: string };

export const FAQ: Pergunta[] = [
  {
    q: "A mensalidade é obrigatória?",
    a: "Sim. É ela que mantém o site no ar: hospedagem, domínio, cópia de segurança e as pequenas alterações do dia a dia, a partir de R$ 150 por mês.",
  },
  {
    q: "O domínio fica no meu nome?",
    a: "Fica. O endereço do seu site é registrado no seu nome, não no meu.",
  },
  {
    q: "Posso cancelar?",
    a: "Quando quiser. Se cancelar, o domínio vai com você.",
  },
  {
    q: "O Essencial aceita Pix ou cartão no site?",
    a: "Não. No Essencial e no Profissional o cliente fecha a compra com você pelo WhatsApp. Pix, cartão e frete calculado pelo CEP existem só no plano Loja.",
  },
  {
    q: "Como funciona o pagamento do site?",
    a: "50% de entrada para começar e 50% na entrega, com o site no ar. A mensalidade começa depois da entrega.",
  },
  {
    q: "Posso trocar preço e foto depois?",
    a: "Pode. Nos planos sem painel você me pede e a troca entra na mensalidade. No plano Loja você mesmo troca pelo painel, na hora.",
  },
  {
    q: "Por que o prazo é de semanas?",
    a: "Porque eu pego um projeto por vez. Quem responde a sua mensagem e quem faz o seu site é sempre eu.",
  },
  {
    q: "Quanto vai custar no final?",
    a: "Depende do que o seu negócio precisa. A conversa e o orçamento são grátis, e você recebe uma proposta por escrito com o que entra, o prazo e o valor. Nada de surpresa no meio do caminho.",
  },
  {
    q: "Como ganho o Precifica 3D de bônus?",
    a: "Fechando o site com 12 meses de mensalidade. Sem site, ele custa R$ 19,90 por mês no plano de 12 meses ou R$ 29,90 no mensal.",
  },
];

export const PROJETOS = [
  {
    id: "tcg",
    nome: "Bispo TCG",
    linhas: ["Bispo", "TCG"],
    tipo: "Loja com Pix, cartão e frete",
    url: "https://bispo-tcg.vercel.app",
    site: { src: "/portfolio/tcg-mob.webp", w: 780, h: 1688, alt: "Página inicial da loja Bispo TCG no celular, com a deck box do Luffy Gear 5 em destaque" },
    detalhe: { src: "/portfolio/tcg-luffy-gear5.webp", w: 1600, h: 1600, alt: "Deck box branca do Luffy Gear 5 impressa em 3D, com o desenho em relevo preto" },
    resumo: "Acessórios de card game impressos em 3D. Catálogo, 3D de cada produto, kits, pagamento pelo Mercado Pago e frete pelo SuperFrete.",
  },
  {
    id: "deco",
    nome: "Bispo Decorações",
    linhas: ["Bispo", "Decorações"],
    tipo: "Página de produto com 3D",
    url: "https://bispo-decoracoes.vercel.app",
    site: { src: "/portfolio/torsa-04-ambiente.webp", w: 900, h: 1125, alt: "Abajur Torsa aceso sobre um móvel, iluminando a parede" },
    detalhe: { src: "/portfolio/torsa-02-aceso.webp", w: 900, h: 1125, alt: "Abajur Torsa aceso, com a cúpula laranja torcida sobre a base preta" },
    resumo: "Abajures impressos em 3D. O Torsa gira em 3D na página e acende conforme você rola, com as fotos reais da peça.",
  },
] as const;
