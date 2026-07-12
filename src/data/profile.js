export const profile = {
  name: "Yeonsoo Kim",
  displayName: "김연수",
  role: "AI Engineer | MLOps · Data Pipeline · LLM Inference",
  location: "Seoul, Korea",
  headline:
    "데이터 파이프라인과 운영 자동화, 추론 최적화로 AI가 조직 전체에서 안정적으로 돌아가는 시스템을 만듭니다.",
  aboutTitle: "AI를 기능이 아니라, 운영 가능한 시스템으로 만듭니다.",
  summary:
    "B2B SaaS 기업에서 엔터프라이즈 상담 데이터 약 2만 건을 수집, 배치 임베딩, 클러스터링, LLM 패턴 추출, 지식 생성으로 이어지는 배치 파이프라인으로 자동화했습니다. 멀티모델 라우팅과 토큰 사용량 모니터링을 설계해 LLM 운영 비용을 60-70% 절감했고, Kubernetes 배포 도구인 ArgoCD 오픈소스의 조회 병목을 캐시 구조로 개선해 기여가 머지되었습니다. 연구실에서는 KV 캐시 압축 기반 LLM 추론 효율화를 연구하고 있습니다. 데이터 파이프라인 구축부터 모델 서빙의 비용·품질 관리, 플랫폼 성능 개선까지, 조직 전체가 신뢰하고 쓰는 AI 플랫폼을 만드는 일에 관심이 있습니다.",
  github: "https://github.com/juanxiu",
  linkedin: "https://www.linkedin.com/in/yeonsoo-kim-a70b68286/",
  blog: "https://juanxiu.tistory.com/",
  links: [
    { label: "GitHub", href: "https://github.com/juanxiu" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yeonsoo-kim-a70b68286/",
    },
    { label: "Tech Blog", href: "https://juanxiu.tistory.com/" },
  ],
  portrait: "images/portfolio/profile.jpg",
  focus: [
    "원천 데이터 수집부터 가공, 서빙까지 잇는 배치 데이터 파이프라인 설계",
    "모델과 Agent 운영의 비용, 품질, 장애를 정량 모니터링으로 관리하기",
    "GPU 메모리와 Kubernetes 플랫폼의 성능 병목을 찾아 코드 레벨에서 개선하기",
  ],
  skills: [
    "Kubernetes",
    "Argo CD",
    "Docker",
    "GitHub Actions",
    "AWS",
    "GCP",
    "Python",
    "SQL",
    "RAG",
    "LangGraph",
    "Langfuse",
    "LLM-as-a-Judge",
    "Multi-Model Routing",
    "PyTorch",
    "FastAPI",
    "Spring",
    "Java",
    "Go",
  ],
  skillGroups: [
    {
      label: "Infra / MLOps",
      items: [
        "Kubernetes",
        "Argo CD",
        "Docker",
        "GitHub Actions",
        "CI/CD",
        "AWS",
        "GCP",
        "Linux",
      ],
    },
    {
      label: "Data Pipeline",
      items: [
        "Python",
        "SQL",
        "Batch Embedding Pipeline",
        "Clustering",
        "ChromaDB",
      ],
    },
    {
      label: "AI / LLM",
      items: [
        "RAG",
        "LangGraph",
        "Langfuse",
        "LLM-as-a-Judge",
        "Multi-Model Routing",
        "KV Cache Optimization",
        "PyTorch",
        "HuggingFace Transformers",
      ],
    },
    {
      label: "Backend / Languages",
      items: ["FastAPI", "Spring", "Java", "Go"],
    },
  ],
  experience: [
    {
      company: "채널코퍼레이션",
      role: "Forward Deployed Engineer Intern",
      period: "2026.03 - 2026.06",
      description:
        "AX팀에서 고객사 상담 데이터를 AI 상담 에이전트 설정과 개선안으로 전환하는 사내 AI Agent와 데이터 파이프라인을 개발했습니다. LG전자, 티오더 등 엔터프라이즈 고객사의 상담 로그 약 2만 건을 수집, OpenAI Batch 임베딩, 클러스터링, LLM 패턴 추출, RAG 지식 문서 생성, 자동 등록과 인덱싱으로 이어지는 배치 파이프라인으로 자동화하고, 산출물이 데모 환경까지 자동 배포되는 흐름을 만들었습니다.",
      highlights: [
        "상담 데이터 분석-지식 생성-등록을 end-to-end 자동화해 고객사별 수동 세팅 3-4일을 약 1시간으로 단축",
        "Claude Opus, Sonnet, Haiku와 OpenAI 모델을 작업 유형별로 라우팅하고 토큰 사용량 추적과 일일 한도 관리 체계를 구축해 분류/태깅 비용 60-70% 절감",
        "사내 82명이 사용하는 프로덕션 시스템으로 운영하며 2개월 누적 1,800만+ 토큰 규모의 LLM 호출을 모니터링",
        "고객사 API 호출과 커머스 앱 연동이 포함된 상담 실행 시나리오를 구성해 실제 제품 환경에 가까운 검증 흐름 지원",
      ],
      link: {
        label: "회사 기술블로그 읽기",
        href: "https://tech.channel.io/ko/articles/tech-ax-channel-labs-b085ab62",
        summary:
          "채널톡 AX팀에서 고객사 상담 데이터를 AI 상담 에이전트 설정으로 전환하기 위해 사내 AI Agent를 설계한 경험을 정리했습니다. OpenAI Agents SDK 전환, context budget 관리, lazy file loading, tool response 축소처럼 실제 고객 데이터 분석 자동화 과정에서 겪은 문제와 개선 방식을 다룹니다.",
      },
    },
  ],
  research: [
    {
      title: "KV 캐시 압축 예산의 실시간 추적: 칼만 필터 기반 적응형 LLM 추론",
      org: "이화여자대학교 ACPL 연구실 · 학부연구생 (팀 연구)",
      period: "2026.05 - 진행 중",
      status: "예비 실험(MVE) 완료 · 본실험 진행 중 · MLSys 2027 투고 목표",
      description:
        "긴 문맥을 처리할 때 GPU 메모리를 차지하는 KV 캐시(모델이 이미 읽은 내용을 다시 계산하지 않도록 저장해 두는 메모리)를 절반으로 압축하면서 정확도를 지키는 적응형 추론 기법을 연구합니다. 기존 기법들이 입력 처리 시점에 고정해 두던 압축 보정값이 실제로는 생성 내내 변한다는 것을 실측으로 확인했고, 이 값을 토큰 생성 단계마다 칼만 필터로 재추정하는 방법을 검증하고 있습니다. 연구실이 IEEE ACCESS 2026에 출판한 KV 압축 기법(QubitCache)을 확장하는 후속 연구입니다.",
      highlights: [
        "압축 없이 전체 캐시로 재생해 단계별 정답 보정값을 추출하는 데이터 파이프라인을 설계·구현 — 벤치마크 수집·정제부터 약 350GB 트레이스 저장까지 (NVIDIA A6000 48GB)",
        "정답 보정값 궤적이 생성 중에 계속 변한다는 것을 실측으로 확인해 문제 설정 자체를 검증 (Llama-3-8B, 50% 압축, RULER NIAH multi-key 16k 200샘플 · LongBench NarrativeQA/HotpotQA 각 150샘플)",
        "고정값·이동평균·칼만 3종 추적기를 같은 압축 조건에서 교체 비교하는 실험 환경을 구축하고, 2·4·8주차 GO/NO-GO 검증 게이트와 통과 기준을 실험 시작 전에 정의",
        "H2O(NeurIPS 2023), SnapKV(2024), StreamingLLM(ICLR 2024) 등 비교 기법을 공식 구현 기반으로 팀과 분담해 재현, 핵심 대조군인 이동평균은 그리드 탐색으로 최적화해 비교",
      ],
      tags: [
        "PyTorch",
        "HuggingFace Transformers",
        "LLM Inference",
        "KV Cache",
        "Kalman Filter",
        "GPU",
      ],
    },
  ],
  caseStudies: [
    {
      title: "상담 데이터 배치 파이프라인 구축",
      label: "Data Pipeline",
      description:
        "고객사 상담 로그 분석과 AI Agent 설정이 사람 손에 의존해 며칠씩 걸리던 문제를, 데이터 수집-가공-서빙 파이프라인과 운영 모니터링 설계 문제로 재정의했습니다.",
      details: [
        {
          label: "Problem",
          value: "수만 건의 상담 로그에서 Agent 설정과 개선안을 뽑는 작업이 고객사마다 2-3일씩 소요",
        },
        {
          label: "Input",
          value: "상담 로그, 미해결 상담, 오응답 사례, 고객사 API 실행 시나리오",
        },
        {
          label: "System",
          value: "batch embedding pipeline, clustering, model routing, token monitoring, prompt tracing",
        },
        {
          label: "Output",
          value: "고객사별 Agent 설정, RAG 지식 문서, demo-ready 환경 자동 생성",
        },
        {
          label: "Impact",
          value: "분석 시간 2-3일에서 30-40분으로 단축, 분류/태깅 비용 60-70% 절감",
        },
      ],
      insight:
        "AI 품질은 prompt만의 문제가 아니라 데이터 파이프라인, 평가 루프, 운영 모니터링의 문제라는 점을 배웠습니다. 파이프라인이 안정적이어야 그 위의 AI가 신뢰를 얻습니다.",
    },
    {
      title: "투자 회고 AI 제품 실험",
      label: "Evaluation & Observability",
      description:
        "개인 투자자가 매매 이후 판단 근거를 회고하지 못한다는 문제를 사용자 인터뷰와 대면 UT로 정의하고, 매매 기록과 시장 데이터를 사용자의 다음 의사결정을 돕는 AI 회고 맥락으로 재구성했습니다.",
      details: [
        {
          label: "Input Data",
          value: "매매 기록, 시장 데이터, 주가 데이터",
        },
        {
          label: "System",
          value: "retrieval pipeline, Langfuse trace, LLM-as-a-Judge evaluation",
        },
        {
          label: "Output",
          value: "사용자별 투자 판단 근거를 반영한 개인화 회고",
        },
        {
          label: "Impact",
          value: "AI 응답 품질 30%에서 70%로 개선, App Store 출시",
        },
      ],
      insight:
        "LLM 응답 품질은 평가셋, trace, 사용자 피드백이 함께 있어야 반복 개선할 수 있음을 확인했습니다. 작은 팀에서 빠르게 만들고 검증하는 제품 개발 사이클을 경험했습니다.",
    },
  ],
  fitStatement:
    "현대오토에버는 그룹사 전체가 쓰는 AI MLOps 플랫폼과 데이터레이크를 만들고 운영합니다. 저는 상담 데이터 2만 건을 배치 파이프라인으로 구조화해 수동 분석 3-4일을 1시간으로 줄였고, 멀티모델 서빙 비용을 라우팅과 모니터링으로 60-70% 절감했으며, Kubernetes 오픈소스 ArgoCD의 조회 병목을 캐시 구조로 개선했습니다. 만드는 AI를 넘어, 운영되는 AI 플랫폼을 만드는 일이 제가 해온 일입니다.",
  projects: [
    {
      name: "Hedge",
      type: "AI Investment Reflection App",
      period: "2025.08 - 2026.02",
      image: "images/portfolio/hedge-app.png",
      imageAlt: "Hedge app screens shown on a green poster",
      supportingImages: [
        {
          src: "images/portfolio/hedge-architecture.png",
          alt: "Hedge multi-agent architecture diagram",
          title: "Multi-Agent orchestration",
          description:
            "Single Agent 호출 구조를 역할 기반 Agent 구조로 전환했습니다. 중앙 에이전트가 사용자 요청에 따라 주식 데이터 에이전트와 사용자 쿼리 에이전트를 호출하도록 설계했습니다.",
        },
        {
          src: "images/portfolio/agent-evaluation.png",
          alt: "Hedge LLM prompt tracing and evaluation flow",
          title: "RAG, tracing, evaluation",
          description:
            "Sentence-BERT, ChromaDB, Cross-Encoder reranking으로 회고 맥락에 맞는 근거를 검색하고, Langfuse trace와 LLM-as-a-Judge 평가로 응답 품질을 개선했습니다.",
        },
        {
          src: "images/portfolio/realtime-sequence.png",
          alt: "Hedge JWT guardrail sequence diagram",
          title: "JWT 기반 guardrail",
          description:
            "에이전트가 사용자 거래 내역에 직접 접근하지 않도록 JWT에서 검증한 사용자 컨텍스트를 기준으로 데이터 접근 범위를 제한했습니다.",
        },
      ],
      description:
        "개인 투자자가 매매 이후 판단 근거를 정리하기 어렵다는 문제를 사용자 인터뷰와 대면 UT로 정의하고, 매매 기록과 시장 데이터를 기반으로 개인화된 투자 회고를 생성하는 AI 제품을 기획 및 개발했습니다. 단순한 챗봇이 아니라, 사용자의 의사결정 맥락을 데이터 단위로 재구성하고 관련 근거만 검색해 응답에 반영하는 AI Agent 흐름을 설계했습니다.",
      highlights: [
        "시장 데이터와 매매 시점을 회고 맥락 단위로 재구성하는 RAG 흐름 설계",
        "Langfuse trace와 LLM-as-a-Judge 평가로 AI 응답 품질 30%에서 70%로 개선",
        "한국투자증권 API 데이터 수집, 의미 단위 chunking, rate limit 대응을 위한 exponential backoff 적용",
        "JWT 기반 인증 흐름으로 에이전트가 타 사용자의 거래 내역에 접근하지 못하도록 guardrail 설계",
      ],
      tags: ["Python", "Spring", "Java", "RAG", "Langfuse", "JWT"],
      link: "https://www.behance.net/gallery/238904541/Hedge-",
      linkLabel: "프로젝트 소개 보기",
      linkSummary:
        "Behance에 정리된 앱 콘셉트, 주요 화면, 사용자 흐름을 함께 볼 수 있습니다.",
    },
    {
      name: "Safe Path",
      type: "Health-based Route Navigation",
      period: "2026.01 - 2026.03",
      image: "images/portfolio/safepath.png",
      imageAlt: "SafePath service screens on a green poster",
      description:
        "사용자 건강 정보와 환경 데이터를 기반으로 안전한 경로를 안내하는 웹 서비스입니다. 실시간 위치 업데이트, 위험 알림, 환경 데이터 수집 흐름을 고려해 서버리스와 WebSocket 서버 배포 사이의 트레이드오프를 검토하고 운영 비용 관점에서 아키텍처를 결정했습니다.",
      highlights: [
        "GCP 기반 환경 데이터 수집과 FastAPI 서버 배포 흐름을 구성",
        "SSE/serverless 구조와 WebSocket 서버 운영의 장단점을 비교해 실시간 양방향 통신이 필요한 구간을 분리",
        "서버리스 cold start와 AI 라이브러리 로딩 비용을 고려해 LangChain/LangGraph lazy loading 적용",
      ],
      tags: ["Python", "FastAPI", "LangGraph", "WebSocket", "GCP"],
    },
  ],
  openSource: [
    {
      name: "ArgoCD Agent",
      type: "Open Source Contribution",
      period: "2025.07 - 2025.12",
      image: "images/portfolio/argocd-performance.png",
      imageAlt: "ArgoCD Agent performance improvement graph",
      description:
        "GitOps 기반 Kubernetes 배포 도구인 ArgoCD의 production-grade 오픈소스 코드베이스에서 API 서버 직접 조회로 인한 리소스 조회 병목을 발견하고, Informer(List-Watch) 기반 로컬 캐시 조회 구조로 개선해 머지되었습니다.",
      highlights: [
        "애플리케이션 100개 기준 조회 시간 약 19초에서 0.000421초로 단축",
        "Kubernetes API 호출 횟수 300회에서 200회로 감소",
        "캐시 미동기화 상황을 고려한 직접 조회 fallback 설계로 운영 안정성 확보",
        "unit/e2e 테스트를 추가해 성능 최적화가 데이터 최신성과 운영 안정성을 해치지 않도록 검증",
      ],
      tags: ["Go", "Kubernetes", "Argo CD", "GitOps", "Open Source"],
      link: "https://github.com/argoproj-labs/argocd-agent/pull/525",
      secondaryImage: "images/portfolio/argocd-architecture.png",
      secondaryImageAlt: "ArgoCD Agent informer cache architecture diagram",
    },
  ],
  awards: [
    "2025 Open Source Contribution Academy Excellence Award",
    "한국IT비즈니스진흥협회장상",
  ],
  education: {
    school: "이화여자대학교",
    major: "Computer Science & Engineering",
    period: "2023 - 2027",
    gpa: "GPA 4.03 / 4.5",
  },
  activities: [
    "AWS Cloud Club Captain, Ewha Womans University",
    "GDGoC Ewha Core Member",
    "디프만 서버 개발자",
    "신촌연합 IT 창업동아리 CEOS 백엔드 개발자",
  ],
  certifications: ["AWS Certified Solutions Architect - Associate", "SQL Developer (SQLD)"],
};
