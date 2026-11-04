import { PLANOS } from "@/lib/content";
import styles from "./CompareTable.module.css";

/** Os três planos lado a lado, nas mesmas linhas e na mesma ordem, com o prazo logo abaixo do preço. */
export function CompareTable({ caption = "Os três planos lado a lado" }: { caption?: string }) {
  const linhas: { rotulo: string; valor: (i: number) => React.ReactNode }[] = [
    { rotulo: "Preço", valor: (i) => <strong className="tnum">a partir de R$ {PLANOS[i].preco}</strong> },
    { rotulo: "Mensalidade", valor: (i) => <span className="tnum">+ a partir de R$ {PLANOS[i].mensalidade}/mês</span> },
    { rotulo: "Prazo", valor: (i) => PLANOS[i].prazo },
    { rotulo: "O cliente compra", valor: (i) => PLANOS[i].compra },
    { rotulo: "Pix, cartão e frete no site", valor: (i) => (PLANOS[i].id === "loja" ? "Sim" : "Não") },
    { rotulo: "Você pede mudanças antes da entrega", valor: (i) => PLANOS[i].ajustes },
  ];
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <caption className={styles.caption}>{caption}</caption>
        <thead>
          <tr>
            <td />
            {PLANOS.map((p) => (
              <th key={p.id} scope="col" data-destaque={p.destaque || undefined}>
                {p.nome}
                {p.destaque && <span className={styles.tag}>a mais completa</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((l) => (
            <tr key={l.rotulo}>
              <th scope="row">{l.rotulo}</th>
              {PLANOS.map((p, i) => (
                <td key={p.id} data-destaque={p.destaque || undefined}>
                  {l.valor(i)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
