import type { CSSProperties } from 'react';
import { VisualFrame } from './VisualFrame';

const CLAIMS = [
  { k: 'R1 energy', tag: 'CALC', v: '17.6 Wh/kg' },
  { k: 'LFP pack price', tag: 'LIT', v: '$70/kWh' },
  { k: 'UPS temp rise', tag: 'SIM', v: '2.8 K' },
];

/** Cell energy against the founder's 360 Wh/kg target (scaled to the target). */
const ENERGY = [
  { k: 'Target', v: 1, top: true },
  { k: 'N08 P90', v: 292 / 360 },
  { k: 'N08 P50', v: 259 / 360 },
  { k: 'R1 block', v: 17.6 / 360 },
];

const GATES = [
  { k: 'Kit re-run', ok: true },
  { k: 'DFT voltages', ok: true },
  { k: '360 Wh/kg', ok: false },
  { k: '5-min charge', ok: false },
  { k: '$3 target', ok: false },
];

export function SaltBatteryVisual() {
  return (
    <VisualFrame
      file="salt-battery-lab · claims → verdict · fig.09"
      label="Evidence-tagged claims feed simulations; cell energy is compared against the 360 Wh/kg target; pass and fail gates roll up into a go/no-go verdict"
    >
      {() => (
        <div className="ie sb">
          <div className="ie__col">
            <p className="ie__head">
              <span>01</span> Claims ledger
            </p>
            <ul className="ie__sources">
              {CLAIMS.map((c, i) => (
                <li key={c.k} className="ie__source" style={{ animationDelay: `${i * 0.6}s` }}>
                  <div className="ie__source-top">
                    <b>{c.k}</b>
                    <span className="ie__score ie__score--pos">{c.tag}</span>
                  </div>
                  <span className="ie__sub">{c.v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="ie__col">
            <p className="ie__head">
              <span>02</span> Energy vs target
            </p>
            <div className="ds__bars sj__bars sb__bars">
              {ENERGY.map((b) => (
                <div key={b.k} className={`ds__bar ${b.top ? 'is-top' : ''}`}>
                  <span className="ds__bar-k">{b.k}</span>
                  <span className="ds__bar-track">
                    <span style={{ '--v': b.v } as CSSProperties} />
                  </span>
                </div>
              ))}
            </div>
            <p className="ie__model">
              <span className="dot" /> DFT+U · PyBaMM · TEA
            </p>
          </div>

          <div className="ie__col">
            <p className="ie__head">
              <span>03</span> Gates
            </p>
            <ul className="sb__gates">
              {GATES.map((g) => (
                <li key={g.k}>
                  <span>{g.k}</span>
                  <span className={`ie__score ${g.ok ? 'ie__score--pos' : 'ie__score--neg'}`}>{g.ok ? 'Pass' : 'Miss'}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="ie__insight">
            <span className="ie__insight-label">04 · Verdict ▸</span>
            <span className="ie__skel ie__skel--wide" />
            <span className="ie__chip">Test one lever</span>
            <span className="ie__caret" />
          </div>
        </div>
      )}
    </VisualFrame>
  );
}
