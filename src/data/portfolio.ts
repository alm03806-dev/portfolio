export const personalInfo = {
  name: "Md. Al Mahmud",
  shortName: "Al Mahmud",
  roles: ["Machine Learning Researcher", "AI Engineer", "CS Undergraduate"],
  tagline:
    "Building rigorous, leakage-audited ML systems — from clinical prediction to real-time infrastructure.",
  bio: "I'm a Computer Science undergraduate at Daffodil International University and an independent ML researcher focused on rigorous, leakage-free machine learning for high-stakes domains — healthcare, finance, and environmental science. I care deeply about evaluation integrity, interpretability, and the gap between benchmark performance and real-world reliability.",
  email: "almahmud.cse@diu.edu.bd",
  location: "Dhaka, Bangladesh",
  links: {
    github: "https://github.com/alm03806-dev",
    huggingface: "https://huggingface.co/mahmudsiyam",
    orcid: "https://orcid.org/0009-0004-0404-4761",
    kaggle: "https://www.kaggle.com/mahmudsiyam",
  },
  cv: "/cv.pdf",
};

export const researchInterests = [
  {
    id: "eval-integrity",
    title: "Evaluation Integrity",
    description:
      "Detecting and auditing data leakage, temporal contamination, patient-level overlap, and benchmark inflation in clinical and financial ML pipelines.",
    icon: "shield-check",
  },
  {
    id: "clinical-ml",
    title: "Clinical Machine Learning",
    description:
      "Non-invasive disease prediction, medical imaging segmentation, and fairness-aware health outcome modeling using population-scale survey data.",
    icon: "heart-pulse",
  },
  {
    id: "ensemble-methods",
    title: "Ensemble & Gradient Boosting",
    description:
      "Stacking ensembles, calibrated probabilistic classifiers, Optuna-tuned gradient boosting (LightGBM, XGBoost, CatBoost), and SHAP explainability.",
    icon: "layers",
  },
  {
    id: "medical-imaging",
    title: "Medical Imaging & Vision",
    description:
      "Segmentation architectures for CT imaging, few-shot classification for dermatology, and vision-language models for clinical applications.",
    icon: "scan-line",
  },
  {
    id: "nlp-ocr",
    title: "NLP & Document AI",
    description:
      "Code-mixed handwritten text recognition, TrOCR fine-tuning, and structured information extraction from clinical documents in low-resource languages.",
    icon: "file-text",
  },
  {
    id: "mlops",
    title: "MLOps & Deployment",
    description:
      "Real-time anomaly detection for ML infrastructure, FastAPI services, Hugging Face Spaces deployment, and reproducible research pipelines.",
    icon: "cpu",
  },
];

export type PublicationStatus = "accepted" | "submitted" | "in-preparation";

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  status: PublicationStatus;
  role: "first-author" | "co-author";
  abstract: string;
  links?: { label: string; url: string }[];
}

export const publications: Publication[] = [
  {
    id: "pub-bankruptcy",
    title:
      "A Leakage-Safe Temporal Feature Engineering Framework for Explainable Corporate Bankruptcy Prediction Using Gradient Boosting",
    authors: [
      "Md. Al Mahmud",
      "Md. Zobayer Amin",
      "Md. Tanmim Alam Nuhin",
      "Md. Al-Amin Remon",
      "Md. Rafiul Hasan Sazib",
    ],
    venue:
      "IEEE 3rd International Conference on Computing, Applications and Systems (COMPAS 2026)",
    year: 2026,
    status: "accepted",
    role: "first-author",
    abstract:
      "Proposed a leakage-safe temporal feature engineering framework using Optuna-tuned gradient boosting on 78,682 NYSE/NASDAQ firm-year observations (1999-2018). Achieved MCC 0.357 / ROC-AUC 0.881 on the matched 25-year firm subset — a 59% relative MCC improvement over the prior Multi-Head LSTM benchmark — with full SHAP interpretability and rigorous statistical testing (DeLong, McNemar, firm-clustered bootstrap).",
    links: [
      { label: "GitHub", url: "https://github.com/alm03806-dev/bankruptcy-prediction" },
      { label: "Demo", url: "https://huggingface.co/spaces/mahmudsiyam/bankruptcy-prediction" },
    ],
  },
  {
    id: "pub-kub",
    title:
      "Quantifying the Impact of Patient and Duplicate Leakage in Deep Learning-Based KUB Radiograph Classification",
    authors: [
      "Md. Al Mahmud",
      "Md. Minhazur Rahman",
      "Md. Resad Chowdhury",
      "Md. Al Rajim Riyad",
      "Jonayed Hasan Noyon",
    ],
    venue:
      "IEEE International Conference on Computer and Information Technology (ICCIT 2026)",
    year: 2026,
    status: "submitted",
    role: "first-author",
    abstract:
      "Assembled 2,570 KUB radiographs from 1,699 source cases and performed a perceptual-hash and correlation audit, finding 109 confirmed duplicate/near-duplicate pairs. A leakage ladder experiment showed accuracy inflates from an honest 0.882 baseline to 0.977 when patient-level and duplicate-level leakage are introduced — demonstrating that high accuracy in prior KUB literature is largely attributable to evaluation protocol rather than model capability.",
  },
  {
    id: "pub-pox",
    title:
      "Few-Shot Learning for Pox-like Skin Disease Classification using Concept-Guided Text Fusion with a DermLIP Model",
    authors: [
      "Md. Minhazur Rahman",
      "Md. Al Mahmud",
      "Tareque Jamil Josh",
      "Md. Resad Chowdhury",
      "Md. Zobayer Amin",
    ],
    venue:
      "IEEE International Conference on Computer and Information Technology (ICCIT 2026)",
    year: 2026,
    status: "submitted",
    role: "co-author",
    abstract:
      "Developed a few-shot classification framework for pox-like skin diseases (measles, chickenpox, mpox) using DermLIP, a dermatology-specific vision-language foundation model, with concept-guided visual-textual fusion. Outperformed a frozen-CNN 5-shot baseline by 7.7-32.2 points across three datasets (MSLD v1.0, v2.0, MSID).",
  },
  {
    id: "pub-lung",
    title:
      "An Efficient Lightweight Boundary-Aware CNN-Mamba-Transformer Hybrid with Pre-Trained Feature Transfer for Lung Nodule Segmentation in CT Image",
    authors: [
      "Md. Resad Chowdhury",
      "Md. Minhazur Rahman",
      "Md. Al Mahmud",
      "Anik Rahman",
    ],
    venue:
      "IEEE International Conference on Electrical, Computer and Communication Engineering (ICECE 2026)",
    year: 2026,
    status: "submitted",
    role: "co-author",
    abstract:
      "Designed a lightweight hybrid segmentation network for pulmonary nodule segmentation in CT images, combining a pre-trained EfficientNet-B0 encoder, deep-stage Mamba state-space blocks, a lightweight Paraformer Transformer bottleneck, and a UNet3+ full-scale fusion decoder with boundary-aware deep supervision — targeting deployment on resource-constrained clinical hardware.",
  },
  {
    id: "pub-nhanes",
    title:
      "A Stacking Ensemble for Glycemic-Marker-Free Diabetes Classification in NHANES: Cycle-Based External Temporal Validation with Survey-Weighted Equivalence Testing",
    authors: ["Md. Al Mahmud"],
    venue: "Targeting a Q1 Journal",
    year: 2026,
    status: "in-preparation",
    role: "first-author",
    abstract:
      "Developed and externally validated a six-learner stacking ensemble for non-invasive Type 2 diabetes classification using NHANES survey data — trained on cycles G-J (n=21,486), externally validated on held-out cycle L (n=5,967). Achieved external AUC 0.868 under both unweighted and survey-weighted design-based inference. Conducted 70 fairness subgroup audits identifying a significant AUC disparity for non-Hispanic Black participants.",
    links: [
      { label: "Demo", url: "https://huggingface.co/spaces/mahmudsiyam/nhanes-health-prediction" },
    ],
  },
  {
    id: "pub-landfill",
    title:
      "Machine learning versus last year's report: a leakage-audited benchmark for predicting facility-level landfill methane emissions reported to the U.S. Greenhouse Gas Reporting Program",
    authors: [
      "Md. Al Mahmud",
      "Al Amin Remon",
      "Mayen Uddin Mojumdar",
      "Narayan Ranjan Chakraborty",
      "Sumit Kumar Banshal",
    ],
    venue: "Targeting a Q1 Sustainability Journal",
    year: 2026,
    status: "in-preparation",
    role: "first-author",
    abstract:
      "Developed a stacking ensemble (LightGBM, Extra-Trees, Ridge) to predict facility-level landfill methane emissions across 1,208 U.S. facilities (2015-2023). The model achieved R2=0.905 on held-out data, but was statistically indistinguishable from simply repeating a facility's prior-year report — an honest benchmark rather than an overstated result.",
  },
  {
    id: "pub-mgs",
    title:
      "Minimal-Generating-Subset (MGS) Search: Blind Detection of Label Leakage Across Two Clinical Domains",
    authors: ["Md. Al Mahmud"],
    venue: "Targeting a Q1 Journal",
    year: 2026,
    status: "in-preparation",
    role: "first-author",
    abstract:
      "Developed minimal-generating-subset (MGS) search, a blind method for detecting label leakage in clinical ML datasets without prior knowledge of the labeling rule. Applied to a Bangladeshi typhoid/rickettsial serology dataset (n=1,106), it recovered the underlying diagnostic thresholds. Applied blind to two independent autism-screening datasets, the method exactly reproduced previously published leakage thresholds.",
  },
];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
  links?: { label: string; url: string }[];
  badge?: string;
}

export const projects: Project[] = [
  {
    id: "proj-bankruptcy",
    title: "Corporate Bankruptcy Prediction",
    subtitle: "Machine Learning Risk Scoring",
    period: "May - Jun 2026",
    description:
      "Gradient-boosting ensemble pipeline for predicting corporate bankruptcy risk from 78,682 NYSE/NASDAQ firm-year observations. Features temporal feature engineering, Optuna HPO, SHAP explainability, and a calibrated 0-100 composite risk score.",
    highlights: [
      "LightGBM / XGBoost / CatBoost stacking with ADASYN oversampling",
      "MCC 0.357 / ROC-AUC 0.881 — 59% relative MCC improvement over Multi-Head LSTM baseline",
      "DeLong, McNemar, and firm-clustered bootstrap statistical tests",
      "Interactive Streamlit demo deployed on Hugging Face Spaces",
    ],
    tags: ["Python", "LightGBM", "XGBoost", "SHAP", "Optuna", "Streamlit"],
    links: [
      { label: "GitHub", url: "https://github.com/alm03806-dev/bankruptcy-prediction" },
      { label: "Live Demo", url: "https://huggingface.co/spaces/mahmudsiyam/bankruptcy-prediction" },
    ],
  },
  {
    id: "proj-nhanes",
    title: "NHANES Health Outcome Prediction",
    subtitle: "Glycemic-Marker-Free Diabetes Classifier",
    period: "Jun 2026",
    description:
      "Six-model stacking ensemble for non-invasive diabetes risk prediction trained on U.S. NHANES population survey data (n=21,486), with temporal external validation on a held-out survey cycle (n=5,967) to test generalization under real-world dataset shift.",
    highlights: [
      "LightGBM + XGBoost + FT-Transformer + RF + GBM + SVM base models",
      "External AUC 0.868 (95% CI: 0.857-0.879) using 39 non-glycemic variables",
      "Survey-weighted TOST equivalence testing and 70-test fairness audit",
      "Interactive clinical risk calculator on Hugging Face Spaces",
    ],
    tags: ["Python", "LightGBM", "XGBoost", "FT-Transformer", "NHANES", "Fairness"],
    links: [
      { label: "GitHub", url: "https://github.com/alm03806-dev/nhanes-health-prediction" },
      {
        label: "Live Demo",
        url: "https://huggingface.co/spaces/mahmudsiyam/nhanes-health-prediction",
      },
    ],
  },
  {
    id: "proj-ghostgpu",
    title: "GhostGPU",
    subtitle: "Live Silent-Failure Detection for GPU Clusters",
    period: "Jul 2026",
    description:
      "Real-time system to detect GPU training jobs that appear busy but have silently failed — NaN loss, frozen data loaders, deadlocked processes. Uses a two-stage pipeline combining unsupervised anomaly detection with a calibrated supervised classifier.",
    highlights: [
      "Isolation Forest (unsupervised) + XGBoost classifier two-stage pipeline",
      "76.4% detection recall at 1.3% false-alarm rate, beating rule-based baselines",
      "Live FastAPI dashboard with Dockerized deployment",
      "Hackathon Finalist — AI Innovation Hackathon 2026 (DIU, ~50 teams)",
    ],
    tags: ["Python", "FastAPI", "XGBoost", "Isolation Forest", "Docker", "MLOps"],
    links: [{ label: "GitHub", url: "https://github.com/alm03806-dev/ghostgpu" }],
    badge: "Hackathon Finalist",
  },
  {
    id: "proj-prescription",
    title: "Code-Mixed Handwritten Prescription Recognition",
    subtitle: "Final Year Design Project",
    period: "Feb 2026 - Present",
    description:
      "Team leader for a two-person FYDP converting raw photographed Bangla-English handwritten prescriptions into six structured, entity-linked fields. Directed a 19-paper literature review, built a custom dataset from 2,144 real prescription images collected across Bangladesh.",
    highlights: [
      "377 annotated images (3,279 field-level crops) via Label Studio pipeline",
      "Fine-tuned TrOCR + YOLOv8n detection — CER reduced from 0.926 to 0.273",
      "0.830 mAP50 detection accuracy / 0.892/0.817 end-to-end field accuracy",
      "5 identified research gaps from systematic review of 19 papers (2018-2026)",
    ],
    tags: ["Python", "TrOCR", "YOLOv8", "OpenCV", "Label Studio", "HuggingFace"],
  },
];

export const education = [
  {
    id: "edu-diu",
    institution: "Daffodil International University",
    degree: "B.Sc. in Computer Science & Engineering",
    period: "Oct 2022 - Present",
    location: "Dhaka, Bangladesh",
    description:
      "Core curriculum in data structures & algorithms, software engineering, database systems, computer networks, and applied statistics — with elective focus on machine learning, deep learning, and computer vision/NLP. Independently pursued applied ML research beyond coursework, including ensemble methods, medical imaging, and model deployment.",
  },
  {
    id: "edu-hsc",
    institution: "Government Azizul Haque College",
    degree: "Higher Secondary Certificate (HSC) — Science",
    period: "Jul 2018 - Jan 2021",
    location: "Bogra, Bangladesh",
    gpa: "GPA 5.00 / 5.00",
    description: "Physics, Chemistry, Higher Mathematics, Biology, Bangla, English, ICT.",
  },
  {
    id: "edu-ssc",
    institution: "Bogura Zilla School",
    degree: "Secondary School Certificate (SSC) — Science",
    period: "Jan 2016 - May 2018",
    location: "Bogra, Bangladesh",
    gpa: "GPA 5.00 / 5.00",
    description: "Physics, Chemistry, Higher Mathematics, Biology, ICT, Mathematics.",
  },
];

export const experience = [
  {
    id: "exp-volunteer",
    title: "Computer Literacy Instructor",
    organization: "Bogura Deaf & Dumb School",
    type: "Volunteer",
    period: "Jan 2026 - Aug 2026",
    location: "Bogra, Bangladesh",
    highlights: [
      "Delivered ~250 hours of unpaid computer literacy instruction, 4 days/week",
      "Taught ~20 hearing- and speech-impaired students: basic computer operations, Microsoft Word, typing, internet basics, and responsible AI use",
      "Adapted teaching methods to students' communication needs; maintained consistent attendance throughout",
    ],
  },
];

export const skillGroups = [
  {
    label: "Languages",
    skills: ["Python", "Java", "C++"],
  },
  {
    label: "Machine Learning",
    skills: ["LightGBM", "XGBoost", "CatBoost", "scikit-learn", "SHAP", "Optuna", "Isolation Forest"],
  },
  {
    label: "Deep Learning & Vision",
    skills: ["PyTorch", "TrOCR", "YOLOv8", "FT-Transformer", "CNN", "Vision-Language Models"],
  },
  {
    label: "Data Science",
    skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Feature Engineering", "Statistical Testing"],
  },
  {
    label: "MLOps & Tools",
    skills: ["FastAPI", "Docker", "Hugging Face Spaces", "Streamlit", "Label Studio", "OpenCV"],
  },
  {
    label: "Research Methods",
    skills: ["Temporal Validation", "Leakage Auditing", "Survey-Weighted Inference", "SHAP Explainability", "Fairness Auditing"],
  },
];

export const achievements = [
  {
    id: "ach-hackathon",
    title: "AI Innovation Hackathon 2026 — Finalist",
    organization: "Daffodil International University (seed funded by World AI Alliance)",
    date: "Jul 2026",
    description:
      "Selected as a finalist in the Final Round among ~50 competing teams as Team NeuroAccel, building GhostGPU — a real-time silent-failure detection system for GPU training clusters.",
  },
  {
    id: "ach-aws",
    title: "AWS Academy Cloud Foundations",
    organization: "AWS Academy",
    date: "May 2026",
    description:
      "Completed a 20-hour AWS Academy course covering core cloud computing concepts, AWS global infrastructure, and core services (compute, storage, database, networking).",
  },
  {
    id: "ach-research-workshop",
    title: "Research Workshop: From Zero to First Idea",
    organization: "Daffodil International University",
    date: "Feb 2026",
    description:
      "Completed a 3-day intensive research workshop covering foundations of academic research — from identifying a research problem through to structuring a research plan.",
  },
  {
    id: "ach-oracle",
    title: "Oracle Database — SQL Fundamentals I",
    organization: "DIU Micro-credentials Academy",
    date: "Feb 2026",
    description:
      "Successfully completed a 20-hour micro-credentials course (1 credit hour) on Oracle Database SQL fundamentals.",
  },
  {
    id: "ach-ai-optimization",
    title: "Optimization Using AI: Hill Climbing Algorithm",
    organization: "GoEdu.ac (Skilljobs & HRDI)",
    date: "Apr 2025",
    description:
      "Completed with distinction. Focused on optimization techniques in artificial intelligence, instructed by Nuruzzaman Faruqi.",
  },
];
