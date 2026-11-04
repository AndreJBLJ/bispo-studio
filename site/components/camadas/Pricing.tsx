"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MENSALIDADE, PAGAMENTO, PLANOS, msgPlano, whatsappLink, type Plano } from "@/lib/content";
import { CompareTable } from "@/components/shared/CompareTable";
import { ArrowIcon } from "@/components/shared/Icons";
import styles from "./Pricing.module.css";

function Stage({ p, inline }: { p: Plano; inline?: boolean }) {
  return (
    <div className={styles.stageInner}>
      <p className={styles.priceRow}>
        <span className={`${styles.price} tnum`}>
          <span className={styles.cur}>R$</span>
          {p.preco}
        </span>
        <span className={styles.from}>a partir de</span>
      </p>
      <p className={`${styles.monthly} tnum`}>+ mensalidade a partir de R$ {p.mensalidade}/mês</p>
      <dl className={styles.specs}>
        <div>
          <dt>Prazo</dt>
          <dd>{p.prazo}</dd>
        </div>
        <div>
          <dt>O cliente compra</dt>
          <dd>{p.compra}</dd>
        </div>
        <div>
          <dt>Você pede mudanças</dt>
          <dd>{p.ajustes} antes da entrega</dd>
        </div>
      </dl>
      <p className={styles.paraQue}>{p.paraQue}</p>
      <ul className={styles.inclui}>
        {p.inclui.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <a
        className={`btn ${styles.cta}`}
        href={whatsappLink(msgPlano(p))}
        target="_blank"
        rel="noopener"
        data-inline={inline || undefined}
      >
        Quero o plano {p.nome} <ArrowIcon className="btn-arrow" />
      </a>
    </div>
  );
}

export function Pricing() {
  const [sel, setSel] = useState<Plano["id"]>("loja");
  const plano = PLANOS.find((p) => p.id === sel)!;
  const reduce = useReducedMotion();

  return (
    <section id="planos" className={styles.pricing} aria-labelledby="planos-titulo">
      <h2 id="planos-titulo" className={styles.h2} data-print="8">
        Planos e preços
      </h2>

      <div className={styles.grid}>
        <div className={styles.names} role="tablist" aria-label="Planos" aria-orientation="vertical">
          {PLANOS.map((p) => (
            <div key={p.id} className={styles.nameRow}>
              <button
                type="button"
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={p.id === sel}
                aria-controls="plano-palco"
                className={styles.name}
                onClick={() => setSel(p.id)}
                onFocus={() => setSel(p.id)}
              >
                <span className={styles.dot} aria-hidden="true" />
                {p.nome}
                {p.destaque && <span className={styles.flag}>a mais completa</span>}
              </button>
              {p.id === sel && (
                <div className={styles.inlineStage}>
                  <Stage p={p} inline />
                </div>
              )}
            </div>
          ))}
          <p className={styles.namesNote}>
            Preços sempre a partir de: o valor final depende do que o seu negócio precisa. A conversa e o orçamento são
            grátis.
          </p>
        </div>

        <div className={styles.stage} id="plano-palco" role="tabpanel" aria-labelledby={`tab-${sel}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={plano.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <Stage p={plano} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className={styles.below}>
        <div className={styles.monthlyBox} data-reveal>
          <h3 className={styles.h3}>O que a mensalidade cobre</h3>
          <ul className={styles.covers}>
            {MENSALIDADE.cobre.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p>{MENSALIDADE.nota}</p>
        </div>
        <div className={styles.monthlyBox} data-reveal>
          <h3 className={styles.h3}>Como você paga</h3>
          <p>{PAGAMENTO}</p>
          <p className={styles.bonus}>
            Fechou o site com 12 meses de mensalidade? O <a href="#precifica">Precifica 3D</a> vem de bônus.
          </p>
        </div>
      </div>

      <div className={styles.table} data-reveal>
        <CompareTable />
      </div>
    </section>
  );
}
