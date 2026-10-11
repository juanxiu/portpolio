import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Download, Github, Maximize2, X } from 'lucide-react';
import { extraPrs, focus, links, prUrl, skills } from './content';

const asset = path => `${import.meta.env.BASE_URL}${path}`;
const diagrams = 'images/autoever/';
const diagramSizes = {
  'lookup-paths.svg': [900, 565],
  'operator-flow.svg': [900, 675],
  'runtime-architecture.svg': [1200, 785],
  'bluegreen-deployment.svg': [1200, 690],
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
          <p className="ae-role">컨테이너 플랫폼 구축 및 운영 지원</p>
          <h1>운영 효율과 안정성을<br />함께 고려합니다.</h1>
          <p className="ae-lead">Kubernetes 운영 도구의 조회 성능을 개선하고, 배포 상태 점검과 컨테이너 배포를 자동화했습니다. 반복 작업을 줄이는 과정에서도 데이터의 최신성과 서비스 준비 상태를 함께 확인했습니다.</p>
          <div className="ae-hero-actions"><a className="ae-button" href="#open-source">대표 사례 살펴보기<ArrowDown size={17} /></a><External href={links.github}>GitHub</External></div>
        </div>
        <aside className="ae-focus" aria-labelledby="focus-title"><p className="ae-eyebrow" id="focus-title">CURRENTLY FOCUSED ON</p>{focus.map((item, i) => <div className="ae-focus-item" key={item.title}><span className="ae-focus-number">0{i + 1}</span><div><h2>{item.title}</h2><p>{item.text}</p></div></div>)}</aside>
        </div>
        <dl className="ae-metrics"><div><dt>100개 Application 조회 실험</dt><dd>99.99<span>% 이상 단축</span></dd><p>약 19초 → 0.421밀리초</p></div><div><dt>컨테이너 빌드·배포 자동화</dt><dd>30 → 10<span>분</span></dd><p>수동 배포 시간 대비 약 67% 단축</p></div><div><dt>Argo CD Agent 오픈소스 기여</dt><dd>5<span>개 PR 병합</span></dd><p>조회 경로, 통신 정책, 테스트 개선</p></div></dl>
      </section>

      <section className="ae-section ae-wrap" id="open-source">
        <SectionHeading number="01" eyebrow="OPEN SOURCE" title="조회는 빠르게, 업데이트는 최신 정보로.">Argo CD Agent · Go 코드 개선과 Kubernetes 매니페스트 수정</SectionHeading>
        <div className="ae-case-grid">
          <div className="ae-narrative">
            <Paragraph label="반복 조회에서 찾은 개선 지점"><p>Argo CD Agent에 기여하며 로컬 클러스터에서 Application 조회 경로를 분석했습니다. CRD로 정의된 리소스를 조회할 때마다 Kubernetes API 서버를 호출하고 있어, 일반 조회에 기존 로컬 메모리 캐시를 활용하도록 개선했습니다.</p></Paragraph>
            <Paragraph label="조회 목적에 따라 다른 경로 선택"><p>캐시는 리소스 변경 사항을 반영하지만 실제 상태보다 늦게 갱신될 수 있습니다. 업데이트 과정에서 오래된 정보를 반복해서 읽으면 충돌을 재시도해도 해결되지 않을 수 있어, 업데이트용 조회는 API 서버를 직접 호출하도록 유지했습니다.</p><p>리뷰에서는 캐시의 공유 객체를 호출자가 변경할 위험도 확인했습니다. 원본을 보호하도록 복사본을 반환하고, 수정한 코드의 테스트와 리뷰를 거쳐 기여가 병합됐습니다.</p></Paragraph>
            <div className="ae-result"><Check size={19} aria-hidden="true" /><p><strong>100개 Application 조회 실험에서 99.99% 이상 시간 단축</strong>Prometheus로 별도 측정해 공식 오픈소스 발표회에서 사용한 결과입니다. 조회 시간은 약 19초에서 0.421밀리초로, API 호출은 300회에서 200회로 줄었습니다.</p></div>
            <div className="ae-evidence-links"><External href={prUrl(525)}>PR #525 · 변경 코드와 리뷰</External><External href="https://github.com/argoproj-labs/argocd-agent/actions/runs/18391317892">병합 시점의 CI 결과</External></div>
          </div>
          <div className="ae-visual-column"><Diagram file="lookup-paths.svg" title="조회 목적에 따른 캐시와 API 서버의 역할" caption="PR #525의 일반 조회와 업데이트용 조회 경로를 중심으로 재구성했습니다." onOpen={setPreview} /><div className="ae-measurement"><p className="ae-eyebrow">MEASURED RESULT</p><div><span>조회 시간</span><strong>19초 <span>→</span> 0.421ms</strong></div><div><span>API 호출</span><strong>300회 <span>→</span> 200회</strong></div><p>100개 Application을 대상으로 한 조회 실험의 결과이며, 전체 서비스 응답 시간의 개선율을 의미하지 않습니다.</p></div></div>
        </div>
        <div className="ae-support-case"><div><span className="ae-small-label">추가 기여 · PR #574</span><h3>Redis 통신에 필요한 NetworkPolicy 보완</h3><p>NetworkPolicy를 집행하는 환경에서 Redis 접근이 제한된다는 이슈를 확인하고, 대상 Pod의 레이블과 Redis 방향 TCP 6379 Egress 정책을 매니페스트에 반영했습니다. 리뷰를 통해 Agent와 Principal의 적용 범위를 보완하고 Helm과 Kustomize의 통신 방향을 일치시켰습니다.</p></div><External href={prUrl(574)}>정책 변경과 리뷰 확인</External></div>
        <details className="ae-details"><summary>추가로 병합된 PR 3개와 성능 측정 자료<span>자세히 보기</span></summary><div className="ae-details-body"><div className="ae-pr-list">{extraPrs.map(pr => <article key={pr.number}><External href={prUrl(pr.number)}>#{pr.number} · {pr.title}</External><p>{pr.text}</p></article>)}</div><figure className="ae-raw-chart"><button onClick={() => setPreview({ src: asset('images/portfolio/argocd-performance.png'), title: 'API 호출 횟수 측정 자료', caption: 'Prometheus 측정 자료의 API 조회량 그래프. 누적값 변화로 표시된 구간을 확인합니다.' })} aria-label="API 호출 횟수 측정 자료 크게 보기"><img src={asset('images/portfolio/argocd-performance.png')} alt="API 호출 횟수 변화가 표시된 Prometheus 측정 그래프" loading="lazy" /></button><figcaption>당시 발표에 사용한 API 호출 측정 자료. 조회 시간 수치와는 별도의 지표입니다.</figcaption></figure></div></details>
      </section>

      <section className="ae-section ae-section-tint" id="operator"><div className="ae-wrap">
        <SectionHeading number="02" eyebrow="KUBERNETES OPERATOR" title="실행 여부를 넘어, 서비스 준비 상태를 확인하다.">스터디 프로젝트 · CRD와 Reconcile을 활용한 배포 상태 감시</SectionHeading>
        <div className="ae-case-grid">
          <div className="ae-narrative"><Paragraph label="수동 점검을 줄이기 위한 Operator"><p>배포할 때마다 상태를 직접 조회하는 부담을 줄이고자 모니터링 Operator를 개발했습니다. 배포 설정을 일관되게 관리하도록 CRD로 설정의 구조를 정의하고, 컨트롤러의 Reconcile에서 CR을 읽어 Deployment를 구성했습니다.</p></Paragraph>
          <Paragraph label="배포 완료를 판단하는 기준"><p>Pod가 실행 중이어도 readiness probe에 실패하면 서비스가 준비되지 않을 수 있다는 점을 고려했습니다. 따라서 리소스 구성만으로 완료를 판단하지 않고 Deployment의 상태를 조회해 서비스 준비 여부를 확인하도록 구현했습니다.</p></Paragraph>
          <Paragraph label="상태 변화와 알림을 대조해 검증"><p>확인한 배포 상태는 알림으로 전달했습니다. Deployment의 실제 상태 변화와 알림 수신 내역을 대조해 배포 진행과 결과가 전달되는지 확인했습니다. 선언한 설정을 반영하는 리소스 관리에 상태 감시를 결합해 반복 점검을 자동화했습니다.</p></Paragraph></div>
          <Diagram file="operator-flow.svg" title="배포 설정과 실제 상태를 연결하는 컨트롤러" caption="스터디에서 구현한 역할을 바탕으로 재구성한 구조도입니다. CRD는 CR의 구조를 정의하고, 컨트롤러는 CR을 읽어 동작합니다." onOpen={setPreview} />
        </div>
      </div></section>

      <section className="ae-section ae-wrap" id="delivery">
        <SectionHeading number="03" eyebrow="CLOUD & DELIVERY" title="독립적인 서비스 배포와 블루그린 전환">졸업프로젝트 · GCP 데이터 수집 서비스와 AWS 백엔드</SectionHeading>
        <div className="ae-delivery-intro"><Paragraph label="서비스별 실행 환경 구성"><p>데이터 수집 서비스와 백엔드를 각각 독립적으로 배포할 수 있도록 분리하고 gRPC로 연결했습니다. GCP에 수집 서비스를, AWS에 백엔드를 두고 Dockerfile과 Docker Compose로 서비스별 의존성과 실행 설정을 구성했습니다.</p></Paragraph><Paragraph label="반복되는 수동 배포의 개선"><p>업데이트마다 인스턴스에 접속해 컨테이너를 교체하는 데 시간이 걸렸습니다. GitHub Actions로 애플리케이션 빌드부터 새 버전 컨테이너 배포까지 자동화해 배포 시간을 30분에서 10분으로 줄였습니다.</p></Paragraph></div>
        <Diagram file="runtime-architecture.svg" title="AWS·GCP 서비스 실행 구조" caption="본인 설명을 바탕으로 재구성했습니다. gRPC는 두 서비스 사이의 논리적 통신 관계이며, 클라우드 간 네트워크의 세부 경로는 표시하지 않았습니다." onOpen={setPreview} />
        <div className="ae-bluegreen-copy"><div><p className="ae-small-label">서비스 중단 위험을 고려한 배포</p><h3>기존 버전을 유지하며 새 버전을 별도 EC2에 배포했습니다.</h3></div><p>두 버전을 서로 다른 EC2에서 실행하고 AWS 로드밸런서의 대상 그룹과 라우팅을 전환하도록 구성했습니다. EC2는 퍼블릭 서브넷에, RDS는 프라이빗 서브넷에 배치했습니다.</p></div>
        <Diagram file="bluegreen-deployment.svg" title="빌드 자동화와 블루그린 트래픽 전환" caption="기존 버전이 요청을 처리하는 동안 새 버전을 별도 EC2에 배포하고, 로드밸런서의 대상 그룹과 라우팅을 전환하는 구성입니다." onOpen={setPreview} />
        <div className="ae-download-row"><p>두 아키텍처는 각각의 도형과 연결선을 편집할 수 있습니다.</p><a className="ae-link" href={asset('diagrams/autoever-deployment.drawio')} download><Download size={17} /> draw.io 원본 받기</a></div>
      </section>

      <section className="ae-section ae-section-tint" id="homelab"><div className="ae-wrap">
        <SectionHeading number="04" eyebrow="LINUX HOME LAB" title="직접 구성한 서버에 부하를 주고, 알림을 확인하다.">Linux 스터디와 홈서버 구축 · 구성에서 동작 확인까지</SectionHeading>
        <div className="ae-home-grid"><Paragraph label="가상머신과 원격 접속 환경"><p>Linux 스터디에서 운영체제와 네트워크의 기초를 실습하고, Proxmox에서 가상머신과 Linux 운영체제를 설치했습니다. 네트워크를 연결한 뒤 Tailscale과 MagicDNS를 설정해 홈서버에 원격으로 접속하고 터미널에서 서버를 조작했습니다.</p></Paragraph><Paragraph label="실제 사용률을 기준으로 한 알림"><p>Linux에서 CPU 사용률을 의도적으로 높이는 스크립트를 실행했습니다. n8n이 실제 CPU 사용률을 읽고 기준을 넘으면 Slack으로 알리도록 구성한 뒤, 부하가 발생했을 때 알림이 도착하는지 확인했습니다.</p></Paragraph></div>
        <ol className="ae-process" aria-label="홈서버 실습 과정"><li><span>01</span>Linux 가상머신 구성</li><li><span>02</span>원격 접속 확인</li><li><span>03</span>CPU 부하 발생</li><li><span>04</span>사용률 기반 알림 확인</li></ol>
      </div></section>

      <section className="ae-section ae-wrap" id="experience">
        <SectionHeading number="05" eyebrow="WORK EXPERIENCE" title="고객의 시스템과 AI 솔루션을 연결하다.">B2B AI SaaS 기업 · 채널코퍼레이션 · Forward Deployed Engineer Intern · 2026.03–2026.06</SectionHeading>
        <div className="ae-intern-grid"><div className="ae-narrative"><Paragraph label="고객 시스템의 정보와 기능 연계"><p>고객사 시스템의 데이터와 기능을 AI 솔루션에서 활용하도록 연동해 고객 서비스 과정을 자동화했습니다. 이를 통해 AI를 활용한 고객 서비스의 처리 성공률을 평균 약 20%에서 80%로 높였습니다.</p></Paragraph><Paragraph label="고객이 직접 활용할 수 있는 도입 환경"><p>고객은 데이터 분석과 제품 업로드를 간편하게 수행하길 원했습니다. 이 흐름을 지원하는 에이전트 통합 플랫폼을 구축하고 사용 방법을 교육해, 도입 단계부터 고객이 솔루션을 직접 활용할 수 있도록 했습니다. 솔루션 도입 기간은 6주에서 4주로 단축했습니다.</p></Paragraph><External href={links.internship}>관련 개발 경험을 정리한 회사 기술블로그</External></div><dl className="ae-outcomes"><div><dt>AI를 활용한 고객 서비스 처리 성공률</dt><dd>20% <span>→</span> 80%</dd></div><div><dt>솔루션 도입 기간</dt><dd>6주 <span>→</span> 4주</dd></div><p>각각 시스템 연동과 고객의 직접 활용 지원에 따른 성과입니다.</p></dl></div>
      </section>

      <section className="ae-section ae-wrap ae-research" id="research">
        <SectionHeading number="06" eyebrow="RESEARCH" title="LLM의 KV 캐시 압축에 따른 성능 저하 개선 연구">이화여자대학교 AI컴퓨팅 플랫폼 연구실 · 학부연구생</SectionHeading>
        <p className="ae-research-goal">LLM의 이전 계산 결과를 저장하는 KV 캐시를 줄이면서 답변 품질 저하를 완화하는 방법을 연구했습니다. 캐시에서 제외한 정보가 답변 생성에 얼마나 기여했는지 일부 관측값으로 추정하고, 그 값을 계산에 다시 반영하는 접근을 실험했습니다.</p>
        <div className="ae-research-grid"><Paragraph label="관측값의 편향에서 원인 분석"><p>반복 실험에서 관측값이 한쪽으로 치우쳐 초기 추정 방식의 오차가 커지는 현상을 발견했습니다. 전체 계산값과 추정값의 차이를 단계별로 비교해 오차가 누적되는 구간과 표본이 대표성을 잃는 조건을 확인했습니다.</p></Paragraph><Paragraph label="추정 방식을 바꾸고 같은 조건에서 재검증"><p>치우친 관측값을 반영하도록 추정 방식을 다시 설계했습니다. 입력과 압축 조건을 고정한 동일 벤치마크에서 검증해 기존 방식보다 낮은 오차를 확인하고, 관측 표본 수에 따른 정확도와 추가 메모리 사용량을 함께 비교했습니다.</p></Paragraph></div>
        <p className="ae-research-takeaway">성능 수치만 비교하지 않고 오차의 원인을 좁혀가며, 자원 사용량과 결과의 품질을 함께 검증했습니다.</p>
      </section>

      <section className="ae-section ae-section-tint" id="about"><div className="ae-wrap">
        <SectionHeading number="07" eyebrow="BACKGROUND" title="기술을 구현하고, 배운 것을 함께 나눕니다." />
        <div className="ae-background-grid"><div><h3>경험으로 확인할 수 있는 기술</h3><dl className="ae-skills">{skills.map(skill => <div key={skill.label}><dt>{skill.label}</dt><dd><a href={skill.target}>{skill.evidence}<ArrowUpRight size={15} aria-hidden="true" /></a></dd></div>)}</dl></div><div className="ae-credentials"><article><span className="ae-small-label">AWARD</span><h3>한국IT비즈니스진흥협회장상</h3><p>오픈소스 기여 활동으로 수상했습니다.</p></article><article><span className="ae-small-label">COMMUNITY</span><h3>10개 대학, 200명 이상의 클라우드·AI 연합동아리</h3><p>초기 공동 회장으로 커뮤니티 지원을 확보해 무료 워크숍을 열었습니다. 사전 설문을 바탕으로 실습 난이도와 멘토링을 조정했고, 매 행사에 100명 이상이 참여했습니다. 차기 회장단에 운영 경험을 전수하며 3년째 이어지는 활동에 기여했습니다.</p></article><article><span className="ae-small-label">EDUCATION & CERTIFICATIONS</span><h3>이화여자대학교 컴퓨터공학 전공</h3><p>AWS Certified Solutions Architect – Associate<br />SQLD</p></article></div></div>
      </div></section>
    </main>
    <footer className="ae-footer ae-wrap"><div><strong>김연수 <span>Yeonsoo Kim</span></strong><p>컨테이너 플랫폼 구축 및 운영 포트폴리오</p></div><div className="ae-footer-links"><External href={links.github}>GitHub</External><External href={links.linkedin}>LinkedIn</External><External href={links.blog}>기술 블로그</External></div><p className="ae-footer-note">© 2026 Yeonsoo Kim. 개인 지원용 포트폴리오입니다.</p></footer>
    <dialog className="ae-lightbox" ref={dialogRef} onCancel={() => setPreview(null)} onClick={event => { if (event.target === event.currentTarget) setPreview(null); }} aria-labelledby="preview-title">
      {preview && <div className="ae-lightbox-inner"><div className="ae-lightbox-header"><h2 id="preview-title">{preview.title}</h2><button autoFocus onClick={() => setPreview(null)} aria-label="이미지 확대 닫기"><X size={24} /></button></div><div className="ae-lightbox-scroll"><img src={preview.src} alt={preview.title} /></div><p>{preview.caption}</p></div>}
    </dialog>
  </div>;
}
