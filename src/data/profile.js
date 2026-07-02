export const profile = {
  name: "Yeonsoo Kim",
  displayName: "김연수",
  role: "Product Engineer Intern | AI Product & Data Systems",
  location: "Seoul, Korea",
  headline:
    "기술로 문제를 해결하고, 비정형 데이터를 사용자 의사결정을 돕는 AI 제품 시스템으로 구조화합니다.",
  aboutTitle: "고객의 합리적 결정을 돕는 AI 제품을 만듭니다.",
  summary:
    "B2B SaaS AI 상담 제품의 고객사 온보딩을 지원하는 사내 AI Agent를 개발하며, 엔터프라이즈 상담 데이터 2만 건 분석을 자동화했습니다. 흩어진 상담 로그와 오응답 사례를 Agent 설정, 개선안, 실행 시나리오로 구조화해 수동 진단 시간을 2-3일에서 30-40분으로 단축했습니다. 레브잇 PMF팀이 만드는 AI 쇼핑 비서처럼, 복잡한 정보 속에서 사용자가 더 합리적인 결정을 내릴 수 있도록 데이터 구조화, LLM evaluation, retrieval, prompt tracing, 제품 실험을 연결하는 일에 관심이 있습니다.",
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
    "흩어진 고객/상품 정보를 LLM이 활용 가능한 의사결정 지식으로 구조화하기",
    "Agent evaluation, retrieval, prompt tracing을 제품 개선 루프로 연결하기",
    "문제 정의부터 AI 기능 구현, 검증, 운영 비용 최적화까지 제로투원으로 빠르게 반복하기",
  ],
  skills: [
    "OpenAI SDK",
    "Claude",
    "Langfuse",
    "RAG",
    "LLM-as-a-Judge",
    "Prompt Tracing",
    "Data Structuring",
    "Product Iteration",
    "Multi-Agent",
    "Multi-Model Routing",
    "Python",
    "Spring",
    "Java",
    "FastAPI",
    "LangGraph",
    "Go",
    "Kubernetes",
    "Argo CD",
    "GitHub Actions",
    "AWS",
  ],
  experience: [
    {
      company: "채널코퍼레이션",
      role: "Forward Deployed Engineer Intern",
      period: "2026.03 - 2026.06",
      description:
        "AX팀이 고객사의 상담 데이터를 AI 상담 에이전트 설정과 개선안으로 전환할 수 있도록 사내 AI Agent 개발에 참여했습니다. LG전자, 티오더 등 엔터프라이즈 고객사의 상담 로그, 미해결 상담, 오응답 사례를 분석하고 intent, unresolved case, wrong-answer pattern, API action scenario 단위로 구조화했습니다. 사용자가 원하는 문제 해결 흐름을 기술적으로 모델링하고, 고객사별 개선안과 실행 시나리오를 데모 환경에서 바로 검증할 수 있도록 만들었습니다.",
      highlights: [
        "엔터프라이즈 고객사의 상담 데이터 약 2만 건 분석을 자동화",
        "상담 로그 분석, 미해결 상담 진단, 오응답 사례 검토 시간을 2-3일에서 30-40분으로 단축",
        "Claude Opus, Sonnet, Haiku와 OpenAI 모델을 작업 유형별로 라우팅하고 토큰 사용량을 추적해 분류/태깅 비용 60-70% 절감",
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
  caseStudies: [
    {
      title: "상담 로그 분석 자동화",
      label: "상담 데이터 구조화",
      description:
        "고객사 상담 로그가 많아 AI 상담 Agent 설정과 진단이 수동으로 오래 걸리는 문제를, 기술로 해결해야 할 데이터 구조화와 Agent workflow 설계 문제로 다시 정의했습니다.",
      details: [
        {
          label: "Problem",
          value: "반복 상담과 미해결 사례 속에서 고객사가 진짜 원하는 해결 흐름을 빠르게 찾기 어려움",
        },
        {
          label: "Input",
          value: "상담 로그, 미해결 상담, 오응답 사례, 고객사 API 실행 시나리오",
        },
        {
          label: "System",
          value: "Agent runtime, model routing, token tracking, prompt tracing",
        },
        {
          label: "Output",
          value: "고객사별 Agent 개선안, 실행 시나리오, demo-ready setting",
        },
        {
          label: "Impact",
          value: "분석 시간 2-3일에서 30-40분으로 단축, 분류/태깅 비용 60-70% 절감",
        },
      ],
      insight:
        "LLM 제품 품질은 prompt만의 문제가 아니라 데이터 구조, 평가 루프, 사용자 workflow 설계 문제라는 점을 배웠습니다. 이 관점은 흩어진 상품명, 이미지, 후기, 상세페이지를 하나의 이해 체계로 통합하는 카탈로그 문제와 맞닿아 있습니다.",
    },
    {
      title: "투자 회고 AI 제품 실험",
      label: "사용자 검증 기반 제품 실험",
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
        "제품 실험에서 LLM 응답 품질은 평가셋, trace, 사용자 피드백이 함께 있어야 반복 개선할 수 있음을 확인했습니다. 작은 팀에서 빠르게 만들고 검증하는 스타트업식 제품 개발을 경험했습니다.",
    },
  ],
  fitStatement:
    "레브잇의 New Catalog System이 흩어진 상품명, 이미지, 상세페이지, 리뷰를 하나의 상품 이해 체계로 통합해 고객의 합리적 의사결정을 돕는 문제라면, 저는 흩어진 상담 로그, 미해결 사례, 오응답 패턴, API 실행 시나리오를 AI Agent가 활용 가능한 구조로 바꾼 경험이 있습니다.",
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
        "사용자 건강 정보와 환경 데이터를 기반으로 안전한 경로를 안내하는 웹 서비스입니다. 실시간 위치 업데이트, 위험 알림, 환경 데이터 수집 흐름을 고려해 서버리스와 WebSocket 서버 배포 사이의 트레이드오프를 검토했습니다.",
      highlights: [
        "GCP 기반 환경 데이터 수집과 FastAPI 서버 배포 흐름을 구성",
        "SSE/serverless 구조와 WebSocket 서버 운영의 장단점을 비교해 실시간 양방향 통신이 필요한 구간을 분리",
        "서버리스 cold start와 AI 라이브러리 로딩 비용을 고려해 LangChain/LangGraph lazy loading 적용",
      ],
      tags: ["Python", "FastAPI", "LangGraph", "WebSocket"],
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
        "production-grade Kubernetes 오픈소스 코드베이스에서 API 서버 직접 조회로 인한 리소스 조회 병목을 발견하고, Informer(List-Watch) 기반 로컬 캐시 조회 구조로 개선했습니다.",
      highlights: [
        "애플리케이션 100개 기준 조회 시간 약 19초에서 0.000421초로 단축",
        "Kubernetes API 호출 횟수 300회에서 200회로 감소",
        "캐시 미동기화 상황을 고려한 직접 조회 fallback 설계",
        "unit/e2e 테스트를 추가해 성능 최적화가 데이터 최신성과 운영 안정성을 해치지 않도록 검증",
      ],
      tags: ["Go", "Kubernetes", "Argo CD", "Open Source"],
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
  certifications: ["AWS Certified Solutions Architect - Associate", "SQL Developer"],
};
