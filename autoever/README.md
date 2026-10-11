# 현대오토에버 컨테이너 플랫폼 포트폴리오

- 제출 주소: https://juanxiu.github.io/portpolio/autoever/
- 지원 분야: 2026년 4분기 Platform Engineer · 컨테이너 플랫폼 구축 및 운영
- 작성 기준: 제출용 자기소개서 v3, 경험 정리, 공개 PR 검토, 2026-10-12 사용자 추가 확인
- 추가 확인: GCP 수집 서비스 / AWS 백엔드 / 서로 다른 EC2의 블루그린 배포
- 졸업프로젝트는 Safe Path와 다른 프로젝트다. 고유 이름은 확인되지 않아 기능으로 제목을 작성했다.

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
- 졸업프로젝트: 독립 배포, gRPC, AWS·GCP, Docker 구성, GitHub Actions, 30분 → 10분 배포, 별도 EC2와 대상 그룹 전환. GCP 실행 제품·이미지 저장소·VPN·자동 롤백·실측 중단 시간은 미확인이다.
- 홈서버: Proxmox Linux VM, Tailscale/MagicDNS, CPU 부하와 실제 사용률 기반 n8n/Slack 알림. 별도 DB 버전의 BIND·SSH 터널 사례는 옮기지 않았다.
- 인턴: 시스템 연동과 고객의 직접 활용 지원. 처리 성공률 평균 약 20% → 80%, 도입 기간 6주 → 4주. 클러스터 운영 성과로 확대하지 않는다.

## 아키텍처 편집

- `public/diagrams/autoever-deployment.drawio`: 서비스 실행 구조와 CI/CD·블루그린 전환 2페이지
- `public/diagrams/autoever-kubernetes.drawio`: 조회 경로 분리와 Operator 구조 2페이지
- `public/images/autoever/`: 웹용 SVG 4장
- `scripts/create-autoever-diagrams.py`: 동일 좌표와 문구에서 SVG와 draw.io XML을 생성

```sh
python3 scripts/create-autoever-diagrams.py
```

draw.io 파일은 이미지 한 장이 아니라 개별 도형과 연결선으로 구성되어 있다. 본인 설명과 공개 PR을 바탕으로 재구성한 그림이며 실행 화면 캡처가 아니다. draw.io에서 직접 수정한 뒤 스크립트를 다시 실행하면 변경이 덮어써지므로, 지속할 변경은 생성 스크립트에도 반영한다.

## 검증 기준

- 프로덕션 빌드 및 두 진입점의 직접 접속·새로고침
- 데스크톱 1440px, 모바일 390px 및 360px에서 가로 넘침과 이미지 로딩
- 이미지 확대, Escape 닫기, 초점 복귀, 추가 PR 펼치기, 내부 링크
- draw.io XML 파싱 및 설치된 draw.io에서 두 페이지 내보내기
- 새 페이지에서 칼만 필터·진행상황·이전 DX PDF 링크가 노출되지 않음
- 기존 공개 페이지의 소스·내용 보존 및 배포 후 익명 접속

이 포트폴리오는 정적 파일이며 로그인, 폼 전송, 방문자 데이터 수집 기능을 추가하지 않았다.
