// Mesma fórmula do Precifica 3D (função calc de precifica-3d.html), reduzida aos campos da demo.
// Padrões da ferramenta: impressora de 60 W, tarifa de R$ 0,95/kWh, depreciação de R$ 0,20 por hora.

export type Canal = { id: string; nome: string; comissaoPct: number; taxaFixa: number };

export const CANAIS: Canal[] = [
  { id: "direta", nome: "Venda direta", comissaoPct: 0, taxaFixa: 0 },
  { id: "marketplace", nome: "Marketplace", comissaoPct: 20, taxaFixa: 4 },
];

export const CONFIG = { potencia: 60, tarifa: 0.95, depreciacao: 0.2 };

export type Entrada = {
  pesoG: number;
  horas: number;
  precoKg: number;
  margem: number;
  canal: Canal;
};

export function calcular(e: Entrada) {
  const filamento = (e.precoKg / 1000) * e.pesoG;
  const energia = ((e.horas * CONFIG.potencia) / 1000) * CONFIG.tarifa;
  const maquina = e.horas * CONFIG.depreciacao;
  const custo = filamento + energia + maquina;
  const c = e.canal.comissaoPct / 100;
  const m = e.margem / 100;
  const fator = 1 - c - m;
  const preco = fator > 0 ? (custo + e.canal.taxaFixa) / fator : null;
  const taxas = preco != null ? preco * c + e.canal.taxaFixa : 0;
  const lucro = preco != null ? preco - custo - taxas : 0;
  return { filamento, energia, maquina, custo, taxas, lucro, preco };
}

const fBRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const brl = (v: number) => fBRL.format(Math.abs(v) < 0.005 ? 0 : v);
