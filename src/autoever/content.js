export const links = {
  github: 'https://github.com/juanxiu',
  linkedin: 'https://www.linkedin.com/in/yeonsoo-kim-a70b68286/',
  blog: 'https://juanxiu.tistory.com/',
  internship: 'https://tech.channel.io/kr/articles/b085ab62',
};

export const focus = [
  { title: 'Kubernetes 배포 상태 관리', text: '선언한 설정을 리소스에 반영하고, 서비스 준비 상태를 확인하는 운영 자동화' },
  { title: '오픈소스 운영 도구 개선', text: '조회 효율을 높이면서 데이터 최신성과 기존 동작을 함께 고려하는 설계' },
  { title: '컨테이너 배포 자동화', text: '서비스를 독립적으로 배포하고 버전 교체 시 중단 위험을 줄이는 실행 환경' },
];

export const extraPrs = [
  { number: 549, title: 'Application API의 동작 검증', text: '생성한 Application을 조회하고 목록에 포함되는지 확인한 뒤 삭제하는 E2E 테스트를 추가했습니다.' },
  { number: 603, title: '캐시 동기화 대기 시간 설정', text: '고정된 동기화 대기 시간을 Go 옵션으로 조정할 수 있도록 변경하고 기본 동작을 테스트했습니다.' },
  { number: 607, title: '테스트의 Redis 의존성 분리', text: 'Redis가 없는 테스트 환경에서도 필요한 동작을 검증할 수 있도록 Redis Proxy 생성을 생략하는 옵션을 추가했습니다.' },
];

export const skills = [
  { label: 'Kubernetes · Go', evidence: 'Operator의 CRD와 컨트롤러 구현, Argo CD Agent 코드와 NetworkPolicy 수정', target: '#open-source' },
  { label: 'Docker · CI/CD', evidence: 'Dockerfile과 Compose로 실행 환경 구성, GitHub Actions 빌드와 배포 자동화', target: '#delivery' },
  { label: 'AWS · GCP', evidence: '수집 서비스와 백엔드의 독립 배포, EC2와 RDS 구성, 로드밸런서 전환', target: '#delivery' },
  { label: 'Linux · Python', evidence: '가상머신과 원격 접속 환경 구성, CPU 부하 실험, 연구 실험과 메모리 측정', target: '#homelab' },
];

export const prUrl = number => `https://github.com/argoproj-labs/argocd-agent/pull/${number}`;
