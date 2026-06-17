import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './PasswordGenerator.module.css';

/**
 * Example interactive tool, written in React/TSX.
 * Generates cryptographically random passwords with the Web Crypto API and
 * shows a live entropy estimate. Everything runs client-side.
 *
 * Use this as a template for your own tools:
 *   1. Copy this file to src/components/tools/YourTool.tsx
 *   2. Add a thin route at src/pages/tools/your-slug.astro
 *   3. Register it in src/config/tools.ts
 */

const SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  num: '0123456789',
  sym: '!@#$%^&*()-_=+[]{};:,.<>?',
} as const;

type SetKey = keyof typeof SETS;
const SET_KEYS: SetKey[] = ['lower', 'upper', 'num', 'sym'];
const SET_LABELS: Record<SetKey, string> = {
  lower: 'lowercase',
  upper: 'uppercase',
  num: 'numbers',
  sym: 'symbols',
};

const AMBIGUOUS = /[Il1O0o]/g;

/** Unbiased random index via rejection sampling on Web Crypto. */
function randomIndex(max: number): number {
  const limit = Math.floor(0xffffffff / max) * max;
  const buf = new Uint32Array(1);
  let x = 0;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}

function strengthOf(bits: number): { label: string; color: string; pct: number } {
  const pct = Math.min(100, (bits / 128) * 100);
  if (bits === 0) return { label: '—', color: 'var(--color-border)', pct: 0 };
  if (bits < 50) return { label: `weak · ${bits}b`, color: 'var(--color-primary)', pct };
  if (bits < 80) return { label: `ok · ${bits}b`, color: 'var(--color-warning)', pct };
  if (bits < 110) return { label: `strong · ${bits}b`, color: 'var(--color-secondary)', pct };
  return { label: `elite · ${bits}b`, color: 'var(--color-success)', pct };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [enabled, setEnabled] = useState<Record<SetKey, boolean>>({
    lower: true,
    upper: true,
    num: true,
    sym: true,
  });
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const pool = useMemo(() => {
    let p = '';
    for (const k of SET_KEYS) if (enabled[k]) p += SETS[k];
    if (avoidAmbiguous) p = p.replace(AMBIGUOUS, '');
    return p;
  }, [enabled, avoidAmbiguous]);

  const generate = useCallback(() => {
    if (!pool) {
      setPassword('');
      return;
    }
    let pw = '';
    for (let i = 0; i < length; i++) pw += pool[randomIndex(pool.length)];
    setPassword(pw);
  }, [pool, length]);

  // Regenerate whenever the inputs change.
  useEffect(() => {
    generate();
  }, [generate]);

  const bits = pool.length > 1 ? Math.round(length * Math.log2(pool.length)) : 0;
  const strength = strengthOf(bits);

  const copy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  return (
    <div className={`container ${styles.toolPage}`}>
      <header className={`${styles.pageHead} flow`}>
        <a href="/tools" className={styles.back}>
          ← all tools
        </a>
        <p className="kicker">// security</p>
        <h1>Password Generator</h1>
        <p className="muted">
          Cryptographically random passwords generated locally with the Web Crypto
          API. Nothing leaves your browser.
        </p>
      </header>

      <div className={`panel ${styles.tool}`}>
        <div className={styles.output}>
          <input
            className={styles.field}
            readOnly
            value={password}
            aria-label="Generated password"
          />
          <button className="btn btn--ghost" type="button" onClick={copy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            className={`btn ${styles.iconBtn}`}
            type="button"
            onClick={generate}
            aria-label="Regenerate"
          >
            ⟳
          </button>
        </div>

        <div className={styles.meter}>
          <div className={styles.bar}>
            <span
              className={styles.barFill}
              style={{ width: `${strength.pct}%`, background: strength.color }}
            />
          </div>
          <span className={styles.strength} style={{ color: strength.color }}>
            {strength.label}
          </span>
        </div>

        <div className={styles.controls}>
          <label className={styles.row}>
            <span>
              Length: <strong>{length}</strong>
            </span>
            <input
              className={styles.range}
              type="range"
              min={6}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </label>

          <div className={styles.toggles}>
            {SET_KEYS.map((k) => (
              <label className={styles.check} key={k}>
                <input
                  type="checkbox"
                  checked={enabled[k]}
                  onChange={(e) =>
                    setEnabled((prev) => ({ ...prev, [k]: e.target.checked }))
                  }
                />
                {SET_LABELS[k]}
              </label>
            ))}
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={avoidAmbiguous}
                onChange={(e) => setAvoidAmbiguous(e.target.checked)}
              />
              avoid ambiguous
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
