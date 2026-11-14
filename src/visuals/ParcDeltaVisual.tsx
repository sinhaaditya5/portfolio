import type { CSSProperties } from 'react';
import { VisualFrame } from './VisualFrame';

const STAGES = [
  { k: 'Beam', v: '0.675 MeV p → ¹¹B' },
  { k: 'Fusion', v: 'p + ¹¹B → 3α' },
  { k: 'Slow-down', v: 'Coulomb MC' },
];

/** Alpha wall loss vs central field (fraction lost). */
const LOSS = [
  { k: '1 T', v: 0.76 },
  { k: '3 T', v: 0.001, top: true },
];

/** Mirror field-line envelope: narrow at the coils, wide at the centre. */
const line = (s: number) => {
  const pts: string[] = [];
  for (let x = 0; x <= 200; x += 5) {
    const y = 40 + s * (10 + 12 * Math.sin((x / 200) * Math.PI));
    pts.push(`${x ? 'L' : 'M'}${x} ${y.toFixed(1)}`);
  }
  return pts.join('');
};

export function ParcDeltaVisual() {
  return (
    <VisualFrame
      file="parc-delta · alpha channeling · fig.10"
      label="Proton–boron fusion produces three alphas that slow down in the plasma; a magnetic mirror confines them, with wall loss falling as the central field rises from 1 to 3 tesla"
    >
      {() => (
        <div className="ie pd">
          <div className="ie__col">
            <p className="ie__head">
              <span>01</span> Kinetics
            </p>
            <ul className="ie__sources">
              {STAGES.map((s, i) => (
                <li key={s.k} className="ie__source" style={{ animationDelay: `${i * 0.6}s` }}>
                  <div className="ie__source-top">
                    <b>{s.k}</b>
                  </div>
                  <span className="ie__sub">{s.v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="ie__col">
            <p className="ie__head">
              <span>02</span> Mirror · orbits
            </p>
            <svg className="pd__mirror" viewBox="0 0 200 80" aria-hidden="true">
              {[-1, -0.6, 0.6, 1].map((s) => (
                <path key={s} className="pd__field" d={line(s)} />
              ))}
              <rect className="pd__coil" x="0" y="8" width="10" height="12" rx="2" />
              <rect className="pd__coil" x="0" y="60" width="10" height="12" rx="2" />
              <rect className="pd__coil" x="190" y="8" width="10" height="12" rx="2" />
              <rect className="pd__coil" x="190" y="60" width="10" height="12" rx="2" />
              <path className="pd__orbit" pathLength={1} d="M40 40 C 60 22, 80 58, 100 40 S 140 22, 160 40 S 120 58, 100 40 S 60 22, 40 40" />
              <circle className="pd__target" cx="100" cy="40" r="2.5" />
            </svg>
            <p className="ie__model">
              <span className="dot" /> Boris pusher · 3 T
            </p>
          </div>

          <div className="ie__col">
            <p className="ie__head">
              <span>03</span> Wall loss vs B
            </p>
            <div className="ds__bars sj__bars pd__bars">
              {LOSS.map((b) => (
                <div key={b.k} className={`ds__bar ${b.top ? 'is-top' : ''}`}>
                  <span className="ds__bar-k">{b.k}</span>
                  <span className="ds__bar-track">
                    <span style={{ '--v': b.v } as CSSProperties} />
                  </span>
                </div>
              ))}
            </div>
            <p className="ie__sub">76% → 0.1% at the design point</p>
          </div>

          <div className="ie__insight">
            <span className="ie__insight-label">04 · PDX-1 ▸</span>
            <span className="ie__skel ie__skel--wide" />
            <span className="ie__chip">REBCO · 20 K</span>
            <span className="ie__caret" />
          </div>
        </div>
      )}
    </VisualFrame>
  );
}
