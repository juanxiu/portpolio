# Portfolio

React + Vite로 만든 개인 포트폴리오입니다. 데이터 파이프라인, MLOps, LLM 추론 효율화 중심의 AI Engineer 경험을 정리했습니다.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

이 저장소는 `juanxiu/portpolio` 일반 저장소이므로 Vite `base`는 `/portpolio/`로 설정되어 있습니다.

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드하고 GitHub Pages에 배포합니다.

배포 주소:

```txt
https://juanxiu.github.io/portpolio/
```

## Content

사이트에 표시되는 이력 데이터는 `src/data/profile.js`에서 수정할 수 있습니다.

## 현대오토에버 제출용 페이지

기존 포트폴리오는 유지하며, 컨테이너 플랫폼 지원용 페이지를 `/portpolio/autoever/`에 추가했습니다. [제출용 페이지 안내](autoever/README.md)에서 실행 방법, 경험 근거와 draw.io 원본 위치를 확인할 수 있습니다.
