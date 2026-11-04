import styles from "./About.module.css";

const FATOS = [
  { rotulo: "Projetos ao mesmo tempo", valor: "Um" },
  { rotulo: "Quem responde", valor: "Sempre o André" },
  { rotulo: "De onde", valor: "Santo André, SP" },
];

const TESTADO = [
  { nome: "Pix e cartão pelo Mercado Pago", onde: "Bispo TCG" },
  { nome: "Frete calculado pelo CEP", onde: "Bispo TCG" },
  { nome: "Painel para cadastrar produtos e fotos", onde: "Bispo TCG" },
  { nome: "Aviso de pedido no WhatsApp", onde: "Bispo TCG" },
  { nome: "Peça em 3D girando na página", onde: "as duas" },
  { nome: "Página pensada para o celular", onde: "as duas" },
];

const FERRAMENTAS = [
  { nome: "Next.js", onde: "o site" },
  { nome: "Vercel", onde: "hospedagem" },
  { nome: "Supabase", onde: "painel e banco" },
  { nome: "Mercado Pago", onde: "pagamento" },
  { nome: "SuperFrete", onde: "frete" },
  { nome: "Google", onde: "busca e prévia do link" },
];

export function About() {
  return (
    <section className={styles.about} aria-labelledby="sobre-titulo">
      <div className={styles.row} data-reveal>
        <div className={styles.side}>
          <h2 id="sobre-titulo" className={styles.h2}>
            Um projeto por vez
          </h2>
          <dl className={styles.facts}>
            {FATOS.map((f) => (
              <div key={f.rotulo}>
                <dt>{f.rotulo}</dt>
                <dd>{f.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className={styles.para}>
          Eu também vendo impressão 3D. Sei o que é perder venda porque a foto não mostrava a peça direito.
        </p>
      </div>

      <div className={styles.row} data-reveal>
        <p className={styles.word}>Testado nas minhas lojas</p>
        <div className={styles.lists}>
          <ul className={styles.list}>
            {TESTADO.map((t) => (
              <li key={t.nome}>
                <span>{t.nome}</span>
                <span className={styles.where}>{t.onde}</span>
              </li>
            ))}
          </ul>
          <ul className={styles.list} aria-label="Ferramentas">
            {FERRAMENTAS.map((t) => (
              <li key={t.nome}>
                <span>{t.nome}</span>
                <span className={styles.where}>{t.onde}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
