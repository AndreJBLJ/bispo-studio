"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PRECIFICA, whatsappLink } from "@/lib/content";
import { PrecificaDemo } from "@/components/shared/PrecificaDemo";
import { ArrowIcon } from "@/components/shared/Icons";
import styles from "./Precifica.module.css";

const OPCOES = [
  {
    id: "anual",
    tab: "12 meses",
    preco: `R$ ${PRECIFICA.anual}`,
    periodo: "por mês, no plano de 12 meses",
    acao: "Assinar por 12 meses",
    msg: PRECIFICA.msgAnual,
  },
  {
    id: "mensal",
    tab: "Mensal",
    preco: `R$ ${PRECIFICA.mensal}`,
    periodo: "por mês, pago mês a mês",
    acao: "Assinar o mensal",
    msg: PRECIFICA.msgMensal,
  },
  {
    id: "bonus",
    tab: "De bônus",
    preco: "Grátis",
    periodo: "para quem fecha o site com 12 meses de mensalidade",
    acao: "Quero o site com bônus",
    msg: PRECIFICA.msgBonus,
  },
] as const;

export function Precifica() {
  const [sel, setSel] = useState<(typeof OPCOES)[number]["id"]>("anual");
  const o = OPCOES.find((x) => x.id === sel)!;

  return (
    <section id="precifica" className={styles.section} aria-labelledby="precifica-titulo">
      <div className={styles.plate} data-reveal>
        <PrecificaDemo tone="indigo" />
      </div>

      <div className={styles.side}>
        <div className={styles.tabs} role="tablist" aria-label="Como ter o Precifica 3D">
          {OPCOES.map((x) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={x.id === sel}
              className={styles.tab}
              onClick={() => setSel(x.id)}
            >
              {x.tab}
            </button>
          ))}
        </div>

        <div className={styles.copy} data-reveal>
          <h2 id="precifica-titulo" className={styles.title}>
            Precifica 3D
          </h2>
          <p className={styles.desc}>
            A minha calculadora de preço para impressão 3D. Ela soma o custo real da peça (filamento, energia, desgaste
            da impressora, falhas, mão de obra, embalagem e taxas) e mostra o preço certo em cada canal de venda, com a
            mesma margem onde você vender. Mexa na calculadora ao lado: é a mesma conta.
          </p>
          <div className={styles.priceSlot} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                <span className={`${styles.price} tnum`}>{o.preco}</span>
                <span className={styles.period}>{o.periodo}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.cells}>
          <a className={`${styles.cell} ${styles.cellMain}`} href={whatsappLink(o.msg)} target="_blank" rel="noopener">
            {o.acao} <ArrowIcon className="btn-arrow" />
          </a>
          <a className={`${styles.cell} ${styles.cellAlt}`} href="#planos">
            Ver os planos de site
          </a>
        </div>
      </div>
    </section>
  );
}
