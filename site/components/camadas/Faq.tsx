import { FAQ } from "@/lib/content";
import { Chevron } from "@/components/shared/Icons";
import styles from "./Faq.module.css";

export function Faq() {
  return (
    <section id="duvidas" className={styles.faq} aria-labelledby="duvidas-titulo">
      <h2 id="duvidas-titulo" className={styles.h2} data-print="10">
        Antes de você perguntar
      </h2>
      <div className={styles.list} data-reveal>
        {FAQ.map((f) => (
          <details key={f.q} className={styles.item}>
            <summary className={styles.q}>
              <span>{f.q}</span>
              <Chevron className={styles.chev} />
            </summary>
            <div className={styles.a}>
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
