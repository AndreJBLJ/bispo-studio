"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { reducedMotion } from "@/components/shared/Motion";
import styles from "./Pieces.module.css";

const PECAS = [
  { src: "/portfolio/tcg-mana.webp", w: 1600, h: 1600, nome: "Deck box Magic, mana preta", loja: "Bispo TCG" },
  { src: "/portfolio/torsa-01-desligado.webp", w: 900, h: 1125, nome: "Abajur Torsa desligado", loja: "Bispo Decorações" },
  { src: "/portfolio/tcg-zoro.webp", w: 1600, h: 1600, nome: "Deck box One Piece, Zoro", loja: "Bispo TCG" },
  { src: "/portfolio/torsa-06-trama-acesa.webp", w: 640, h: 800, nome: "A trama do Torsa contra a luz", loja: "Bispo Decorações" },
  { src: "/portfolio/tcg-pantano.webp", w: 1600, h: 1600, nome: "Deck box Magic, terreno pântano", loja: "Bispo TCG" },
  { src: "/portfolio/tcg-contador.webp", w: 1448, h: 1086, nome: "Contador de poder One Piece", loja: "Bispo TCG" },
];

/** Uma fileira de peças reais das duas lojas que corre de lado enquanto a página desce. */
export function Pieces() {
  const rowRef = useRef<HTMLUListElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion() || window.matchMedia("(max-width: 759px)").matches) return;
    const ctx = gsap.context(() => {
      const row = rowRef.current!;
      gsap.fromTo(
        row,
        { x: 0 },
        {
          x: () => -(row.scrollWidth - row.parentElement!.clientWidth),
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.pieces} ref={rootRef} aria-labelledby="pecas-titulo">
      <div className={styles.head} data-reveal>
        <h2 id="pecas-titulo" className={styles.h2}>
          Peças que eu vendo
        </h2>
        <p className={styles.text}>
          Fotos reais das peças que essas lojas vendem. É o mesmo cuidado que vai para o seu site: a peça
          aparece inteira, grande, do jeito que o cliente vai receber.
        </p>
      </div>
      <div className={styles.clip}>
      <ul className={styles.row} ref={rowRef}>
        {PECAS.map((p) => (
          <li key={p.src} className={styles.item}>
            <figure>
              <div className={styles.frame}>
                <img src={p.src} width={p.w} height={p.h} alt={p.nome} loading="lazy" />
              </div>
              <figcaption>
                <span>{p.nome}</span> <span className={styles.loja}>{p.loja}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
