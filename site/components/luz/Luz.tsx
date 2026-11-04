"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionRoot, reducedMotion } from "@/components/shared/Motion";
import { PrecificaDemo } from "@/components/shared/PrecificaDemo";
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
import s from "./luz.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Impressoras que revezam no centro do topo (public/impressoras/*-luz.webp, 1300 × 1625, fundo transparente,
 * apoiadas na base do quadro). Já saem iluminadas: tons de lilás, contraluz mint na borda direita e brilho suave.
 * Geradas a partir das fotos do dono com o script descrito em DESIGN.md; para trocar, mantenha o mesmo formato.
 */
const FOTOS_TOPO = [
  { src: "/impressoras/bambu-h3c-luz.webp", alt: "Impressora 3D Bambu Lab H3C com o sistema de filamentos no topo" },
  { src: "/impressoras/creality-k1c-luz.webp", alt: "Impressora 3D Creality K1C imprimindo uma peça" },
  { src: "/impressoras/bambu-a1-mini-luz.webp", alt: "Impressora 3D Bambu Lab A1 mini imprimindo um vaso" },
];

const Arrow = () => (
  <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true" className={s.arrow}>
    <path d="M1 7h19M14 1l6 6-6 6" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

/** Título no idioma da referência: palavras em caixa alta condensada e trechos em itálico serifado. */
function Title({
  parts,
  as: Tag = "h2",
  className,
  id,
}: {
  parts: ({ b: string } | { i: string })[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}) {
  return (
    <Tag className={`${s.title} ${className ?? ""}`} id={id} data-words>
      {parts.map((p, k) =>
        "b" in p ? (
          <span key={k} className={s.bMask}>
            <span className={s.b}>{p.b}</span>
          </span>
        ) : (
          <span key={k} className={s.i}>
            {p.i}
          </span>
        ),
      )}
    </Tag>
  );
}

function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={s.nav} data-solid={solid || undefined} data-open={open || undefined}>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <a href="#topo" className={s.logo} aria-label="Bispo Studio, voltar ao topo">
        <span className={s.logoName}>
          Bispo Studio<span className={s.dot}>.</span>
        </span>
        <span className={s.logoSub}>Sites para impressão 3D</span>
      </a>
      <nav aria-label="Seções" className={s.navMid}>
        <ul id="menu-luz" className={s.navLinks}>
          {[
            ["#lojas", "Lojas"],
            ["#planos", "Planos"],
            ["#precifica", "Precifica 3D"],
            ["#duvidas", "Dúvidas"],
          ].map(([h, l]) => (
            <li key={h}>
              <a href={h} onClick={() => setOpen(false)}>
                {l}
              </a>
            </li>
          ))}
          <li className={s.navMobileCta}>
            <a className={s.pill} href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
              Pedir orçamento <Arrow />
            </a>
          </li>
        </ul>
      </nav>
      <div className={s.navRight}>
        <a className={s.navWa} href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
          WhatsApp
        </a>
        <a className={s.pillLine} href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
          Pedir orçamento
        </a>
        <button type="button" className={s.menuBtn} aria-expanded={open} aria-controls="menu-luz" onClick={() => setOpen((o) => !o)}>
          {open ? "Fechar" : "Menu"}
        </button>
      </div>
    </header>
  );
}

function Subject({ fotos, interval = 4200, className }: { fotos: typeof FOTOS_TOPO; interval?: number; className?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const mx = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const x = useTransform(sx, [-0.5, 0.5], [-18, 18]);

  useEffect(() => {
    if (reduce || fotos.length < 2) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % fotos.length), interval);
    return () => window.clearInterval(t);
  }, [reduce, fotos.length, interval]);

  useEffect(() => {
    if (reduce) return;
    const on = (e: PointerEvent) => mx.set(e.clientX / window.innerWidth - 0.5);
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, [reduce, mx]);

  const f = fotos[i];
  return (
    <motion.div className={`${s.subject} ${className ?? ""}`} style={{ x }} aria-live="off">
      <AnimatePresence initial={false}>
        <motion.img
          key={f.src}
          src={f.src}
          alt={f.alt}
          className={s.subjectImg}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }}
          transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
        />
      </AnimatePresence>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className={s.hero} id="topo" aria-labelledby="titulo" data-light="hero">
      <Subject fotos={FOTOS_TOPO} />
      <h1 id="titulo" className={s.heroTitle} data-words>
        <span className={s.heroLeft}>
          <span className={s.bMask}>
            <span className={s.b}>Sites</span>
          </span>
          <span className={s.i}>para quem imprime</span>
        </span>
        <span className={s.heroRight}>
          <span className={s.bMask}>
            <span className={s.b}>e vende</span>
          </span>
          <span className={s.i}>peças em 3D</span>
        </span>
      </h1>

      <div className={s.heroCopy} data-hero-in>
        <p className={s.heroCaps}>
          Lojas e sites para o seu
          <br />
          negócio de impressão 3D.
        </p>
        <p className={s.heroSmall}>
          Do pedido pelo WhatsApp à loja com Pix e frete.
          <br />
          Feito por quem também vende peça impressa.
        </p>
        <a className={s.pill} href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
          Pedir orçamento <Arrow />
        </a>
      </div>

      <ul className={s.heroList} data-hero-in>
        <li>Orçamento grátis</li>
        <li>Proposta por escrito</li>
        <li>Um projeto por vez</li>
        <li>Domínio no seu nome</li>
      </ul>

      <div className={s.tools} data-hero-in>
        <p className={s.toolsLabel}>Testado nas minhas lojas com</p>
        <ul className={s.toolsRow}>
          <li>Mercado Pago</li>
          <li>Pix</li>
          <li>SuperFrete</li>
          <li>Vercel</li>
        </ul>
      </div>
    </section>
  );
}

function Lojas() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 960px)", () => {
      const track = trackRef.current!;
      const dist = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          pin: true,
          scrub: 0.6,
          start: "top top",
          end: () => `+=${dist()}`,
          invalidateOnRefresh: true,
        },
      });
      // Cada foto respira um pouco enquanto passa (parallax dentro do quadro).
      gsap.utils.toArray<HTMLElement>(`.${s.panelImg} img`).forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -6, scale: 1.12 },
          {
            xPercent: 6,
            scale: 1.12,
            ease: "none",
            scrollTrigger: { trigger: img, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="lojas" className={s.lojas} ref={rootRef} aria-labelledby="lojas-titulo" data-light="left">
      <div className={s.track} ref={trackRef}>
        <div className={`${s.panel} ${s.panelIntro}`}>
          <Title id="lojas-titulo" parts={[{ b: "As lojas" }, { i: "são minhas" }]} />
          <p className={s.lead}>
            Antes de oferecer qualquer coisa, eu testo nas minhas próprias lojas de impressão 3D. Estas duas estão no ar e
            vendendo.
          </p>
          <p className={`${s.capsSmall} ${s.sideHint}`} aria-hidden="true">
            Role para o lado <Arrow />
          </p>
        </div>

        {PROJETOS.map((p) => (
          <article key={p.id} className={`${s.panel} ${s.panelProj}`} aria-labelledby={`l-${p.id}`}>
            <div className={s.panelImg}>
              <img src={p.id === "tcg" ? "/portfolio/tcg-desk.webp" : "/portfolio/deco-desk.webp"} width={2160} height={1350} alt={`Página inicial da loja ${p.nome}`} loading="lazy" />
            </div>
            <div className={s.panelInfo}>
              <Title as="h3" id={`l-${p.id}`} className={s.titleMid} parts={[{ b: p.linhas[0] }, { i: p.linhas[1] }]} />
              <p className={s.capsSmall}>{p.tipo}</p>
              <p>{p.resumo}</p>
              <div className={s.panelFoot}>
                <img className={s.thumb} src={p.detalhe.src} width={p.detalhe.w} height={p.detalhe.h} alt={p.detalhe.alt} loading="lazy" />
                <a className={s.pillLine} href={p.url} target="_blank" rel="noopener">
                  Ver a loja no ar <Arrow />
                </a>
              </div>
            </div>
          </article>
        ))}

        <div className={`${s.panel} ${s.panelPieces}`}>
          <Title as="h3" className={s.titleMid} parts={[{ b: "Peças" }, { i: "que eu vendo" }]} />
          <ul className={s.piecesGrid}>
            {[
              ["/portfolio/tcg-zoro.webp", "Deck box One Piece, Zoro"],
              ["/portfolio/torsa-04-ambiente.webp", "Abajur Torsa aceso"],
              ["/portfolio/tcg-pantano.webp", "Deck box Magic, pântano"],
              ["/portfolio/torsa-06-trama-acesa.webp", "A trama do Torsa contra a luz"],
            ].map(([src, alt]) => (
              <li key={src}>
                <img src={src} alt={alt} loading="lazy" />
                <span>{alt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section className={s.sobre} aria-labelledby="sobre-titulo" data-light="center">
      <Title id="sobre-titulo" className={s.titleBig} parts={[{ b: "Eu também" }, { i: "vendo impressão 3D" }]} />
      <div className={s.sobreGrid} data-reveal>
        <p className={s.lead}>
          Sei o que é responder cliente no meio da impressão e perder venda porque a foto não mostrava a peça direito. Por
          isso pego um projeto por vez, e quem responde é sempre eu.
        </p>
        <ul className={s.lines}>
          <li>
            <span>Pix e cartão pelo Mercado Pago</span>
            <span>Bispo TCG</span>
          </li>
          <li>
            <span>Frete calculado pelo CEP</span>
            <span>Bispo TCG</span>
          </li>
          <li>
            <span>Painel para cadastrar produtos</span>
            <span>Bispo TCG</span>
          </li>
          <li>
            <span>Peça em 3D girando na página</span>
            <span>as duas</span>
          </li>
          <li>
            <span>Página pensada para o celular</span>
            <span>as duas</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Planos() {
  return (
    <section id="planos" className={s.planos} aria-labelledby="planos-titulo" data-light="right">
      <div className={s.secHead}>
        <Title id="planos-titulo" className={s.titleBig} parts={[{ b: "Planos" }, { i: "e preços" }]} />
        <p className={s.secHeadText}>
          Preços sempre a partir de: o valor final depende do que o seu negócio precisa. A conversa e o orçamento são grátis.
        </p>
      </div>
      <ul className={s.plans} data-reveal>
        {PLANOS.map((p) => (
          <li key={p.id} className={s.plan} data-destaque={p.destaque || undefined}>
            <div className={s.planTop}>
              <h3 className={s.planName}>{p.nome}</h3>
              {p.destaque && <span className={s.tag}>Mais completa</span>}
            </div>
            <p className={s.planFor}>{p.paraQue}</p>
            <p className={s.planPrice}>
              <span className={s.planFrom}>a partir de</span>
              <span className="tnum">R$ {p.preco}</span>
            </p>
            <ul className={s.planRows}>
              <li>
                <span>Mensalidade</span>
                <span className="tnum">a partir de R$ {p.mensalidade}</span>
              </li>
              <li>
                <span>Prazo</span>
                <span>{p.prazo}</span>
              </li>
              <li>
                <span>O cliente compra</span>
                <span>{p.compra}</span>
              </li>
              <li>
                <span>Você pede mudanças</span>
                <span>{p.ajustes}</span>
              </li>
            </ul>
            <ul className={s.planInc}>
              {p.inclui.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <a className={p.destaque ? s.pill : s.pillLine} href={whatsappLink(msgPlano(p))} target="_blank" rel="noopener">
              Quero o {p.nome} <Arrow />
            </a>
          </li>
        ))}
      </ul>
      <div className={s.terms} data-reveal>
        <div>
          <p className={s.termsBig}>A mensalidade cobre hospedagem, domínio, cópia de segurança e pequenas alterações.</p>
          <p className={s.muted}>{MENSALIDADE.nota}</p>
        </div>
        <div>
          <p className={s.termsBig}>Você paga 50% para começar e 50% com o site no ar.</p>
          <p className={s.muted}>{PAGAMENTO} Pix, cartão e frete pelo CEP existem só no plano Loja.</p>
        </div>
      </div>
    </section>
  );
}

function Precifica() {
  const ops = [
    { nome: "12 meses", preco: `R$ ${PRECIFICA.anual}/mês`, msg: PRECIFICA.msgAnual },
    { nome: "Mensal", preco: `R$ ${PRECIFICA.mensal}/mês`, msg: PRECIFICA.msgMensal },
    { nome: "De bônus", preco: "grátis com 12 meses de site", msg: PRECIFICA.msgBonus },
  ];
  return (
    <section id="precifica" className={s.precifica} aria-labelledby="precifica-titulo" data-light="mint">
      <div className={s.pText}>
        <Title id="precifica-titulo" className={s.titleMid} parts={[{ b: "Precifica 3D" }, { i: "pare de chutar preço" }]} />
        <p className={s.lead}>
          A minha calculadora para quem vende impressão 3D: soma filamento, energia, desgaste da impressora, falhas, mão de
          obra, embalagem e as taxas de cada canal, e mostra o preço certo para manter a mesma margem onde você vender.
        </p>
        <ul className={s.pOps} data-reveal>
          {ops.map((o) => (
            <li key={o.nome}>
              <a href={whatsappLink(o.msg)} target="_blank" rel="noopener">
                <span className={s.pOpName}>{o.nome}</span>
                <span className={s.pOpPrice}>{o.preco}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.pDemo} data-reveal>
        <div>
          <PrecificaDemo />
        </div>
      </div>
    </section>
  );
}

function Duvidas() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="duvidas" className={s.duvidas} aria-labelledby="duvidas-titulo" data-light="left">
      <div className={s.dSide}>
        <Title id="duvidas-titulo" className={s.titleBig} parts={[{ b: "Dúvidas" }, { i: "antes de chamar" }]} />
        <a className={s.pillLine} href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
          Perguntar no WhatsApp <Arrow />
        </a>
      </div>
      <div className={s.dList} data-reveal>
        {FAQ.map((f, i) => {
          const on = open === i;
          return (
            <div key={f.q} className={s.dItem} data-open={on || undefined}>
              <h3>
                <button type="button" aria-expanded={on} aria-controls={`lz-${i}`} id={`lzq-${i}`} onClick={() => setOpen(on ? null : i)}>
                  <span>{f.q}</span>
                  <span className={s.plus} aria-hidden="true" />
                </button>
              </h3>
              <div className={s.dA} id={`lz-${i}`} role="region" aria-labelledby={`lzq-${i}`} data-open={on || undefined}>
                <div>
                  <p>{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Fecho() {
  return (
    <>
      <section className={s.cta} aria-labelledby="cta-titulo" data-light="hero">
        <Subject fotos={[...FOTOS_TOPO].reverse()} interval={5200} className={s.ctaSubject} />
        <div className={s.ctaInner}>
          <Title id="cta-titulo" className={s.titleHuge} parts={[{ b: "Próxima peça" }, { i: "a sua loja" }]} />
          <p className={s.lead}>A conversa e o orçamento são grátis. Proposta por escrito, com o que entra, o prazo e o valor. Nada de surpresa no meio do caminho.</p>
          <a className={s.pill} href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
            Chamar no WhatsApp <Arrow />
          </a>
        </div>
      </section>
      <footer className={s.footer}>
        <div className={s.footTop}>
          <span className={s.logoName}>
            Bispo Studio<span className={s.dot}>.</span>
          </span>
          <ul className={s.footLinks}>
            <li>
              <a href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
                WhatsApp {WHATSAPP_LABEL}
              </a>
            </li>
            {PROJETOS.map((p) => (
              <li key={p.id}>
                <a href={p.url} target="_blank" rel="noopener">
                  {p.nome}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className={s.legal}>© 2026 Bispo Studio · Santo André, SP · Fotos das lojas Bispo TCG e Bispo Decorações, do próprio André.</p>
      </footer>
    </>
  );
}

/** A luz índigo que passeia atrás das seções: muda de lugar e de cor conforme a seção que entra. */
function Light() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion()) return;
    const el = ref.current!;
    const spots: Record<string, gsap.TweenVars> = {
      hero: { xPercent: 0, yPercent: -10, scale: 1.2, opacity: 0, "--c": "#6331fb" },
      left: { xPercent: -38, yPercent: 0, scale: 1, opacity: 0.85, "--c": "#6331fb" },
      right: { xPercent: 38, yPercent: 10, scale: 1.1, opacity: 0.8, "--c": "#6331fb" },
      center: { xPercent: 0, yPercent: 20, scale: 0.9, opacity: 0.7, "--c": "#5a2cf0" },
      mint: { xPercent: 30, yPercent: 0, scale: 1, opacity: 0.38, "--c": "#88f9c0" },
    };
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-light]").forEach((sec) => {
        const go = () => gsap.to(el, { ...spots[sec.dataset.light!], duration: 1.4, ease: "power3.inOut", overwrite: true });
        ScrollTrigger.create({ trigger: sec, start: "top 55%", end: "bottom 45%", onEnter: go, onEnterBack: go });
      });
    });
    return () => ctx.revert();
  }, []);
  return <div className={s.light} ref={ref} aria-hidden="true" />;
}

export function Luz() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Palavras dos títulos: as de caixa alta sobem de trás da linha, as em itálico chegam de lado desfocando.
  useEffect(() => {
    const root = rootRef.current!;
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const play = (t: Element, delay = 0) => {
        const tl = gsap.timeline({ delay });
        tl.fromTo(
          t.querySelectorAll(`.${s.b}`),
          { yPercent: 135 },
          { yPercent: 0, duration: 1.05, ease: "expo.out", stagger: 0.12 },
        ).fromTo(
          t.querySelectorAll(`.${s.i}`),
          { autoAlpha: 0, x: 48, filter: "blur(10px)" },
          { autoAlpha: 1, x: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out", stagger: 0.12, clearProps: "filter,transform" },
          0.18,
        );
      };
      const titles = gsap.utils.toArray<HTMLElement>("[data-words]", root);
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            io.unobserve(e.target);
            play(e.target);
          }),
        { rootMargin: "0px 0px -12% 0px" },
      );
      titles.forEach((t) => {
        if (t.closest(`.${s.hero}`)) return;
        gsap.set(t.querySelectorAll(`.${s.b}`), { yPercent: 135 });
        gsap.set(t.querySelectorAll(`.${s.i}`), { autoAlpha: 0 });
        io.observe(t);
      });
      const hero = root.querySelector(`.${s.hero} [data-words]`);
      if (hero) play(hero, 0.15);
      gsap.from(root.querySelectorAll("[data-hero-in]"), {
        autoAlpha: 0,
        y: 24,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.55,
        clearProps: "transform",
      });
      gsap.from(root.querySelector(`.${s.hero} .${s.subject}`), { autoAlpha: 0, scale: 1.08, duration: 1.6, ease: "expo.out" });
      return () => io.disconnect();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className={s.root} ref={rootRef}>
      <MotionRoot />
      <Light />
      <Nav />
      <main id="conteudo">
        <Hero />
        <Lojas />
        <Sobre />
        <Planos />
        <Precifica />
        <Duvidas />
      </main>
      <Fecho />
    </div>
  );
}
