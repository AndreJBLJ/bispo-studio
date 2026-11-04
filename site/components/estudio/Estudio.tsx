"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import {
  FAQ,
  MENSALIDADE,
  MSG_ORCAMENTO,
  PAGAMENTO,
  PLANOS,
  PRECIFICA,
  PROJETOS,
  WHATSAPP_LABEL,
  msgPlano,
  whatsappLink,
} from "@/lib/content";
import { PrecificaDemo } from "@/components/shared/PrecificaDemo";
import { BrandMark } from "@/components/shared/Header";
import { ArrowIcon, ArrowUpRight, Chevron, WhatsIcon } from "@/components/shared/Icons";
import styles from "./Estudio.module.css";


/** Entrada das partes de uma seção, uma depois da outra (o MotionRoot cuida de [data-reveal]). */
function Reveal({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "ul" }) {
  const C = as;
  return (
    <C className={className} data-reveal>
      {children}
    </C>
  );
}
function R({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

const DETALHES: Record<string, string[]> = {
  tcg: [
    "Catálogo com categorias e destaques",
    "Modelo 3D de cada produto na página",
    "Pagamento por Pix ou cartão (Mercado Pago)",
    "Frete calculado pelo CEP (SuperFrete)",
    "Painel para cadastrar produtos e ver pedidos",
  ],
  deco: [
    "Página de produto com o abajur em 3D",
    "O Torsa acende conforme o visitante rola",
    "Fotos reais da peça, grandes",
    "Pensada primeiro para o celular",
  ],
};

const LONGA: Record<string, { src: string; h: number }> = {
  tcg: { src: "/portfolio/tcg-desk-long.webp", h: 4200 },
  deco: { src: "/portfolio/deco-desk-long.webp", h: 3392 },
};

function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-5, 5]);
  const rotX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const phoneX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const phoneY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  return (
    <div
      className={styles.visual}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.figure
        className={`${styles.desk} ${styles.rise}`}
        style={reduce ? undefined : { rotateX: rotX, rotateY: rotY }}
      >
        <img src="/portfolio/tcg-desk.webp" width={2160} height={1350} alt="Página inicial da loja Bispo TCG no computador" />
      </motion.figure>
      <motion.figure
        className={`${styles.phone} ${styles.rise}`}
        style={reduce ? undefined : { x: phoneX, y: phoneY }}
      >
        <img src="/portfolio/deco-mob.webp" width={780} height={1688} alt="Página do abajur Torsa, da Bispo Decorações, no celular" />
      </motion.figure>
      <motion.figure
        className={`${styles.piece} ${styles.rise}`}
      >
        <img src="/portfolio/tcg-luffy-gear5.webp" width={1600} height={1600} alt="Deck box do Luffy Gear 5 impressa em 3D" />
      </motion.figure>
    </div>
  );
}

function PrecificaOpcoes() {
  const ops = [
    { id: "bonus", nome: "De bônus", preco: "Grátis", obs: "com o site e 12 meses de mensalidade", msg: PRECIFICA.msgBonus },
    { id: "anual", nome: "12 meses", preco: `R$ ${PRECIFICA.anual}/mês`, obs: "plano de 12 meses", msg: PRECIFICA.msgAnual },
    { id: "mensal", nome: "Mensal", preco: `R$ ${PRECIFICA.mensal}/mês`, obs: "pago mês a mês", msg: PRECIFICA.msgMensal },
  ];
  return (
    <ul className={styles.pOps}>
      {ops.map((o) => (
        <li key={o.id}>
          <a href={whatsappLink(o.msg)} target="_blank" rel="noopener" className={styles.pOp} data-bonus={o.id === "bonus" || undefined}>
            <span className={styles.pOpNome}>{o.nome}</span>
            <span className={`${styles.pOpPreco} tnum`}>{o.preco}</span>
            <span className={styles.pOpObs}>{o.obs}</span>
            <ArrowIcon className={styles.pOpArrow} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={styles.faqList}>
      {FAQ.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} className={styles.faqItem} data-open={on || undefined}>
            <h3>
              <button
                type="button"
                className={styles.faqQ}
                aria-expanded={on}
                aria-controls={`faq-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(on ? null : i)}
              >
                {f.q}
                <Chevron className={styles.faqChev} />
              </button>
            </h3>
            <div className={styles.faqA} id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!on}>
              <p>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Estudio() {
  const shotRefs = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <>
      <main id="conteudo" className={styles.page}>
        <div id="topo" />
        <section className={styles.hero} aria-labelledby="titulo">
          <div className={styles.heroText}>
            <h1 id="titulo" className={`${styles.h1} ${styles.rise}`}>
              Sites para quem vende impressão 3D
            </h1>
            <p className={`${styles.heroSub} ${styles.rise}`} style={{ animationDelay: "80ms" }}>
              Da página que leva ao WhatsApp até a loja com Pix, cartão e frete pelo CEP. Feito pelo André, que também
              vende peça impressa e testa tudo nas próprias lojas.
            </p>
            <div className={`${styles.heroActions} ${styles.rise}`} style={{ animationDelay: "160ms" }}>
              <a className="btn" href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
                Pedir orçamento no WhatsApp <ArrowIcon className="btn-arrow" />
              </a>
              <a className="btn btn--ghost" href="#planos">
                Ver planos e preços
              </a>
            </div>
            <p className={`${styles.heroNote} ${styles.rise}`} style={{ animationDelay: "240ms" }}>
              A partir de R$ 1.100 + mensalidade a partir de R$ 150. Orçamento grátis.
            </p>
          </div>
          <HeroVisual />
        </section>

        <section className={styles.proof} aria-labelledby="prova-titulo">
          <Reveal className={styles.proofInner}>
            <R>
              <h2 id="prova-titulo" className={styles.proofTitle}>
                Tudo testado nas minhas lojas antes de chegar na sua
              </h2>
            </R>
            <R className={styles.proofList}>
              <span>Pix e cartão</span>
              <span>Frete pelo CEP</span>
              <span>Peça em 3D na página</span>
              <span>Painel de produtos</span>
              <span>Aviso de pedido no WhatsApp</span>
            </R>
          </Reveal>
        </section>

        <section id="lojas" className={styles.section} aria-labelledby="lojas-titulo">
          <Reveal className={styles.sectionHead}>
            <R>
              <h2 id="lojas-titulo" className={styles.h2}>
                Lojas no ar
              </h2>
            </R>
            <R>
              <p className={styles.sectionText}>
                As duas são minhas e vendem impressão 3D de verdade. Passe o mouse na tela para ver a página inteira.
              </p>
            </R>
          </Reveal>

          <div className={styles.projects}>
            {PROJETOS.map((p, i) => (
              <Reveal key={p.id} className={styles.project}>
                <R className={`${styles.shot} ${i % 2 ? styles.shotRight : ""}`}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    className={styles.shotLink}
                    aria-label={`Abrir a loja ${p.nome}`}
                    onPointerEnter={() => {
                      const el = shotRefs.current[p.id];
                      if (el) el.dataset.scroll = "1";
                    }}
                    onPointerLeave={() => {
                      const el = shotRefs.current[p.id];
                      if (el) delete el.dataset.scroll;
                    }}
                  >
                    <div className={styles.shotScroll} ref={(el) => void (shotRefs.current[p.id] = el)}>
                      <img src={LONGA[p.id].src} width={2160} height={LONGA[p.id].h} alt={`Página inicial da loja ${p.nome}`} loading="lazy" />
                    </div>
                  </a>
                </R>
                <R className={styles.projectText}>
                  <h3 className={styles.h3}>{p.nome}</h3>
                  <p className={styles.projectType}>{p.tipo}</p>
                  <p>{p.resumo}</p>
                  <ul className={styles.checks}>
                    {DETALHES[p.id].map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <div className={styles.projectFoot}>
                    <img className={styles.projectPhoto} src={p.detalhe.src} width={p.detalhe.w} height={p.detalhe.h} alt={p.detalhe.alt} loading="lazy" />
                    <a className={styles.visit} href={p.url} target="_blank" rel="noopener">
                      Ver a loja <ArrowUpRight />
                    </a>
                  </div>
                </R>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="planos" className={styles.section} aria-labelledby="planos-titulo">
          <Reveal className={styles.sectionHead}>
            <R>
              <h2 id="planos-titulo" className={styles.h2}>
                Planos e preços
              </h2>
            </R>
            <R>
              <p className={styles.sectionText}>
                Preços sempre a partir de: o valor final depende do que o seu negócio precisa. A conversa e o orçamento
                são grátis, e a proposta vem por escrito.
              </p>
            </R>
          </Reveal>

          <Reveal as="ul" className={styles.plans}>
            {PLANOS.map((p) => (
              <li key={p.id} className={styles.plan} data-destaque={p.destaque || undefined}>
                <div className={styles.planHead}>
                  <h3 className={styles.planName}>{p.nome}</h3>
                  {p.destaque && <span className={styles.planFlag}>A mais completa</span>}
                </div>
                <p className={styles.planFor}>{p.paraQue}</p>
                <p className={styles.planPrice}>
                  <span className={`${styles.planValue} tnum`}>R$ {p.preco}</span>
                  <span className={styles.planFrom}>a partir de</span>
                  <span className={`${styles.planMonthly} tnum`}>+ mensalidade a partir de R$ {p.mensalidade}/mês</span>
                </p>
                <dl className={styles.planSpecs}>
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
                <ul className={styles.checks}>
                  {p.inclui.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <a
                  className={`btn ${p.destaque ? "" : "btn--ghost"} ${styles.planCta}`}
                  href={whatsappLink(msgPlano(p))}
                  target="_blank"
                  rel="noopener"
                >
                  Quero o {p.nome} <ArrowIcon className="btn-arrow" />
                </a>
              </li>
            ))}
          </Reveal>

          <Reveal className={styles.terms}>
            <R className={styles.term}>
              <h3 className={styles.termTitle}>A mensalidade cobre</h3>
              <ul className={styles.checks}>
                {MENSALIDADE.cobre.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className={styles.muted}>{MENSALIDADE.nota}</p>
            </R>
            <R className={styles.term}>
              <h3 className={styles.termTitle}>Como você paga</h3>
              <p>{PAGAMENTO}</p>
              <p className={styles.muted}>Pix, cartão e frete calculado pelo CEP existem só no plano Loja.</p>
            </R>
          </Reveal>
        </section>

        <section id="precifica" className={styles.precifica} aria-labelledby="precifica-titulo">
          <Reveal className={styles.pText}>
            <R>
              <h2 id="precifica-titulo" className={styles.h2}>
                Precifica 3D
              </h2>
            </R>
            <R>
              <p className={styles.pLead}>Pare de chutar preço. Saiba o custo real da peça e quanto você ganha em cada canal.</p>
            </R>
            <R>
              <p>
                A minha calculadora para quem vende impressão 3D soma filamento, energia, desgaste da impressora, falhas,
                mão de obra, embalagem e as taxas de cada canal de venda, e mostra o preço certo para manter a mesma margem
                onde você vender. Experimente ao lado: é a mesma conta.
              </p>
            </R>
            <R>
              <PrecificaOpcoes />
            </R>
          </Reveal>
          <div className={styles.pDemo} data-reveal>
            <div>
            <PrecificaDemo />
            </div>
          </div>
        </section>

        <section id="duvidas" className={styles.section} aria-labelledby="duvidas-titulo">
          <div className={styles.faq}>
            <Reveal className={styles.faqSide}>
              <R>
                <h2 id="duvidas-titulo" className={styles.h2}>
                  Dúvidas frequentes
                </h2>
              </R>
              <R>
                <p className={styles.sectionText}>Não achou a sua? Pergunte direto para mim, eu respondo pessoalmente.</p>
              </R>
              <R>
                <a className="btn btn--ghost" href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
                  <WhatsIcon /> Perguntar no WhatsApp
                </a>
              </R>
            </Reveal>
            <Faq />
          </div>
        </section>
      </main>

      <section className={styles.cta} aria-labelledby="cta-titulo">
        <Reveal className={styles.ctaInner}>
          <R>
            <h2 id="cta-titulo" className={styles.ctaTitle}>
              Vamos colocar a sua loja no ar?
            </h2>
          </R>
          <R>
            <p className={styles.ctaText}>
              A conversa e o orçamento são grátis. Proposta por escrito, com o que entra, o prazo e o valor.
            </p>
          </R>
          <R>
            <a className="btn" href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
              <WhatsIcon /> Chamar no WhatsApp <ArrowIcon className="btn-arrow" />
            </a>
          </R>
        </Reveal>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footBrand}>
          <BrandMark />
          <span>Bispo Studio</span>
        </div>
        <p className={styles.muted}>Sites e lojas para quem vende impressão 3D. Santo André, SP.</p>
        <div className={styles.footLinks}>
          <a href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
            WhatsApp {WHATSAPP_LABEL}
          </a>
          {PROJETOS.map((p) => (
            <a key={p.id} href={p.url} target="_blank" rel="noopener">
              {p.nome}
            </a>
          ))}
          <Link href="/">Ver a versão Camada por camada</Link>
        </div>
        <p className={styles.legal}>© 2026 Bispo Studio. Fotos e modelos 3D das lojas Bispo TCG e Bispo Decorações, do próprio André.</p>
      </footer>
    </>
  );
}
