# 현대오토에버 컨테이너 플랫폼 포트폴리오

- 제출 주소: https://juanxiu.github.io/portpolio/autoever/
- 지원 분야: 2026년 4분기 Platform Engineer · 컨테이너 플랫폼 구축 및 운영
- 작성 기준: 제출용 자기소개서 v3, 경험 정리, 공개 PR 검토, 2026-10-12 사용자 추가 확인
- 추가 확인: GCP 수집 서비스 / AWS 백엔드 / 서로 다른 EC2의 블루그린 배포 / EC2 가용영역 분산 / RDS Multi-AZ
- 졸업프로젝트는 Safe Path와 다른 프로젝트다. 사용자가 주제를 실시간 결제 시스템으로 확인했다.

## 로컬 실행과 빌드

```sh
npm ci
npm run dev
# /portpolio/autoever/ 접속
npm run build
npm run preview
```

기존 `/portpolio/` 진입점을 유지하고 Vite의 다중 HTML 진입점으로 `/portpolio/autoever/`를 추가했다. 제출용 화면·내용·스타일은 `src/autoever/`에 분리했다. 기존 MLOps 공개 페이지와 DX·DB 버전은 변경하지 않는다. `main` 변경이 GitHub Pages 워크플로를 실행하며, `dist`에는 두 HTML 진입점이 모두 포함된다.

## 자료와 작성 기준

지원 준비 폴더의 아래 문서를 기준으로 문장을 검토한다. 최신 사용자 확인이 우선한다.

- `01_채용공고_직무요건.md`: Docker, Kubernetes, OSS 적용과 문제 해결, Linux, 클라우드, CI/CD
- `02_경험정리_문항배치.md`: 본인 수행 범위와 확인된 성과
- `03_기업직무_심층분석_및_자소서키워드.md`: 운영 효율, 안정성, 자동화의 회사 근거
- `04_자소서_초안_v3.md`: 사용자가 선택한 제출용 자기소개서
- `05_오픈소스_PR_검토.md`: 5개 PR의 코드·리뷰와 각 기여의 범위
- `06_합격자소서_문체분석_및_작성원칙.md`: 문제와 선택 이유, 구현, 검증 결과의 문장 연결

연구 내용은 사용자가 제공한 최신 연구 소개 이미지를 반영했다. 관측값 편향의 원인 분석, 추정 방식 재설계, 같은 조건의 정확도와 추가 메모리 비교를 설명한다. 칼만 필터, 투고 목표, 진행상황 항목은 제출 페이지에서 제외했다.

## 경험별 근거 범위

- OSS: #525 일반 조회 캐시 / 업데이트 직접 조회, #574 Redis 방향 Egress TCP 6379와 Helm·Kustomize. #549·#603·#607은 추가 기여로 표시한다.
- 성능: 100개 Application 조회 실험의 약 19초 → 0.421ms, 호출 300 → 200. 본인 측정·발표 수치이며 전체 서비스 개선율이 아니다.
- Operator: 스터디 구현. CRD·CR·Reconcile·Deployment 관계와 상태 확인·알림을 설명한다. 실제 probe 설정 수정, 자동 복구, 사용하지 않은 테스트 도구는 추가하지 않는다.
- 졸업프로젝트: 독립 배포, gRPC, AWS·GCP, Docker 구성, GitHub Actions, 30분 → 10분 배포, CodeBuild·CodeDeploy, 별도 EC2와 대상 그룹 전환. GCP 실행 제품·이미지 저장소·VPN·자동 롤백·실측 중단 시간은 미확인이다.
- 홈서버: Proxmox Linux VM, Tailscale/MagicDNS, CPU 부하와 실제 사용률 기반 n8n/Slack 알림. 별도 DB 버전의 BIND·SSH 터널 사례는 옮기지 않았다.
- 인턴: 시스템 연동과 고객의 직접 활용 지원. 처리 성공률 평균 약 20% → 80%, 도입 기간 6주 → 4주. 클러스터 운영 성과로 확대하지 않는다.

## 아키텍처 편집

- `public/diagrams/autoever-deployment.drawio`: 네트워크 구성 개선안과 실제 CI/CD·블루그린 전환 2페이지
- `public/diagrams/autoever-kubernetes.drawio`: 조회 경로 분리와 Operator 구조 2페이지
- `public/images/autoever/`: 웹용 SVG 4장
- `scripts/create-autoever-diagrams.py`: draw.io Desktop을 호출해 원본에서 웹용 SVG를 내보내는 도구

```sh
python3 scripts/create-autoever-diagrams.py
```

draw.io 원본이 편집 기준이다. AWS의 EC2·RDS·Elastic Load Balancing 및 그룹 도형과 Kubernetes 리소스 아이콘은 draw.io 내장 라이브러리를 사용한다. draw.io에서 원본을 수정한 뒤 위 명령으로 SVG를 내보낸다. 스크립트는 원본을 재생성하거나 덮어쓰지 않는다. draw.io Desktop 27 이상이 필요하며, 설치 위치가 다르면 DRAWIO_BIN 환경 변수로 실행 파일을 지정한다.

Operator와 조회 경로, CI/CD 그림은 본인 설명과 공개 PR을 바탕으로 재구성했다. 네트워크 그림은 별도로 제안한 개선안이며 아래의 실제 구성과 구분한다. GCP 실행 제품, 아티팩트 저장소, 자동 롤백 등 미확인 구성은 추가하지 않았다.

## 검증 기준

- 프로덕션 빌드 및 두 진입점의 직접 접속·새로고침
- 데스크톱 1440px, 모바일 390px 및 360px에서 가로 넘침과 이미지 로딩
- 이미지 확대, Escape 닫기, 초점 복귀, 추가 PR 펼치기, 내부 링크
- 본문 아키텍처는 원본 비율을 유지하며 높이 약 500px 이하로 표시한다. 네트워크 개선안은 약 480px로 제한하고, 작은 화면에서는 본문 폭에 맞춘다. 상세 내용은 기존 확대 보기에서 확인하며 증빙 이미지 크기는 유지한다.
- draw.io XML 파싱 및 설치된 draw.io에서 두 페이지 내보내기
- 새 페이지에서 칼만 필터·진행상황·이전 DX PDF 링크가 노출되지 않음
- 기존 공개 페이지의 소스·내용 보존 및 배포 후 익명 접속

이 포트폴리오는 정적 파일이며 로그인, 폼 전송, 방문자 데이터 수집 기능을 추가하지 않았다.

## 2026-10-12 수정 기준

- 섹션 제목과 내부 소제목은 프로젝트명·역할·구현 대상을 나타내는 명사형으로 작성한다.
- 인턴의 처리 성공률과 도입 기간은 해당 행동을 설명한 본문 안에서 굵게 표시한다. 별도 대형 성과 카드를 만들지 않는다.
- Prometheus API 호출 측정 이미지는 본문에 노출한다. 조회 시간은 별도로 측정한 지표이며 그래프 수치와 혼동하지 않는다.
- MUSAI를 보조 프로젝트로 추가했다. 예약·재고 동시성 제어와 Sentry는 기존 DX 기록을, 장학금 300만 원은 사용자 확인을 따른다. Hedge는 기존 페이지에 보존한다.
- MUSAI 서비스 이미지는 기존 프로젝트 원본을 유지한다. 장학금은 수혜 성과로 표현하며 대회 수상이나 인프라 성능 평가로 확대하지 않는다.


## 추가 수정 — 본문과 배포 구조

- 첫 화면 제목은 Yeonsoo Kim, 직무 표기는 플랫폼 엔지니어로 구성한다.
- 상단 대형 성과 요약과 MEASURED RESULT 카드를 삭제했다. 조회 성과와 PR 병합 수는 오픈소스의 기여 성과 불렛으로 표시한다.
- 한국IT비즈니스진흥협회장상은 오픈소스 기여 영역에만 기록한다. 기존 확인된 정식 상명을 유지한다.
- Operator와 실시간 결제 시스템은 구현 목적, 구성, 검증 결과를 불렛으로 정리한다.
- 사용자 추가 확인: 실시간 결제 시스템에서 GitHub Actions와 AWS CodeBuild·CodeDeploy를 함께 사용했다. 그림은 해당 도구의 CI/CD 관계를 표현하며, 아티팩트 저장소·세부 호출 명령·자동 롤백은 추가하지 않는다.
- Blue와 Green은 별도 EC2 환경이며, 공통 RDS를 사용한다. 이후 사용자 답변에서 EC2 가용영역 분산과 RDS Multi-AZ 사용을 확인했다. 구체적인 장애 복구 시험이나 실측 복구 시간은 확인되지 않았다.
- draw.io의 EC2·RDS·Load Balancing·CodeBuild·CodeDeploy 아이콘을 사용한다. 기존 버전/새 버전 대신 Blue Environment, Green Environment, Payment API v1/v2로 환경을 구분한다.
- 원본 파일과 내보내기 도구는 저장소에 보존하되, 제출 화면의 draw.io 다운로드 링크와 편집 안내는 삭제한다.
- 하단은 기술 스택, 커뮤니티 활동, 대학과 전공으로 구성한다. 자격증 표시는 제외했다.

기술 관계 참고: [GitHub Actions 워크플로](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows), [CodeDeploy와 Load Balancing](https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-elastic-load-balancing.html).


## 프로필·본문 및 네트워크 개선안 반영

- LinkedIn·GitHub·기술블로그는 이름과 역할 바로 아래에 배치한다. 하단 중복 링크와 직무 포트폴리오 문구는 제거한다.
- AWS Cloud Club 초기 공동 회장 경험은 무료 워크숍, 발표, 설문을 반영한 기획, 후속 운영 지원으로 정리한다. 학력에 GPA 3.97/4.5를 표시한다.
- OSS 조회 경로, Linux 홈서버와 MUSAI는 구현과 확인 결과를 불렛으로 정리한다. MUSAI만 보조 백엔드 사례로 유지하며 Hedge는 다음 범위에서 검토한다.
- Operator 그림에는 Slack 알림 아이콘을 넣고 직접 구현 영역 및 kubelet 설명 문구를 제거한다. 아이콘 출처: https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png

### 실제 구현과 개선안의 구분

| 구분 | 내용 |
| --- | --- |
| 본인 확인 구현 | GCP 수집 서비스와 AWS 백엔드의 gRPC 연동, 독립 배포, 퍼블릭 EC2와 프라이빗 RDS, EC2 가용영역 분산과 RDS Multi-AZ, GitHub Actions·CodeBuild·CodeDeploy, 블루그린 전환 |
| 네트워크 개선안 | 프라이빗 EC2, 가용영역별 NAT Gateway, Blue와 Green 각각의 2개 AZ 배치, 인터넷 연결 ALB의 HTTPS 리스너 및 gRPC 대상 그룹 |
| 미확인·성과 미주장 | 자동 롤백, 장애 복구 시험, 가용성 수치, 구체적인 서버 대수와 인스턴스 사양, GCP 실행 제품 |

네트워크 그림은 CI/CD 요소를 제거하고 VPC와 서브넷, 트래픽 경로를 보여준다. CI/CD 그림은 네트워크 상세를 반복하지 않고 코드 변경부터 새 환경 배포와 로드밸런서 대상 전환까지 보여준다. 두 ALB node는 서로 다른 로드밸런서가 아니라 하나의 ALB가 사용하는 각 AZ의 노드를 의미한다.

프라이빗 RDS 접근에는 NAT 또는 IGW가 필요하지 않다. 앱과 DB 사이에는 VPC 내부 경로를 사용한다. NAT는 프라이빗 애플리케이션의 외부 통신을 위한 제안이며 AZ별 배치는 가용성과 비용의 균형을 검토할 대상이다. DB 서브넷에는 인터넷 기본 경로를 추가하지 않는다. RDS Standby는 읽기용 복제본으로 표시하지 않는다.

공식 참고 자료, 확인일 2026-10-12:
- [AWS VPC의 프라이빗 서버와 NAT 구성](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html)
- [VPC 라우팅 테이블](https://docs.aws.amazon.com/vpc/latest/userguide/subnet-route-tables.html)
- [ALB 대상 그룹과 gRPC 프로토콜](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html)
- [RDS Multi-AZ의 Primary와 Standby](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html)
