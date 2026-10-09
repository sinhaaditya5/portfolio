import { ArrowUpRight, GitHub } from '../components/Icons';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';
import { kaggleProfile, kaggleProjects } from '../content/kaggle';
import './kaggle.css';

export function Kaggle() {
  return (
    <section className="section kaggle" id="kaggle" aria-labelledby="kaggle-title">
      <div className="container">
        <SectionHead
          index="10"
          label="Kaggle / Applied Research"
          id="kaggle-title"
          title={['Competing', <span className="outline" key="k">in public.</span>]}
          lede="Competition work with the process kept visible: validation strategy, baselines and honest scores, including what hasn’t worked yet."
        />

        <div className="kgl">
          {kaggleProjects.map((p, i) => (
            <Reveal as="article" className="kgl__card" key={p.id} i={i} aria-labelledby={`kgl-${p.id}`}>
              <header className="kgl__head">
                <span className="label label--lime">{p.id}</span>
                <span className="label">{p.kind}</span>
              </header>
              <h3 className="kgl__title" id={`kgl-${p.id}`}>
                {p.title}
              </h3>
              <p className="kgl__task">{p.task}</p>
              <dl className="kgl__fields">
                <div>
                  <dt className="label">Metric</dt>
                  <dd>{p.metric}</dd>
                </div>
                <div>
                  <dt className="label">Approach</dt>
                  <dd>{p.approach}</dd>
                </div>
                <div>
                  <dt className="label">Result</dt>
                  <dd className="kgl__result">{p.result}</dd>
                </div>
              </dl>
              <ul className="kgl__tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <a
                className="kgl__link u-link"
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${p.title} on GitHub`}
              >
                <GitHub /> View repository <ArrowUpRight />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="kgl__cta" i={1}>
          <a className="btn btn--primary" href={kaggleProfile.url} target="_blank" rel="noopener noreferrer">
            Kaggle profile <ArrowUpRight />
          </a>
          <span className="label">kaggle.com/{kaggleProfile.handle}</span>
        </Reveal>
      </div>
    </section>
  );
}
