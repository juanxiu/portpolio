import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Github, Maximize2, X } from 'lucide-react';
import { extraPrs, focus, links, prUrl, skills } from './content';

const asset = path => `${import.meta.env.BASE_URL}${path}`;
const diagrams = 'images/autoever/';
const diagramSizes = {
  'lookup-paths.svg': [1001, 621],
  'operator-flow.svg': [1218, 811],
  'runtime-architecture.svg': [1281, 991],
  'bluegreen-deployment.svg': [1281, 921],
};

function External({ href, children, className = '' }) {
  return <a className={`ae-link ${className}`} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;
}

function SectionHeading({ number, eyebrow, title, children }) {
  return <div className="ae-section-heading"><div className="ae-section-index">{number} <span>{eyebrow}</span></div><h2>{title}</h2>{children && <p className="ae-section-intro">{children}</p>}</div>;
}

function Diagram({ file, title, caption, onOpen }) {
  const src = asset(`${diagrams}${file}`);
  const [width, height] = diagramSizes[file];
  return <figure className="ae-figure"><button className="ae-diagram-button" onClick={() => onOpen({ src, title, caption })} aria-label={`${title} 크게 보기`}><img src={src} width={width} height={height} alt={title} loading="lazy" decoding="async" /><span className="ae-zoom"><Maximize2 size={14} aria-hidden="true" /> 크게 보기</span></button><figcaption><strong>{title}</strong><span>{caption}</span></figcaption></figure>;
}

function EvidenceImage({ path, width, height, title, caption, onOpen }) {
  const src = asset(path);
  return <figure className="ae-figure ae-evidence-image">
    <button className="ae-diagram-button" onClick={() => onOpen({ src, title, caption })} aria-label={`${title} 크게 보기`}>
      <img src={src} width={width} height={height} alt={title} loading="lazy" decoding="async" />
      <span className="ae-zoom"><Maximize2 size={14} aria-hidden="true" /> 크게 보기</span>
    </button>
    <figcaption><strong>{title}</strong><span>{caption}</span></figcaption>
  </figure>;
}

function Paragraph({ label, children }) {
  return <div className="ae-story"><h3>{label}</h3>{children}</div>;
}

export default function App() {
  const [preview, setPreview] = useState(null);
  const dialogRef = useRef(null);
  useEffect(() => {
    // The fragment target is inserted by React after the HTML document loads.
    const frame = requestAnimationFrame(() => {
      const id = window.location.hash.slice(1);
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (!preview) return;
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = overflow; };
  }, [preview]);

  return <div className="ae-site">
    <a className="ae-skip" href="#main-content">본문으로 이동</a>
    <header className="ae-header"><div className="ae-header-inner">
      <a className="ae-brand" href="#top">김연수<span>PLATFORM ENGINEER</span></a>
      <nav aria-label="포트폴리오 주요 항목"><a href="#open-source">오픈소스</a><a href="#operator">Kubernetes</a><a href="#delivery">클라우드 배포</a><a href="#experience">경험</a><a href="#about">소개</a></nav>
      <a className="ae-github" href={links.github} target="_blank" rel="noopener noreferrer" aria-label="김연수 GitHub 새 창에서 열기"><Github size={20} /></a>
    </div></header>

    <main id="main-content">
      <section className="ae-hero ae-wrap" id="top">
        <div className="ae-hero-grid"><div>
          <p className="ae-eyebrow">HYUNDAI AUTOEVER · 2026 PORTFOLIO</p>
          <h1>Yeonsoo Kim</h1>
          <p className="ae-role">플랫폼 엔지니어 · 김연수</p>
          <p className="ae-lead">Kubernetes 운영 도구의 조회 성능을 개선하고, 배포 상태 점검과 컨테이너 배포를 자동화했습니다. 반복 작업을 줄이는 과정에서도 데이터의 최신성과 서비스 준비 상태를 함께 확인했습니다.</p>
          <div className="ae-hero-actions"><a className="ae-button" href="#open-source">대표 사례 살펴보기<ArrowDown size={17} /></a><External href={links.github}>GitHub</External></div>
        </div>
        <aside className="ae-focus" aria-labelledby="focus-title"><p className="ae-eyebrow" id="focus-title">CURRENTLY FOCUSED ON</p>{focus.map((item, i) => <div className="ae-focus-item" key={item.title}><span className="ae-focus-number">0{i + 1}</span><div><h2>{item.title}</h2><p>{item.text}</p></div></div>)}</aside>
        </div>
      </section>

      <section className="ae-section ae-wrap" id="open-source">
        <SectionHeading number="01" eyebrow="OPEN SOURCE" title="Argo CD Agent 오픈소스 기여">Argo CD Agent · Go 코드 개선과 Kubernetes 매니페스트 수정</SectionHeading>
        <div className="ae-case-grid">
          <div className="ae-narrative">
            <Paragraph label="Application 조회 구조 분석"><p>Argo CD Agent에 기여하며 로컬 클러스터에서 Application 조회 경로를 분석했습니다. CRD로 정의된 리소스를 조회할 때마다 Kubernetes API 서버를 호출하고 있어, 일반 조회에 기존 로컬 메모리 캐시를 활용하도록 개선했습니다.</p></Paragraph>
            <Paragraph label="조회 경로 분리"><p>캐시는 리소스 변경 사항을 반영하지만 실제 상태보다 늦게 갱신될 수 있습니다. 업데이트 과정에서 오래된 정보를 반복해서 읽으면 충돌을 재시도해도 해결되지 않을 수 있어, 업데이트용 조회는 API 서버를 직접 호출하도록 유지했습니다.</p><p>리뷰에서는 캐시의 공유 객체를 호출자가 변경할 위험도 확인했습니다. 원본을 보호하도록 복사본을 반환하고, 수정한 코드의 테스트와 리뷰를 거쳐 기여가 병합됐습니다.</p></Paragraph>

            <div className="ae-evidence-links"><External href={prUrl(525)}>PR #525 · 변경 코드와 리뷰</External><External href="https://github.com/argoproj-labs/argocd-agent/actions/runs/18391317892">병합 시점의 CI 결과</External></div>
          </div>
          <div className="ae-visual-column"><Diagram file="lookup-paths.svg" title="Application 조회 경로" caption="PR #525의 일반 조회와 업데이트용 조회 경로를 중심으로 재구성했습니다." onOpen={setPreview} /></div>
        </div>
        <div className="ae-test-evidence">
          <h3>기여 성과</h3>
          <ul className="ae-bullets ae-results-list">
            <li>100개 Application 조회 실험: <strong>약 19초 → 0.421밀리초, 조회 시간 99.99% 이상 단축</strong></li>
            <li>같은 실험의 API 호출: <strong>300회 → 200회 감소</strong></li>
            <li>코드와 매니페스트 개선: <strong>공식 프로젝트에 PR 5개 병합</strong></li>
            <li>오픈소스 기여 활동: <strong>한국IT비즈니스진흥협회장상 수상</strong></li>
          </ul>
          <p className="ae-measurement-note">성능 수치는 Prometheus로 별도 측정해 오픈소스 발표회에 사용한 조회 실험 결과입니다.</p>
          <EvidenceImage path="images/portfolio/argocd-performance.png" width={1326} height={325} title="Prometheus API 호출 측정 자료" caption="당시 발표에 사용한 API 호출 횟수 그래프입니다. 표시된 구간의 누적값 증가량은 각각 300회와 200회이며, 조회 시간은 별도로 측정했습니다." onOpen={setPreview} />
        </div>
        <div className="ae-support-case"><div><span className="ae-small-label">추가 기여 · PR #574</span><h3>Redis 통신에 필요한 NetworkPolicy 보완</h3><p>NetworkPolicy를 집행하는 환경에서 Redis 접근이 제한된다는 이슈를 확인하고, 대상 Pod의 레이블과 Redis 방향 TCP 6379 Egress 정책을 매니페스트에 반영했습니다. 리뷰를 통해 Agent와 Principal의 적용 범위를 보완하고 Helm과 Kustomize의 통신 방향을 일치시켰습니다.</p></div><External href={prUrl(574)}>정책 변경과 리뷰 확인</External></div>
        <details className="ae-details">
          <summary>추가 PR 및 프로젝트 구조 자료<span>자세히 보기</span></summary>
          <div className="ae-details-body">
            <div className="ae-pr-list">{extraPrs.map(pr => <article key={pr.number}><External href={prUrl(pr.number)}>#{pr.number} · {pr.title}</External><p>{pr.text}</p></article>)}</div>
            <EvidenceImage path="images/portfolio/argocd-architecture.png" width={958} height={583} title="Argo CD Agent 프로젝트 전체 구조" caption="기존 포트폴리오의 프로젝트 구조 자료입니다. 전체 시스템 구성과 본인이 개선한 Application 조회 경로는 구분합니다." onOpen={setPreview} />
          </div>
        </details>
      </section>

      <section className="ae-section ae-section-tint" id="operator"><div className="ae-wrap">
        <SectionHeading number="02" eyebrow="KUBERNETES OPERATOR" title="Kubernetes 모니터링 Operator 개발">스터디 프로젝트 · CRD와 Reconcile을 활용한 배포 상태 감시</SectionHeading>
        <div className="ae-operator-copy">
          <Paragraph label="구현 목적">
            <ul className="ae-bullets">
              <li>배포할 때마다 수동으로 조회하던 애플리케이션 상태 점검 자동화</li>
              <li>Deployment의 배포 진행과 결과를 감지해 운영자에게 알림 전달</li>
            </ul>
          </Paragraph>
          <Paragraph label="리소스 관리 및 상태 판단">
            <ul className="ae-bullets">
              <li>CRD로 배포 설정의 구조 정의, Reconcile에서 CR을 읽어 Deployment 구성</li>
              <li>Pod가 실행 중이어도 readiness probe에 실패할 수 있는 상황 고려</li>
              <li>Deployment 상태를 조회해 애플리케이션의 서비스 준비 여부 판단</li>
            </ul>
          </Paragraph>
          <Paragraph label="알림 검증">
            <ul className="ae-bullets">
              <li>서비스 준비 여부를 포함한 배포 상태 알림 구현</li>
              <li>Deployment의 실제 상태 변화와 알림 수신 내역을 대조해 동작 확인</li>
            </ul>
          </Paragraph>
        </div>
        <Diagram file="operator-flow.svg" title="Kubernetes Operator 아키텍처" caption="스터디 구현을 바탕으로 재구성했습니다. Operator는 API 서버를 통해 CR과 Deployment를 관리하며, kubelet이 수행한 readiness probe의 결과는 리소스 상태에 반영됩니다." onOpen={setPreview} />
      </div></section>

      <section className="ae-section ae-wrap" id="delivery">
        <SectionHeading number="03" eyebrow="CLOUD & DELIVERY" title="실시간 결제 시스템 — CI/CD 및 블루그린 배포">졸업프로젝트 · AWS와 GCP를 활용한 서비스 분리 및 독립 배포</SectionHeading>
        <div className="ae-delivery-intro">
          <Paragraph label="서비스 및 실행 환경">
            <ul className="ae-bullets">
              <li>GCP의 데이터 수집 서비스와 AWS의 백엔드를 분리하고 gRPC로 연결</li>
              <li>서비스별 Dockerfile과 Docker Compose로 의존성과 실행 설정 관리</li>
              <li>각 서비스의 독립 배포 구성, EC2는 퍼블릭 서브넷에 배치하고 RDS는 프라이빗 서브넷에 분리</li>
            </ul>
          </Paragraph>
          <Paragraph label="배포 자동화">
            <ul className="ae-bullets">
              <li>인스턴스에 접속해 컨테이너를 수동으로 교체하던 배포 절차 개선</li>
              <li>GitHub Actions에 CodeBuild와 CodeDeploy를 연계해 애플리케이션 빌드와 새 버전 배포 자동화</li>
              <li><strong>배포 시간 30분 → 10분, 약 67% 단축</strong></li>
            </ul>
          </Paragraph>
        </div>
        <Diagram file="runtime-architecture.svg" title="실시간 결제 시스템 배포 아키텍처" caption="GCP 수집 서비스와 AWS 백엔드의 독립 배포 구성입니다. 두 서비스의 gRPC 연결은 논리적 통신 관계로 표시했습니다." onOpen={setPreview} />
        <div className="ae-bluegreen-copy">
          <h3>블루그린 배포 및 트래픽 전환</h3>
          <ul className="ae-bullets">
            <li>서로 다른 EC2를 Blue와 Green 환경으로 분리해 두 버전 실행</li>
            <li>Blue가 서비스 요청을 처리하는 동안 Green에 새 버전 배포</li>
            <li>AWS 로드밸런서의 대상 그룹과 라우팅을 Green으로 전환해 서비스 중단 위험 최소화</li>
          </ul>
        </div>
        <Diagram file="bluegreen-deployment.svg" title="CI/CD 파이프라인 및 Blue·Green 트래픽 전환" caption="GitHub Actions와 CodeBuild·CodeDeploy의 CI/CD 흐름, 로드밸런서의 트래픽 전환을 구분했습니다. Blue와 Green은 서로 다른 EC2 실행 환경입니다." onOpen={setPreview} />

      </section>

      <section className="ae-section ae-section-tint" id="homelab"><div className="ae-wrap">
        <SectionHeading number="04" eyebrow="LINUX HOME LAB" title="Linux 홈서버 구축 및 모니터링">Linux 스터디와 홈서버 구축 · 구성에서 동작 확인까지</SectionHeading>
        <div className="ae-home-grid"><Paragraph label="가상머신과 원격 접속 환경"><p>Linux 스터디에서 운영체제와 네트워크의 기초를 실습하고, Proxmox에서 가상머신과 Linux 운영체제를 설치했습니다. 네트워크를 연결한 뒤 Tailscale과 MagicDNS를 설정해 홈서버에 원격으로 접속하고 터미널에서 서버를 조작했습니다.</p></Paragraph><Paragraph label="CPU 사용률 기반 알림"><p>Linux에서 CPU 사용률을 의도적으로 높이는 스크립트를 실행했습니다. n8n이 실제 CPU 사용률을 읽고 기준을 넘으면 Slack으로 알리도록 구성한 뒤, 부하가 발생했을 때 알림이 도착하는지 확인했습니다.</p></Paragraph></div>
        <ol className="ae-process" aria-label="홈서버 실습 과정"><li><span>01</span>Linux 가상머신 구성</li><li><span>02</span>원격 접속 확인</li><li><span>03</span>CPU 부하 발생</li><li><span>04</span>사용률 기반 알림 확인</li></ol>
      </div></section>

      <section className="ae-section ae-wrap" id="experience">
        <SectionHeading number="05" eyebrow="WORK EXPERIENCE" title="채널코퍼레이션 인턴 — Forward Deployed Engineer">B2B AI SaaS 기업 · 2026.03–2026.06</SectionHeading>
        <div className="ae-intern-prose ae-narrative">
          <Paragraph label="고객 시스템 연동">
            <p>고객사 시스템의 데이터와 기능을 AI 솔루션에서 활용하도록 연동해 고객 서비스 과정을 자동화했습니다. 이를 통해 <strong>AI를 활용한 고객 서비스의 처리 성공률을 평균 약 20%에서 80%로 높였습니다.</strong></p>
          </Paragraph>
          <Paragraph label="에이전트 플랫폼 구축 및 도입 지원">
            <p>고객은 데이터 분석과 제품 업로드를 간편하게 수행하길 원했습니다. 이 흐름을 지원하는 에이전트 통합 플랫폼을 구축하고 사용 방법을 교육해, 도입 단계부터 고객이 솔루션을 직접 활용할 수 있도록 했습니다. 그 결과 <strong>솔루션 도입 기간을 6주에서 4주로 단축했습니다.</strong></p>
          </Paragraph>
          <External href={links.internship}>회사 기술블로그 · 관련 개발 경험</External>
        </div>
      </section>

      <section className="ae-section ae-section-tint" id="musai"><div className="ae-wrap">
        <SectionHeading number="06" eyebrow="BACKEND PROJECT" title="MUSAI 백엔드 개발">악기 대여 및 시연 중개 서비스 · Backend · 2024.09–2025.01</SectionHeading>
        <div className="ae-musai-grid">
          <div className="ae-narrative">
            <Paragraph label="예약 및 재고 동시성 제어">
              <p>악기 대여 예약과 점주의 재고 관리 기능을 개발했습니다. 같은 악기에 예약이 동시에 들어와도 재고 수량이 어긋나지 않도록, 예약 저장과 재고 차감을 하나의 트랜잭션으로 묶고 비관적 락을 적용했습니다.</p>
            </Paragraph>
            <Paragraph label="서버 오류 모니터링">
              <p>운영 중 발생하는 오류를 확인할 수 있도록 서버 예외를 Sentry와 연동하고 알림을 설정했습니다. 오류가 발생한 시점과 내용을 확인할 수 있는 모니터링 환경을 구성했습니다.</p>
            </Paragraph>
            <p className="ae-project-outcome">MUSAI 프로젝트로 <strong>세아해암학술장학재단 커리어챌린지 장학금 300만 원을 받았습니다.</strong></p>
            <External href="https://github.com/TEAM-PEDALGENIE/PedalGenie-Back">MUSAI 백엔드 저장소</External>
          </div>
          <EvidenceImage path="images/autoever/musai-service.jpg" width={1600} height={900} title="MUSAI 서비스 화면" caption="악기 검색과 대여 예약을 제공하는 프로젝트의 기존 소개 이미지입니다." onOpen={setPreview} />
        </div>
      </div></section>

      <section className="ae-section ae-wrap ae-research" id="research">
        <SectionHeading number="07" eyebrow="RESEARCH" title="LLM의 KV 캐시 압축에 따른 성능 저하 개선 연구">이화여자대학교 AI컴퓨팅 플랫폼 연구실 · 학부연구생</SectionHeading>
        <p className="ae-research-goal">LLM의 이전 계산 결과를 저장하는 KV 캐시를 줄이면서 답변 품질 저하를 완화하는 방법을 연구했습니다. 캐시에서 제외한 정보가 답변 생성에 얼마나 기여했는지 일부 관측값으로 추정하고, 그 값을 계산에 다시 반영하는 접근을 실험했습니다.</p>
        <div className="ae-research-grid"><Paragraph label="관측값 편향 분석"><p>반복 실험에서 관측값이 한쪽으로 치우쳐 초기 추정 방식의 오차가 커지는 현상을 발견했습니다. 전체 계산값과 추정값의 차이를 단계별로 비교해 오차가 누적되는 구간과 표본이 대표성을 잃는 조건을 확인했습니다.</p></Paragraph><Paragraph label="추정 방식 재설계 및 검증"><p>치우친 관측값을 반영하도록 추정 방식을 다시 설계했습니다. 입력과 압축 조건을 고정한 동일 벤치마크에서 검증해 기존 방식보다 낮은 오차를 확인하고, 관측 표본 수에 따른 정확도와 추가 메모리 사용량을 함께 비교했습니다.</p></Paragraph></div>
        <p className="ae-research-takeaway">성능 수치만 비교하지 않고 오차의 원인을 좁혀가며, 자원 사용량과 결과의 품질을 함께 검증했습니다.</p>
      </section>

      <section className="ae-section ae-section-tint" id="about"><div className="ae-wrap">
        <SectionHeading number="08" eyebrow="BACKGROUND" title="기술 역량 및 주요 활동" />
        <div className="ae-background-grid">
          <div><h3>기술 스택</h3><dl className="ae-skills">{skills.map(skill => <div key={skill.label}><dt>{skill.label}</dt><dd>{skill.technologies}</dd></div>)}</dl></div>
          <div className="ae-credentials">
            <article><span className="ae-small-label">COMMUNITY</span><h3>클라우드·AI 연합동아리 공동 회장</h3><p>10개 대학, 200명 이상이 참여하는 연합동아리의 초기 공동 회장을 맡았습니다. 커뮤니티 지원으로 무료 워크숍을 열고, 사전 설문을 바탕으로 실습 난이도와 멘토링을 조정했습니다. 매 행사에 100명 이상이 참여했으며, 차기 회장단에 운영 경험을 전수해 후속 활동을 지원했습니다.</p></article>
            <article><span className="ae-small-label">EDUCATION</span><h3>이화여자대학교</h3><p>컴퓨터공학 전공</p></article>
          </div>
        </div>
      </div></section>
    </main>
    <footer className="ae-footer ae-wrap"><div><strong>김연수 <span>Yeonsoo Kim</span></strong><p>컨테이너 플랫폼 구축 및 운영 포트폴리오</p></div><div className="ae-footer-links"><External href={links.github}>GitHub</External><External href={links.linkedin}>LinkedIn</External><External href={links.blog}>기술 블로그</External></div><p className="ae-footer-note">© 2026 Yeonsoo Kim. 개인 지원용 포트폴리오입니다.</p></footer>
    <dialog className="ae-lightbox" ref={dialogRef} onCancel={() => setPreview(null)} onClick={event => { if (event.target === event.currentTarget) setPreview(null); }} aria-labelledby="preview-title">
      {preview && <div className="ae-lightbox-inner"><div className="ae-lightbox-header"><h2 id="preview-title">{preview.title}</h2><button autoFocus onClick={() => setPreview(null)} aria-label="이미지 확대 닫기"><X size={24} /></button></div><div className="ae-lightbox-scroll"><img src={preview.src} alt={preview.title} /></div><p>{preview.caption}</p></div>}
    </dialog>
  </div>;
}
