"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useSpring } from "motion/react";
import { brl, calcular, CANAIS } from "@/lib/precifica";
import styles from "./PrecificaDemo.module.css";

/** Número que desliza até o valor novo, com mola amortecida (nada de salto seco). */
function SpringValue({ value, className }: { value: number; className?: string }) {
  const reduce = useReducedMotion();
  const spring = useSpring(value, { stiffness: 140, damping: 22, mass: 0.8 });
  const [text, setText] = useState(brl(value));
  useEffect(() => {
    if (reduce) {
      spring.jump(value);
      setText(brl(value));
    } else spring.set(value);
  }, [value, reduce, spring]);
  useMotionValueEvent(spring, "change", (v) => setText(brl(v)));
  return <span className={className}>{text}</span>;
}

type Campo = {
  key: "pesoG" | "horas" | "precoKg" | "margem";
  label: string;
  min: number;
  max: number;
  step: number;
  fmt: (v: number) => string;
};

const CAMPOS: Campo[] = [
  { key: "pesoG", label: "Peso da peça", min: 5, max: 600, step: 5, fmt: (v) => `${v} g` },
  {
    key: "horas",
    label: "Tempo de impressão",
    min: 0.5,
    max: 24,
    step: 0.5,
    fmt: (v) => {
      const h = Math.floor(v);
      const m = Math.round((v - h) * 60);
      return h ? `${h}h${m ? ` ${m}min` : ""}` : `${m}min`;
    },
  },
  { key: "precoKg", label: "Filamento (preço do kg)", min: 60, max: 250, step: 5, fmt: (v) => brl(v) },
  { key: "margem", label: "Quanto quer ganhar", min: 5, max: 60, step: 1, fmt: (v) => `${v}%` },
];

export function PrecificaDemo({ tone = "onyx" }: { tone?: "onyx" | "indigo" }) {
  const id = useId();
  const [v, setV] = useState({ pesoG: 120, horas: 4.5, precoKg: 110, margem: 30 });
  const [canalId, setCanalId] = useState("direta");
  const canal = CANAIS.find((c) => c.id === canalId)!;
  const r = useMemo(() => calcular({ ...v, canal }), [v, canal]);
  const preco = r.preco ?? 0;

  const partes = [
    { nome: "Filamento", valor: r.filamento, cls: styles.sFil },
    { nome: "Energia", valor: r.energia, cls: styles.sEne },
    { nome: "Máquina", valor: r.maquina, cls: styles.sMaq },
    { nome: "Taxas do canal", valor: r.taxas, cls: styles.sTax },
    { nome: "Seu lucro", valor: r.lucro, cls: styles.sLuc },
  ];
  let acc = 0;

  return (
    <div className={`${styles.ui} ${tone === "indigo" ? styles.onIndigo : ""}`} data-ui>
      <div className={styles.top}>
        <span className={styles.app}>Precifica 3D</span>
        <span className={styles.note}>Exemplo com os padrões da ferramenta</span>
      </div>

      <div className={styles.canais} role="radiogroup" aria-label="Onde você vende">
        {CANAIS.map((c) => (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={c.id === canalId}
            className={styles.canal}
            data-on={c.id === canalId || undefined}
            onClick={() => setCanalId(c.id)}
          >
            {c.nome}
            <span className={styles.canalTaxa}>
              {c.comissaoPct ? `${c.comissaoPct}% + ${brl(c.taxaFixa)}` : "sem taxa"}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.campos}>
        {CAMPOS.map((c) => (
          <div className={styles.campo} key={c.key}>
            <div className={styles.campoHead}>
              <label htmlFor={`${id}-${c.key}`}>{c.label}</label>
              <output htmlFor={`${id}-${c.key}`} className="tnum">
                {c.fmt(v[c.key])}
              </output>
            </div>
            <input
              id={`${id}-${c.key}`}
              type="range"
              min={c.min}
              max={c.max}
              step={c.step}
              value={v[c.key]}
              style={{ ["--p" as string]: `${((v[c.key] - c.min) / (c.max - c.min)) * 100}%` }}
              onChange={(e) => setV((s) => ({ ...s, [c.key]: Number(e.target.value) }))}
            />
          </div>
        ))}
      </div>

      <div className={styles.result} aria-live="polite">
        <div className={styles.precoBox}>
          <span className={styles.precoLabel}>Preço de venda</span>
          <SpringValue value={preco} className={`${styles.preco} tnum`} />
        </div>
        <div className={styles.mini}>
          <span>
            Custo da peça <SpringValue value={r.custo} className="tnum" />
          </span>
          <span>
            Lucro <SpringValue value={r.lucro} className={`${styles.lucro} tnum`} />
          </span>
        </div>
      </div>

      <div className={styles.bar} aria-hidden="true">
        {partes.map((p) => {
          const w = preco > 0 ? Math.max(0, (p.valor / preco) * 100) : 0;
          const left = acc;
          acc += w;
          return (
            <span
              key={p.nome}
              className={`${styles.seg} ${p.cls}`}
              style={{ transform: `translateX(${left}%) scaleX(${w / 100})` }}
            />
          );
        })}
      </div>
      <ul className={styles.legend}>
        {partes.map((p) => (
          <li key={p.nome}>
            <span className={`${styles.dot} ${p.cls}`} aria-hidden="true" />
            {p.nome} <span className="tnum">{brl(p.valor)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
