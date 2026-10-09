/** Kaggle & Applied Research entries. Facts come from each repository's public README. */
export interface KaggleProject {
  id: string;
  kind: string;
  title: string;
  task: string;
  metric: string;
  approach: string;
  result: string;
  tags: string[];
  url: string;
}

export const kaggleProfile = {
  handle: 'sinhaaditya5',
  url: 'https://www.kaggle.com/sinhaaditya5',
};

export const kaggleProjects: KaggleProject[] = [
  {
    id: 'K-01',
    kind: 'Research competition · Medical imaging',
    title: 'RSNA Knee Abnormality Detection',
    task: 'Predict the probability of 12 findings (ligament and meniscus tears, osteoarthritis, effusion, fracture and more) from a knee MRI study.',
    metric: 'Macro ROC AUC over 12 findings',
    approach:
      'Only 58 studies have gold labels, so an LLM turns multilingual radiology reports into soft labels. An EfficientNetV2-S reader over 3-slice windows with a small transformer and per-finding attention pooling is then trained on them, for blending with a public ConvNeXt stack.',
    result: '0.902 gold-label AUC across 4 folds (v3); 0.923 public leaderboard from two folds alone.',
    tags: ['PyTorch', 'EfficientNetV2', 'MRI / DICOM', 'Weak supervision'],
    url: 'https://github.com/sinhaaditya5/kaggle-rsna-knee-abnormality',
  },
  {
    id: 'K-02',
    kind: 'Code competition · Cheminformatics',
    title: 'Enveda CASMI 2026',
    task: 'Predict a molecule’s 2D structure (SMILES) from its LC-MS/MS spectra, submitting a ranked list of up to 25 candidates.',
    metric: 'MRR@25',
    approach:
      'Staged pipeline: EDA of 2.5M training spectra, a mass-window plus spectral cosine-similarity baseline, then planned embedding retrieval, formula-constrained de novo generation and re-ranking.',
    result: '0.916 MRR@25 for the baseline on a class-1-like validation. Later stages in progress.',
    tags: ['RDKit', 'Mass spectrometry', 'Retrieval', 'In progress'],
    url: 'https://github.com/sinhaaditya5/kaggle-enveda-casmi26',
  },
  {
    id: 'K-03',
    kind: 'Playground Series S6E10 · Tabular',
    title: 'Airline Satisfaction Prediction',
    task: 'Binary classification of passenger satisfaction from trip details and service ratings, on about 700k training rows.',
    metric: 'ROC AUC',
    approach:
      'LightGBM with fixed stratified 5-fold CV across experiments, raw versus engineered features, and a rank-averaged blend of three runs.',
    result: '0.95905 blended CV AUC; 0.95850 public leaderboard (423 of 768).',
    tags: ['LightGBM', 'Feature engineering', 'Stratified CV', 'Ensembling'],
    url: 'https://github.com/sinhaaditya5/kaggle-s6e10-airline-satisfaction',
  },
];
