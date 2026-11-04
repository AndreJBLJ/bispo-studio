"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJETOS } from "@/lib/content";
import { reducedMotion } from "@/components/shared/Motion";
import { ArrowUpRight } from "@/components/shared/Icons";
import { TorsaPrint } from "./TorsaPrint";
import styles from "./Work.module.css";

/**
 * Cada loja ocupa a tela inteira, dividida ao meio: à esquerda o site no celular, à direita a peça.
 * O nome fica na costura e se rasga ao rolar: a metade esquerda sobe, a direita desce,
 * e as duas só se alinham quando a loja está no centro.
 */
export function Work() {
  const rootRef = useRef<HTMLElement>(null);
  const torsaProgress = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = reducedMotion();
      gsap.utils.toArray<HTMLElement>(`.${styles.project}`).forEach((proj) => {
        const left = proj.querySelector(`.${styles.paneL}`);
        const right = proj.querySelector(`.${styles.paneR}`);
        const isTorsa = proj.dataset.torsa === "1";
        if (reduce) {
          if (isTorsa) torsaProgress.current = 1;
          return;
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: proj,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (st) => {
              if (isTorsa) torsaProgress.current = gsap.utils.clamp(0, 1, (st.progress - 0.12) / 0.5);
            },
          },
        });
        // As duas metades entram desencontradas (uma sobe, a outra desce), se alinham no meio e se separam na saída.
        const card = proj.querySelector(`.${styles.plateCard}`);
        tl.fromTo(left, { yPercent: 9 }, { yPercent: 0, duration: 0.38 }, 0)
          .fromTo(right, { yPercent: -9 }, { yPercent: 0, duration: 0.38 }, 0)
          .fromTo(card, { y: "12svh", autoAlpha: 0.0 }, { y: 0, autoAlpha: 1, duration: 0.3 }, 0.06)
          .to({}, { duration: 0.24 })
          .to(left, { yPercent: -9, duration: 0.38 }, 0.62)
          .to(right, { yPercent: 9, duration: 0.38 }, 0.62);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="lojas" className={styles.work} ref={rootRef} aria-labelledby="lojas-titulo">
      <div className={styles.head} data-reveal>
        <h2 id="lojas-titulo" className={styles.h2} data-print="10">
          As lojas são minhas
        </h2>
        <p className={styles.headText}>
          Antes de oferecer qualquer coisa para você, eu testo nas minhas próprias lojas de impressão 3D.
          Estas duas estão no ar e vendendo.
        </p>
      </div>

      {PROJETOS.map((p) => {
        const torsa = p.id === "deco";
        return (
          <article key={p.id} className={styles.project} data-torsa={torsa ? "1" : undefined} aria-labelledby={`p-${p.id}`}>
            <div className={styles.stage}>
              <div className={styles.paneWrap}>
                <figure className={`${styles.pane} ${styles.paneL}`}>
                  <img src={p.site.src} width={p.site.w} height={p.site.h} alt={p.site.alt} loading="lazy" />
                </figure>
              </div>
              <div className={`${styles.paneWrap} ${torsa ? styles.paneIndigo : ""}`}>
                <figure className={`${styles.pane} ${styles.paneR}`}>
                  {torsa ? (
                    <>
                      <TorsaPrint progress={torsaProgress} />
                      <figcaption className="sr-only">
                        Modelo 3D do abajur Torsa sendo impresso camada por camada e acendendo no fim.
                      </figcaption>
                    </>
                  ) : (
                    <img src={p.detalhe.src} width={p.detalhe.w} height={p.detalhe.h} alt={p.detalhe.alt} loading="lazy" />
                  )}
                </figure>
              </div>

              <div className={styles.titleBox}>
                <div className={styles.plateCard}>
                  <h3 id={`p-${p.id}`} className={styles.title}>
                    {p.linhas[0]}
                    <br />
                    {p.linhas[1]}
                  </h3>
                  <p className={styles.meta}>{p.tipo}</p>
                  <p className={styles.resumo}>{p.resumo}</p>
                  <a className={styles.visit} href={p.url} target="_blank" rel="noopener">
                    Ver a loja no ar <ArrowUpRight />
                  </a>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
