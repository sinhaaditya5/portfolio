/**
 * Selected work. Facts come from the April 2026 resume and, where noted,
 * from the project's public GitHub README. Metrics are only those stated there.
 *
 * Keep this file free of JSX/DOM imports: vite.config.ts imports it to build
 * the sitemap.
 */
export type Accent = 'lime' | 'violet' | 'cyan' | 'warm';

export interface Metric {
  value: string;
  label: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  index: string;
  category: string;
  year: string;
  title: string;
  subtitle: string;
  oneLiner: string;
  tech: string[];
  metrics: Metric[];
  flow: string[];
  accent: Accent;
  flagship?: boolean;
  /** Pill text on flagship cards. */
  badge?: string;
  context?: string;
  links: ProjectLink[];
  /** Shown instead of a source link when the code is not public. */
  sourceNote?: string;
  caseStudy: {
    problem: string;
    approach: { title: string; body: string }[];
    results: string[];
    resultsNote?: string;
    details: { label: string; value: string }[];
  };
}

export const projects: Project[] = [
  {
    slug: 'indra',
    index: '01',
    category: 'Data Platform · SIH 2026',
    year: '2026 – Present',
    title: 'INDRA',
    subtitle: 'Intelligent National Disaster & Weather Platform',
    oneLiner:
      'Turns fragmented citizen reports, official warnings and weather observations into verified, explainable weather events for India’s emergency operations centres. I build the backend.',
    tech: ['Python', 'FastAPI', 'PostGIS', 'Redpanda (Kafka)', 'Redis', 'H3', 'DBSCAN', 'SeaweedFS (S3)', 'Docker'],
    metrics: [
      { value: '691', label: 'Commits · #1 contributor' },
      { value: '1,788', label: 'Tests passing' },
      { value: '16', label: 'Hazard types' },
      { value: '7', label: 'Factor verification receipt' },
    ],
    flow: ['Reports + feeds', 'Redpanda', 'Clean · geocode · dedup', 'DBSCAN + H3', 'Evidence', 'Receipt', 'Verified event'],
    accent: 'lime',
    flagship: true,
    badge: 'Now building',
    context: 'Smart India Hackathon 2026 · Team Sixth Sense',
    links: [],
    sourceNote: 'Private team repository',
    caseStudy: {
      problem:
        'When a cloudburst or flash flood hits, a district emergency operations centre gets hundreds of signals at once — citizen reports, official bulletins, weather observations, posts, headlines. Many describe the same incident; some are copies; some are wrong. INDRA answers “what is actually happening, where, how bad, and how sure are we?” as data.',
      approach: [
        {
          title: 'Ingest without losing anything',
          body: 'REST intake with a transactional outbox into Redpanda (Kafka API), scheduled pollers for NDMA SACHET warnings, Open-Meteo, airport METAR, Mastodon and Google News, a dead-letter queue, and a raw archive in an S3-compatible data lake.',
        },
        {
          title: 'Clean and understand',
          body: 'India-bounds validation, geocoding over a 737-district gazetteer, H3 indexing, rule-based cleaning in English, Hindi and Hinglish, a hazard tagger for 16 event types, and flags for misleading and coordinated text.',
        },
        {
          title: 'Cluster in space and time',
          body: 'Great-circle DBSCAN per hazard family, concave-hull event boundaries and multi-resolution H3 heatmaps — one event per incident, not one per report.',
        },
        {
          title: 'Verify against independent evidence',
          body: 'Each cluster is checked against airport METAR, modelled weather and official IMD/CWC/SDMA warnings. A deterministic seven-factor Verification Receipt yields CORROBORATED, CONTRADICTED or UNCONFIRMED; absent signals are marked offline, never invented; late evidence re-scores open events.',
        },
        {
          title: 'Govern and deliver',
          body: 'A human review queue with time-limited claims, role-based access control on every write, a SHA-256 hash-chained audit ledger, REST and WebSocket push to the command centre, and a health endpoint that checks every dependency.',
        },
      ],
      results: [
        'Core platform (phases 1–5) feature-complete, merged and deployed to the team server.',
        'Deterministic scoring: the same cluster and evidence produce a byte-identical receipt, and a test pins it.',
        'Recorded verification demo (27 Sep 2026), labelled test reports scored against that day’s real observations: a 47 °C heatwave claim beside Dehradun airport, which measured 20 °C → 0.437, CONTRADICTED, routed to human review; flood reports in Uttarkashi under an Extreme SDMA rain warning → 0.712, CORROBORATED.',
        '1,788 tests passing in the latest recorded run.',
        '#1 contributor to the repository — 691 commits over the last three months.',
      ],
      resultsNote: 'Figures from the INDRA README (run of 27 Sep 2026) and GitHub contributor insights.',
      details: [
        { label: 'My part', value: 'Core platform · layers 1–3, 5–8a' },
        { label: 'Team', value: 'Team Sixth Sense · 4' },
        { label: 'Problem', value: 'SIH26069 · Weather Big Data Analytics' },
        { label: 'Stack', value: 'FastAPI · PostGIS · Redpanda' },
      ],
    },
  },
  {
    slug: 'market-regime-detection',
    index: '02',
    category: 'Quant Research',
    year: '2025',
    title: 'Market Regime Detection Framework',
    subtitle: 'Hybrid HMM + K-Means regimes on NIFTY 50',
    oneLiner:
      'Hidden Markov Models and K-Means label the market’s regime; an XGBoost classifier predicts it; the strategy follows the regime.',
    tech: ['Python', 'HMM', 'K-Means', 'XGBoost', 'MLflow', 'Streamlit'],
    metrics: [
      { value: '3', label: 'Market regimes' },
      { value: '15y', label: 'NIFTY 50 history' },
      { value: '28', label: 'Engineered features' },
      { value: '78%', label: 'Regime prediction accuracy' },
    ],
    flow: ['NIFTY 50', 'Features', 'HMM + K-Means', 'XGBoost', 'Allocation'],
    accent: 'lime',
    links: [],
    sourceNote: 'Source private',
    caseStudy: {
      problem:
        'Markets don’t behave the same way all the time. A strategy that works in a calm, trending tape can be ruinous in a crisis — so the first question isn’t what to trade, it’s what kind of market this is.',
      approach: [
        {
          title: 'Label the regimes',
          body: 'A hybrid of Hidden Markov Models and K-Means clustering separates 15 years of NIFTY 50 history into three regimes: low-volatility, trending and crisis.',
        },
        {
          title: 'Describe the market state',
          body: '28 engineered features describe the market at each point in time — including realized volatility, VIX dynamics and return skewness.',
        },
        {
          title: 'Predict the regime',
          body: 'An XGBoost classifier learns to predict the regime, using sample weighting to handle class imbalance — crisis periods are rare by definition.',
        },
        {
          title: 'Allocate by regime',
          body: 'Each regime maps to a strategy — mean reversion, breakout or risk-off — so allocation changes as the detected regime changes.',
        },
        {
          title: 'Track and inspect',
          body: 'Experiments are tracked in MLflow and explored through a Streamlit dashboard.',
        },
      ],
      results: [
        '78% regime prediction accuracy (XGBoost with sample weighting).',
        '14.2% CAGR for the regime-driven allocation vs 10.8% for buy-and-hold.',
        'Maximum drawdown reduced from 50% to 18%.',
        'Written up as an IEEE-format research paper.',
      ],
      resultsNote: 'Backtest results as reported in the project write-up. Historical, not a forecast.',
      details: [
        { label: 'Data', value: 'NIFTY 50 · 15 years' },
        { label: 'Regimes', value: 'Low-vol · Trending · Crisis' },
        { label: 'Strategies', value: 'Mean reversion · Breakout · Risk-off' },
        { label: 'Year', value: '2025' },
      ],
    },
  },
  {
    slug: 'demandiq',
    index: '03',
    category: 'ML Platform',
    year: '2026',
    title: 'DemandIQ',
    subtitle: 'Retail Demand Forecasting & Replenishment Engine',
    oneLiner:
      'Forecasts next-week sales for every SKU in every store — then turns the forecast into a reorder quantity and a risk alert.',
    tech: ['Prophet', 'XGBoost', 'FastAPI', 'Streamlit', 'MLflow'],
    metrics: [
      { value: '6', label: 'Pipeline layers' },
      { value: '7·14·28', label: 'Day lag features' },
      { value: '95%', label: 'Service level target' },
      { value: '2', label: 'Forecast models' },
    ],
    flow: ['Data', 'Feature Engineering', 'Forecast', 'Inventory Risk', 'Alert'],
    accent: 'cyan',
    context: 'Capstone-I · IIT Patna',
    links: [{ label: 'Source', href: 'https://github.com/aditbytes/Demand_IQ' }],
    caseStudy: {
      problem:
        'A forecast is only useful if it changes what’s on the shelf. DemandIQ goes from raw sales history to a reorder quantity and a risk flag a store manager can act on.',
      approach: [
        {
          title: 'Ingest and clean',
          body: 'Raw sales, calendar and price data from the Walmart M5 dataset flow through ingestion and cleaning stages into a feature store.',
        },
        {
          title: 'Engineer features',
          body: 'Lag features at 7, 14 and 28 days, rolling statistics, price deltas and holiday flags.',
        },
        {
          title: 'Forecast with two models',
          body: 'Prophet captures seasonality; XGBoost captures the more complex patterns. Models are compared per SKU on MAE, with experiments tracked in MLflow.',
        },
        {
          title: 'Decide the reorder',
          body: 'Safety stock = Z × σ × √lead time at a 95% service level. Inventory is classified into LOW / MED / HIGH risk.',
        },
        {
          title: 'Serve and alert',
          body: 'FastAPI REST endpoints, a Streamlit dashboard, and real-time Telegram alerts for HIGH-risk inventory.',
        },
      ],
      results: [
        'XGBoost outperformed Prophet on most SKUs by MAE.',
        'A 6-layer modular pipeline, from ingestion to alerting.',
        'Led model training for the team.',
      ],
      details: [
        { label: 'Context', value: 'Capstone-I · IIT Patna' },
        { label: 'Role', value: 'Led model training' },
        { label: 'Dataset', value: 'Walmart M5' },
        { label: 'Year', value: 'Mar 2026' },
      ],
    },
  },
  {
    slug: 'indieye',
    index: '04',
    category: 'AI System',
    year: '2026 – Present',
    title: 'IndiEye',
    subtitle: 'Market Intelligence Platform',
    oneLiner:
      'Institutional-grade market sentiment for retail investors: news, social chatter and filings, read by a fine-tuned LLM and lined up against price action.',
    tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'Llama 3', 'AWS'],
    metrics: [
      { value: '3', label: 'Source streams' },
      { value: 'Llama 3', label: 'Fine-tuned for sentiment' },
      { value: '2', label: 'Open-source services' },
    ],
    flow: ['News + Social + Filings', 'NLP', 'Sentiment', 'Price Action', 'Insight'],
    accent: 'violet',
    flagship: true,
    badge: 'Flagship',
    context: 'Founder · open research startup',
    links: [
      { label: 'ML service', href: 'https://github.com/aditbytes/Indieye-ml' },
      { label: 'News service', href: 'https://github.com/aditbytes/Indieye-news-sentiment' },
    ],
    caseStudy: {
      problem:
        'Institutional desks read the news, the chatter and the filings before they read the chart. Retail investors mostly don’t get that layer. IndiEye is an attempt to build it — in the open.',
      approach: [
        {
          title: 'Ingest the noise',
          body: 'A real-time pipeline aggregates financial news, social media chatter from X and Reddit, and daily SEC filings.',
        },
        {
          title: 'Read it with a domain model',
          body: 'Llama 3, fine-tuned for domain-specific sentiment extraction, turns unstructured text into sentiment signals.',
        },
        {
          title: 'Line it up with price',
          body: 'Sentiment signals are correlated with price action using time-series models.',
        },
        {
          title: 'Serve the insight',
          body: 'A predictive dashboard in Next.js, backed by FastAPI on AWS with PostgreSQL storage.',
        },
        {
          title: 'Split into services',
          body: 'The ML layer (regime classification, strategy recommendation, key levels, backtesting) and the news & LLM-briefing layer run as independent, open-source microservices.',
        },
      ],
      results: [
        'Founded and open-sourced as an ongoing research startup; actively developed.',
        'ML service exposes regime, strategy, key-level, market-radar and backtest endpoints.',
        'News service aggregates multiple providers and RSS feeds into LLM morning briefs, priority feeds and sector briefs.',
      ],
      details: [
        { label: 'Status', value: 'Ongoing · 2026 – Present' },
        { label: 'Role', value: 'Founder' },
        { label: 'Backend', value: 'FastAPI · PostgreSQL · AWS' },
        { label: 'Model', value: 'Llama 3 (fine-tuned)' },
      ],
    },
  },
  {
    slug: 'datascout',
    index: '05',
    category: 'AI System',
    year: '2026',
    title: 'DataScout',
    subtitle: 'Agentic AI Data Analyst',
    oneLiner:
      'Ask a dataset a question in plain English. An agent writes the Python, runs it in a sandbox and shows its work.',
    tech: ['Amazon Bedrock', 'AWS Lambda', 'S3', 'API Gateway', 'DynamoDB', 'Streamlit'],
    metrics: [
      { value: '4', label: 'Team — led' },
      { value: 'AES-256', label: 'Encryption at rest' },
      { value: '0', label: 'SQL required' },
    ],
    flow: ['User', 'Natural Language', 'AI Agent', 'Python Execution', 'Analysis', 'Insight'],
    accent: 'warm',
    context: 'AI for Bharat hackathon',
    links: [{ label: 'Source', href: 'https://github.com/aditbytes/Data_scout' }],
    caseStudy: {
      problem:
        'Most people with a business question can’t write the pandas to answer it — and a chatbot that predicts numbers is not the same as one that computes them.',
      approach: [
        {
          title: 'Ask in plain English',
          body: 'Upload a dataset and ask a question in natural language through a Streamlit interface — no SQL required.',
        },
        {
          title: 'An agent plans the analysis',
          body: 'An agent on Amazon Bedrock interprets the analytical intent behind the question.',
        },
        {
          title: 'Generate and execute Python',
          body: 'The agent writes Python that runs in a sandboxed environment, so results are computed rather than guessed — and the code is there to audit.',
        },
        {
          title: 'Serverless on AWS',
          body: 'S3 for datasets, Lambda and API Gateway for execution, DynamoDB for state.',
        },
        {
          title: 'Secure by design',
          body: 'IAM role isolation, AES-256 encryption, audit logging and sandboxed execution.',
        },
      ],
      results: [
        'Reached the Prototype Development Phase of the AI for Bharat national AI hackathon.',
        'Led a team of 4 through the build.',
      ],
      details: [
        { label: 'Context', value: 'AI for Bharat · Feb – Mar 2026' },
        { label: 'Role', value: 'AI Engineer (Developer) · team lead' },
        { label: 'Cloud', value: 'AWS serverless' },
        { label: 'Team', value: '4' },
      ],
    },
  },
  {
    slug: 'sanjivani-ai',
    index: '06',
    category: 'AI System',
    year: '2026',
    title: 'Sanjivani AI',
    subtitle: 'Multimodal crisis intelligence for Bihar floods',
    oneLiner:
      'Reads distress posts, satellite imagery and supply history in one pipeline — triage from text, flood extent from pixels, resource forecasts per district.',
    tech: ['DistilBERT', 'U-Net', 'YOLOv8', 'XGBoost', 'FastAPI', 'Streamlit', 'PostGIS', 'Docker'],
    metrics: [
      { value: '3', label: 'Modalities: text · imagery · tabular' },
      { value: '5', label: 'API endpoints' },
      { value: '34/34', label: 'Tests passing' },
    ],
    flow: ['Posts + satellite + history', 'NLP triage', 'Flood segmentation', 'Resource forecast', 'District dashboard'],
    accent: 'cyan',
    context: 'Prototype',
    links: [{ label: 'Source', href: 'https://github.com/aditbytes/sanjivani-ai' }],
    caseStudy: {
      problem:
        'In a Bihar flood, the signals that matter — a stranded family’s post, a satellite pass over a river, last season’s supply numbers — arrive in different formats to different people. Sanjivani puts them in one pipeline so a relief planner sees one picture per district.',
      approach: [
        {
          title: 'Triage the text',
          body: 'A DistilBERT classifier tags posts for urgency, resource needs and vulnerability; a location extractor maps them to districts.',
        },
        {
          title: 'Read the imagery',
          body: 'U-Net (ResNet50 encoder) segments flood extent, YOLOv8 detects objects, and a change-detection step compares passes.',
        },
        {
          title: 'Forecast the need',
          body: 'XGBoost models, one per resource type, predict requirements per district from engineered features.',
        },
        {
          title: 'Serve it',
          body: 'A FastAPI backend (analyze-tweet, analyze-image, forecast per district) with PostGIS storage and a multi-page Streamlit dashboard with maps.',
        },
        {
          title: 'Ship it',
          body: 'Docker Compose for development and production, with a pytest suite over the API, NLP and helpers.',
        },
      ],
      results: [
        'NLP, vision and forecasting modules trained end-to-end and served behind one API; 34/34 tests passing.',
        'So far trained on synthetic data (350 posts, 200 satellite images), so the scores are not meaningful yet — retraining on real social and Sentinel-2 data is the next step.',
      ],
      resultsNote: 'Honest status: prototype. Metrics will be published once measured on real data.',
      details: [
        { label: 'Context', value: 'Flood response · Bihar' },
        { label: 'Modalities', value: 'Text · Satellite · Tabular' },
        { label: 'Status', value: 'Prototype' },
        { label: 'Year', value: '2026' },
      ],
    },
  },
  {
    slug: 'agentic-core',
    index: '07',
    category: 'Agent Systems',
    year: '2026',
    title: 'Agentic AI Core',
    subtitle: 'A foundation layer for autonomous agents',
    oneLiner:
      'An LLM planner decomposes the goal, an executor runs tools with validation, timeouts and retries, an evaluator checks the result, and memory carries context forward.',
    tech: ['Python', 'Pydantic v2', 'FAISS', 'Chroma', 'structlog', 'FastAPI', 'Swappable LLMs'],
    metrics: [
      { value: '4', label: 'Agent roles' },
      { value: '7', label: 'Built-in tools specified' },
      { value: '8', label: 'Design specs incl. threat model' },
    ],
    flow: ['Goal', 'Planner', 'Executor', 'Evaluator', 'Result', 'Memory'],
    accent: 'violet',
    context: 'In design',
    links: [],
    sourceNote: 'Private · in design',
    caseStudy: {
      problem:
        'Most “agents” are a prompt in a loop: no plan, no retries, no memory, and no way to tell whether it worked. Agentic Core is the layer underneath — explicit roles, typed contracts and observability from day one — so domain agents can be built on top of it.',
      approach: [
        {
          title: 'Plan',
          body: 'The planner turns a natural-language goal into a structured plan of subtasks with tool assignments, and replans with the error as context when a step fails.',
        },
        {
          title: 'Execute',
          body: 'Tools are validated with Pydantic and run with timeouts and retries: file read/write/search, sandboxed Python, web search and HTTP. New tools are registered through YAML config.',
        },
        {
          title: 'Remember',
          body: 'Short-term task state plus long-term vector memory (FAISS locally, Chroma for persistence).',
        },
        {
          title: 'Evaluate',
          body: 'A self-evaluation step decides whether the goal was met and triggers adaptation when it wasn’t.',
        },
        {
          title: 'Observe and constrain',
          body: 'Structured logs, traces and checkpoints; a written threat model; LLM providers abstracted so GPT-4 or a local model can sit behind the same interface.',
        },
      ],
      results: [
        'Product requirements, system architecture, technical design, API contracts, memory schema, evaluation plan, implementation guide and threat model written.',
        'Deliberate choices: thin wrappers instead of a heavy framework, explicit state, no swallowed exceptions.',
        'Next: FastAPI service, Chroma persistence, RAG over documents, multi-model routing.',
      ],
      resultsNote: 'Status: specification complete, implementation in progress.',
      details: [
        { label: 'Roles', value: 'Planner · Executor · Evaluator · Memory' },
        { label: 'Memory', value: 'FAISS · Chroma' },
        { label: 'Status', value: 'In design' },
        { label: 'Year', value: '2026' },
      ],
    },
  },
  {
    slug: 'llm-pruning-explainability',
    index: '08',
    category: 'Research',
    year: '2026',
    title: 'LLM Pruning & Explainability',
    subtitle: 'Do explanations survive compression?',
    oneLiner:
      'Pruning makes models cheaper; explanations make them trustworthy. This study measures what pruning does to the explanations.',
    tech: ['SHAP', 'Integrated Gradients', 'DistilBERT', 'RoBERTa'],
    metrics: [
      { value: '40–80%', label: 'Sparsity range' },
      { value: '3', label: 'Pruning methods' },
      { value: '14,090', label: 'Peak Hessian vs 0.73 baseline' },
    ],
    flow: ['Model', 'Pruning', 'Sparsity', 'Explanation', 'Faithfulness'],
    accent: 'violet',
    links: [],
    caseStudy: {
      problem:
        'Compression makes models cheaper to run. Explanations make them easier to trust. When you prune a model, do its explanations still mean anything?',
      approach: [
        {
          title: 'Compress',
          body: 'Random, L1 unstructured and L1 structured pruning at 40–80% sparsity.',
        },
        {
          title: 'Explain',
          body: 'SHAP and Integrated Gradients attributions computed on the pruned models.',
        },
        {
          title: 'Measure faithfulness',
          body: 'Explanation faithfulness measured with the FCor metric.',
        },
        {
          title: 'Across models and data',
          body: 'DistilBERT and RoBERTa, evaluated on IMDb and Yelp.',
        },
        {
          title: 'Probe the geometry',
          body: 'Decision-landscape curvature, via the Hessian, to explain why some explanations break.',
        },
      ],
      results: [
        'Magnitude pruning preserves explanation faithfulness up to 80% sparsity.',
        'Random pruning creates high-curvature decision landscapes — Hessian values up to 14,090 vs a 0.73 baseline — that break SHAP’s linearity assumptions.',
      ],
      details: [
        { label: 'Models', value: 'DistilBERT · RoBERTa' },
        { label: 'Datasets', value: 'IMDb · Yelp' },
        { label: 'Metric', value: 'FCor faithfulness' },
        { label: 'Year', value: '2026' },
      ],
    },
  },
  {
    slug: 'salt-battery-lab',
    index: '09',
    category: 'Engineering Research',
    year: '2026',
    title: 'Salt Battery Lab',
    subtitle: 'A sodium “salt battery” startup, simulated end to end',
    oneLiner:
      'From DFT and cell models to CAD, PCB and techno-economics — one parameter set, one claims ledger, one rebuild script, and an honest go/no-go verdict.',
    tech: ['Python', 'PyBaMM', 'Quantum ESPRESSO', 'uMLIP', 'build123d', 'KiCad', 'Blender', 'AWS'],
    metrics: [
      { value: '16', label: 'Simulation stages' },
      { value: '78', label: 'Tests passing · 2 skipped' },
      { value: '164', label: 'Logged sources' },
      { value: '30', label: 'Architectures screened' },
    ],
    flow: ['Claims ledger', 'DFT + cell models', 'Thermal · TEA', 'CAD · PCB', 'Go / no-go'],
    accent: 'cyan',
    context: 'Pre-prototype study · v1.1.0',
    links: [{ label: 'Source', href: 'https://github.com/sinhaaditya5/salt-battery-lab' }],
    caseStudy: {
      problem:
        'Two startup briefs: a water-based sodium-ion battery you’re allowed to put indoors for data-centre and telecom UPS in India, and salt-derived chemistries held to 360 Wh/kg, a 5-minute charge for 1,500 km, $3 and non-flammability. Before building a cell, the question is whether the physics and the economics allow either company to exist.',
      approach: [
        {
          title: 'Tag every number',
          body: 'Each figure carries an evidence tag — literature, vendor, calculated, simulated, assumption or target — that resolves in a claims ledger. A linter checks the deck, report and one-pager against it.',
        },
        {
          title: 'Model the aqueous track',
          body: 'Ten simulations: a kit re-run, PyBaMM validation, an R1 DFN with Monte Carlo, gas and water budgets, a uMLIP + DFT+U screen, build-up, thermal and abuse, techno-economics and market sizing.',
        },
        {
          title: 'Screen salt-derived chemistries',
          body: 'A 30-architecture feasibility matrix, DFT+U on Na/NaCl/Cl₂ and Fe/Co/Ni chlorides in Quantum ESPRESSO on AWS spot, a salt-iron cell model and 1 GWh/yr factory scenarios.',
        },
        {
          title: 'Design the hardware',
          body: 'CAD in build123d with headless engineering drawings, Blender renders, and the SCM-1 test-monitor board in KiCad with host-tested firmware — R1 block, SM-48T module, P1 cell and S-cell R0, all concepts.',
        },
        {
          title: 'Rebuild from one script',
          body: 'A single run script regenerates every result from one parameter set, so a changed assumption flows through to the verdict.',
        },
      ],
      results: [
        'Aqueous track: the R1 block lands at 17.6 Wh/kg and ~$350/kWh against ~$70/kWh for LFP packs — a documented no-go for the factory company.',
        'Project Salt: the best salt-derived cell reaches P50 259 Wh/kg vs the 360 target; a 5-minute 1,500 km charge needs 3.8 MW, above the 3.75 MW MCS ceiling.',
        'DFT conversion voltages within +0.11 to +0.27 V of experiment for Fe, Co and Ni chlorides.',
        'Validation misses are recorded, not hidden: the PyBaMM sodium DFN misses its 60 mV gate by 67–121 mV.',
        'Narrowed to one testable lever — a thin β″-alumina separator with a high-loading salt-iron cathode — with the S-cell R0 build package to test it.',
      ],
      resultsNote: 'Pre-prototype: no cell has been built, so nothing is measured. Figures from the project README.',
      details: [
        { label: 'Tracks', value: 'Aqueous Na-ion · Project Salt' },
        { label: 'DFT', value: 'Quantum ESPRESSO 7.6' },
        { label: 'Hardware', value: 'build123d · KiCad 10' },
        { label: 'Release', value: 'v1.1.0 · Nov 2026' },
      ],
    },
  },
  {
    slug: 'parc-delta-lab',
    index: '10',
    category: 'Physics Research',
    year: '2026',
    title: 'PARC-Delta Lab',
    subtitle: 'Steering fusion-alpha energy into fuel ions',
    oneLiner:
      'A reproducible p–¹¹B alpha-channeling research model, plus PDX-1 — a bench test stand designed, simulated and rendered from a single parameter file.',
    tech: ['Python', 'NumPy', 'Monte Carlo', 'Boris pusher', 'CAD (STEP)', 'Blender', 'GitHub Actions'],
    metrics: [
      { value: '76/76', label: 'Research tests passing' },
      { value: '4,200', label: 'Boris-pushed alphas' },
      { value: '7.5e-10', label: 'Max re-run difference' },
      { value: '150', label: 'Part STEP model' },
    ],
    flow: ['p–¹¹B kinetics', 'Alpha slowing-down', 'Magnet + orbits', 'Bench physics', 'PDX-1 design'],
    accent: 'violet',
    context: 'Concept study · v1.6.0',
    links: [{ label: 'Source', href: 'https://github.com/sinhaaditya5/PARC-Delta-Lab' }],
    caseStudy: {
      problem:
        'In p–¹¹B fusion the products are fast alpha particles. If their energy could be channelled into fuel ions through ion Bernstein waves instead of heating electrons, the economics change. PARC-Delta asks how far that idea survives contact with kinetic models — and what a first bench experiment would have to look like.',
      approach: [
        {
          title: 'Model the kinetics',
          body: 'Linear and finite-k∥ ion-Bernstein-wave kinetics and sequential p–¹¹B → 3α birth kinematics, across 12 modules.',
        },
        {
          title: 'Slow the alphas down',
          body: 'Conserving Coulomb Monte Carlo and time-dependent Rosenbluth, Takizuka–Abe and Nanbu slowing-down, with collision operators cross-checked against each other.',
        },
        {
          title: 'Design the magnet and confinement',
          body: 'A 3 T mirror coil set, and full-orbit Boris integration of 4,200 alphas to measure wall loss against central field and target placement.',
        },
        {
          title: 'Build PDX-1 from one file',
          body: 'Magnet, bench physics, a 150-part STEP model, an A0 general-arrangement drawing, renders, report, deck and video — all generated from a single parameter file.',
        },
        {
          title: 'Make it reproducible',
          body: 'Six archived campaigns (v1.1 → v1.6), a SHA-256-verified release, and CI with CodeQL; every headline number is regenerated by one make target.',
        },
      ],
      results: [
        'Independent re-run of the full v1.6 campaign: 1,122 values across 11 files, maximum relative difference 7.5 × 10⁻¹⁰.',
        'Orbit solver matches adiabatic loss-cone theory: 39.67% simulated end loss vs 39.69% analytic.',
        'Alpha wall loss falls from 76% at 1 T to 0.1% at the 3 T design point.',
        'A ~10 T peak winding field ruled out NbTi, moving the baseline to REBCO HTS at 20 K.',
        'Fusion-born alphas from a µA beam are ~10⁹× too sparse to drive IBWs, so Phase 2 needs a surrogate energetic-ion source.',
      ],
      resultsNote: 'A concept study, not a reactor: nothing here establishes fusion gain or net electricity. Figures from the project README.',
      details: [
        { label: 'Model', value: 'PARC-Delta v1.6 · 12 modules' },
        { label: 'Magnet', value: '3 T REBCO mirror' },
        { label: 'Stand', value: 'PDX-1 · 6.9 m linear' },
        { label: 'Release', value: 'v1.6.0 · Nov 2026' },
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
