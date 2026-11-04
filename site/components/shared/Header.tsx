"use client";

import { useEffect, useState } from "react";
import { MSG_ORCAMENTO, whatsappLink } from "@/lib/content";
import styles from "./Header.module.css";

const LINKS = [
  { href: "#lojas", label: "Lojas" },
  { href: "#planos", label: "Planos" },
  { href: "#precifica", label: "Precifica 3D" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header className={styles.bar} data-solid={solid || undefined} data-open={open || undefined}>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <a className={styles.brand} href="#topo" aria-label="Bispo Studio, voltar ao topo">
        <BrandMark />
        <span>Bispo Studio</span>
      </a>

      <nav className={styles.nav} aria-label="Seções">
        <ul id="menu" className={styles.links}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li className={styles.menuCta}>
            <a className="btn" href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
              Pedir orçamento
            </a>
          </li>
        </ul>
        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </nav>
    </header>
  );
}

/** Marca do estúdio: três camadas empilhadas, a de cima em mint. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <rect x="1" y="15" width="20" height="5" fill="var(--indigo)" />
      <rect x="3" y="8.5" width="16" height="5" fill="var(--ink)" />
      <rect x="6" y="2" width="10" height="5" fill="var(--mint)" />
    </svg>
  );
}
