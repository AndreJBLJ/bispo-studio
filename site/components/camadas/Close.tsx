import Link from "next/link";
import { MSG_ORCAMENTO, PROJETOS, WHATSAPP_LABEL, whatsappLink } from "@/lib/content";
import { ArrowIcon, WhatsIcon } from "@/components/shared/Icons";
import styles from "./Close.module.css";

export function Close({ other }: { other: { href: string; label: string } }) {
  return (
    <>
      <section className={styles.cta} aria-labelledby="cta-titulo">
        <h2 id="cta-titulo" className={styles.h2} data-print="12">
          Próxima peça:
          <br />
          a sua loja.
        </h2>
        <div className={styles.base}>
          <p className={styles.text}>
            A conversa e o orçamento são grátis. Você recebe uma proposta por escrito, com o que entra, o prazo e o
            valor. Nada de surpresa no meio do caminho.
          </p>
          <a className={`btn ${styles.btn}`} href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
            <WhatsIcon /> Chamar o André no WhatsApp <ArrowIcon className="btn-arrow" />
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.cols}>
          <div>
            <p className={styles.colHead}>Contato</p>
            <a href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
              WhatsApp {WHATSAPP_LABEL}
            </a>
            <p>Santo André, SP</p>
          </div>
          <div>
            <p className={styles.colHead}>Nesta página</p>
            <a href="#lojas">Lojas</a>
            <a href="#planos">Planos</a>
            <a href="#precifica">Precifica 3D</a>
            <a href="#duvidas">Dúvidas</a>
          </div>
          <div>
            <p className={styles.colHead}>Lojas no ar</p>
            {PROJETOS.map((p) => (
              <a key={p.id} href={p.url} target="_blank" rel="noopener">
                {p.nome}
              </a>
            ))}
          </div>
          <div>
            <p className={styles.colHead}>Outra versão</p>
            <Link href={other.href}>{other.label}</Link>
          </div>
        </div>
        <div className={styles.markBox} aria-hidden="true" data-print="16">
          <svg className={styles.mark} viewBox="0 0 1000 104" preserveAspectRatio="xMidYMax meet">
            <text x="0" y="102" textLength="1000" lengthAdjust="spacing">
              BISPO STUDIO
            </text>
          </svg>
        </div>
        <p className={styles.legal}>
          © 2026 Bispo Studio. Fotos e modelos 3D das lojas Bispo TCG e Bispo Decorações, do próprio André.
        </p>
      </footer>
    </>
  );
}
