"""Generate editable draw.io cells and matching accessible SVG diagrams.

Only the confirmed topology is represented. GCP runtime product, registry,
cross-cloud network, automatic rollout checks and rollback are unspecified.
Run from any directory: python3 scripts/create-autoever-diagrams.py
"""
from pathlib import Path
from html import escape
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/images/autoever'
SOURCE = ROOT / 'public/diagrams'
OUT.mkdir(parents=True, exist_ok=True)
SOURCE.mkdir(parents=True, exist_ok=True)
NAVY, TEAL, GRAY = '#183a58', '#177b75', '#647b8b'


class Diagram:
    def __init__(self, key, name, width, height):
        self.key, self.name, self.w, self.h = key, name, width, height
        self.items = []

    def box(self, key, x, y, w, h, lines, *, fill='#ffffff', stroke='#ccd9e1', color=NAVY, size=22, container=False):
        self.items.append(dict(kind='box', key=key, x=x, y=y, w=w, h=h, lines=lines, fill=fill, stroke=stroke, color=color, size=size, container=container))

    def text(self, key, x, y, w, h, lines, size=19, color=GRAY):
        self.items.append(dict(kind='text', key=key, x=x, y=y, w=w, h=h, lines=lines, color=color, size=size))

    def arrow(self, key, pts, *, color=GRAY, dashed=False, label=None, labelpos=None):
        self.items.append(dict(kind='arrow', key=key, pts=pts, color=color, dashed=dashed))
        if label:
            x, y, w, h = labelpos
            self.text(key+'-label', x, y, w, h, label, 17, color)

    def svg(self):
        parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" role="img" aria-labelledby="title desc">', f'<title id="title">{escape(self.name)}</title>', '<desc id="desc">확인된 구성과 본인 설명을 바탕으로 재구성한 구조도</desc>', '<defs>']
        for i, color in enumerate([GRAY, TEAL, NAVY]):
            parts.append(f'<marker id="arrow{i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="{color}"/></marker>')
        parts.append('</defs><rect width="100%" height="100%" fill="#fff"/>')
        for it in self.items:
            if it['kind'] == 'arrow':
                points = ' '.join(f'{x},{y}' for x, y in it['pts'])
                dash = ' stroke-dasharray="7 6"' if it['dashed'] else ''
                index = [GRAY, TEAL, NAVY].index(it['color'])
                parts.append(f'<polyline points="{points}" fill="none" stroke="{it["color"]}" stroke-width="2.4" stroke-linejoin="round"{dash} marker-end="url(#arrow{index})"/>')
                continue
            x, y, w, h = (it[k] for k in ['x','y','w','h'])
            if it['kind'] == 'box':
                parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="9" fill="{it["fill"]}" stroke="{it["stroke"]}" stroke-width="1.5"/>')
            lines = it['lines']
            container = it.get('container', False)
            anchor = 'start' if container else 'middle'
            tx = x + 20 if container else x+w/2
            first = y+32 if container else y+h/2-(len(lines)-1)*it['size']*.7+it['size']*.35
            for i,line in enumerate(lines):
                weight = 650 if i == 0 and it['kind'] == 'box' else 450
                parts.append(f'<text x="{tx}" y="{first+i*it["size"]*1.4}" text-anchor="{anchor}" font-family="-apple-system,BlinkMacSystemFont,Apple SD Gothic Neo,Malgun Gothic,sans-serif" font-size="{it["size"]}" font-weight="{weight}" fill="{it["color"]}">{escape(line)}</text>')
        parts.append('</svg>')
        (OUT / f'{self.key}.svg').write_text('\n'.join(parts), encoding='utf-8')

    def drawio(self, parent):
        page = ET.SubElement(parent, 'diagram', id=self.key, name=self.name)
        model = ET.SubElement(page, 'mxGraphModel', dx=str(self.w), dy=str(self.h), grid='1', gridSize='10', guides='1', tooltips='1', connect='1', arrows='1', fold='1', page='1', pageScale='1', pageWidth=str(self.w), pageHeight=str(self.h), math='0', shadow='0')
        root = ET.SubElement(model, 'root')
        ET.SubElement(root, 'mxCell', id='0')
        ET.SubElement(root, 'mxCell', id='1', parent='0')
        for it in self.items:
            if it['kind'] == 'arrow':
                style=f'edgeStyle=none;rounded=0;html=1;endArrow=block;endFill=1;strokeWidth=2;strokeColor={it["color"]};dashed={1 if it["dashed"] else 0};'
                cell=ET.SubElement(root,'mxCell',id=it['key'],style=style,edge='1',parent='1')
                geo=ET.SubElement(cell,'mxGeometry',relative='1',**{'as':'geometry'})
                for kind, point in [('sourcePoint',it['pts'][0]),('targetPoint',it['pts'][-1])]:
                    ET.SubElement(geo,'mxPoint',x=str(point[0]),y=str(point[1]),**{'as':kind})
                if len(it['pts']) > 2:
                    arr=ET.SubElement(geo,'Array',**{'as':'points'})
                    for x,y in it['pts'][1:-1]: ET.SubElement(arr,'mxPoint',x=str(x),y=str(y))
                continue
            isbox=it['kind']=='box'
            style=f'rounded=1;whiteSpace=wrap;html=1;arcSize=8;fontFamily=Helvetica;fontSize={it["size"]};fontColor={it["color"]};'
            style+=f'fillColor={it["fill"]};strokeColor={it["stroke"]};' if isbox else 'text;fillColor=none;strokeColor=none;'
            style+='verticalAlign=top;align=left;spacingTop=12;spacingLeft=20;' if it.get('container') else 'align=center;verticalAlign=middle;'
            value='<br>'.join(escape(line) for line in it['lines'])
            cell=ET.SubElement(root,'mxCell',id=it['key'],value=value,style=style,vertex='1',parent='1')
            ET.SubElement(cell,'mxGeometry',x=str(it['x']),y=str(it['y']),width=str(it['w']),height=str(it['h']),**{'as':'geometry'})


lookup=Diagram('lookup-paths','조회 목적에 따른 경로 분리',900,565)
lookup.text('title',30,15,840,50,['Argo CD Agent · Application 조회'],25,NAVY)
lookup.text('general',30,78,235,38,['일반 조회'],21,TEAL)
lookup.box('read',35,135,220,105,['Application','조회 요청'])
lookup.box('cache',335,135,230,105,['로컬 메모리 캐시','변경 사항 반영'],fill='#eef7f5',stroke='#92bdb7',color=TEAL)
lookup.box('read-result',645,135,220,105,['복사본 반환','공유 객체 보호'])
lookup.arrow('read-cache',[(255,187),(335,187)],color=TEAL)
lookup.arrow('cache-result',[(565,187),(645,187)],color=TEAL)
lookup.text('update-title',30,300,235,38,['업데이트용 조회'],21,NAVY)
lookup.box('update',35,355,220,105,['Application','업데이트용 조회'])
lookup.box('api',335,355,230,105,['Kubernetes','API 서버'],fill='#eef3f9',stroke='#a6bace')
lookup.box('update-result',645,355,220,105,['직접 조회 결과','최신 정보 확인'])
lookup.arrow('update-api',[(255,407),(335,407)],color=NAVY)
lookup.arrow('api-result',[(565,407),(645,407)],color=NAVY)
lookup.arrow('sync',[(450,355),(450,240)],dashed=True,label=['변경 사항을','캐시에 반영'],labelpos=(465,265,175,55))
lookup.text('foot',25,500,850,40,['일반 조회의 반복 호출은 줄이고, 업데이트에는 직접 조회를 유지했습니다.'],18)

operator=Diagram('operator-flow','CR 설정 반영과 배포 상태 감시',900,675)
operator.text('title',30,12,840,50,['모니터링 Operator · 컨트롤러의 역할'],25,NAVY)
operator.box('crd',40,95,220,82,['CRD','배포 설정의 구조'],fill='#f5f8fa')
operator.box('cr',40,265,220,95,['CR','선언한 배포 설정'])
operator.box('controller',335,265,230,95,['컨트롤러','Reconcile'],fill='#eef7f5',stroke='#92bdb7',color=TEAL)
operator.box('deployment',640,265,220,95,['Deployment','실제 배포 리소스'])
operator.arrow('defines',[(150,177),(150,265)],label=['구조 정의'],labelpos=(158,202,120,30))
operator.arrow('read',[(260,312),(335,312)],color=TEAL)
operator.arrow('reflect',[(565,290),(640,290)],color=TEAL,label=['설정 반영'],labelpos=(565,243,75,28))
operator.arrow('observe',[(640,337),(565,337)],label=['상태 조회'],labelpos=(565,358,75,28))
operator.box('judgment',335,475,230,95,['배포 상태 판단','서비스 준비 여부 확인'],fill='#eef7f5',stroke='#92bdb7',color=TEAL,size=20)
operator.box('notify',640,475,220,95,['상태 변경 알림','진행 · 완료 · 실패'],size=20)
operator.arrow('judge',[(450,360),(450,475)],color=TEAL)
operator.arrow('notify-path',[(565,522),(640,522)],color=TEAL)
operator.text('loop',30,400,250,160,['Reconcile은 같은 대상을','반복해서 처리합니다.'],18)
operator.text('foot',25,600,850,46,['Deployment 상태 변화와 알림 수신 내역을 대조해 동작을 확인했습니다.'],18)

runtime=Diagram('runtime-architecture','AWS·GCP 서비스 실행 구조',1200,785)
runtime.box('gcp',30,195,305,260,['GCP'],fill='#f2f7fa',container=True,size=23)
runtime.box('collector',55,285,255,95,['데이터 수집 서비스','독립 배포'],size=22)
runtime.box('aws',415,90,745,640,['AWS · VPC 기반 백엔드'],fill='#fafbfd',container=True,size=23)
runtime.box('public',445,157,685,342,['퍼블릭 서브넷'],fill='#f1f5fa',container=True,size=20)
runtime.box('private',445,535,685,152,['프라이빗 서브넷'],fill='#eef7f5',container=True,size=20,color=TEAL)
runtime.box('lb',475,246,210,82,['로드밸런서','대상 그룹 전환'],size=20)
runtime.box('blue',765,220,315,106,['EC2 · 기존 버전','백엔드 컨테이너'],fill='#eaf1f9',stroke='#9eb5cd')
runtime.box('green',765,363,315,106,['EC2 · 새 버전','백엔드 컨테이너'],fill='#eef7f5',stroke='#8fbbb4',color=TEAL)
runtime.box('rds',765,593,315,64,['RDS'],fill='#fff',stroke='#94b6b0',color=TEAL)
runtime.box('client',55,42,255,76,['서비스 요청'],size=22)
runtime.arrow('request',[(182,118),(182,150),(385,150),(385,287),(475,287)],color=NAVY)
runtime.arrow('gRPC',[(310,332),(415,332)],color=TEAL,label=['gRPC'],labelpos=(324,284,81,30))
runtime.arrow('blue-route',[(685,273),(765,273)],color=NAVY)
runtime.arrow('green-route',[(685,299),(722,299),(722,416),(765,416)],color=TEAL,dashed=True)
runtime.arrow('blue-db',[(1080,273),(1102,273),(1102,610),(1080,610)],color=NAVY)
runtime.arrow('green-db',[(922,469),(922,593)],color=TEAL)
runtime.text('logical',35,474,295,80,['gRPC는 서비스 간','논리적 통신 관계입니다.'],18)
runtime.text('foot',40,740,1120,30,['서로 다른 EC2에서 두 버전을 실행하며 로드밸런서의 대상 그룹과 라우팅을 전환합니다.'],19)

delivery=Diagram('bluegreen-deployment','CI/CD와 블루그린 트래픽 전환',1200,690)
delivery.text('title',30,12,1140,50,['컨테이너 빌드 자동화와 새 버전 배포'],25,NAVY)
delivery.box('git',50,112,250,90,['GitHub','코드 변경'])
delivery.box('actions',455,112,275,90,['GitHub Actions','애플리케이션 빌드'],fill='#eef3f9',stroke='#a6bace')
delivery.box('new-version',890,112,260,90,['새 버전 컨테이너','별도 EC2에 배포'],fill='#eef7f5',stroke='#8fbbb4',color=TEAL)
delivery.arrow('git-build',[(300,157),(455,157)],color=NAVY)
delivery.arrow('build-deploy',[(730,157),(890,157)],color=TEAL)
delivery.text('switch-title',30,240,1140,45,['로드밸런서 대상 그룹과 라우팅 전환'],23,NAVY)
delivery.box('before-frame',30,310,540,305,['전환 전 · 기존 버전으로 요청 전달'],fill='#f6f8fb',container=True,size=19)
delivery.box('after-frame',630,310,540,305,['전환 후 · 새 버전으로 요청 전달'],fill='#f1f8f6',container=True,size=19,color=TEAL)
for offset, prefix in [(0,'before'),(600,'after')]:
    delivery.box(prefix+'-lb',60+offset,430,160,70,['로드밸런서'],size=18)
    delivery.box(prefix+'-blue',325+offset,380,210,75,['EC2 · 기존 버전','백엔드 컨테이너'],fill='#eaf1f9',stroke='#9eb5cd',size=18)
    delivery.box(prefix+'-green',325+offset,510,210,75,['EC2 · 새 버전','백엔드 컨테이너'],fill='#eef7f5',stroke='#8fbbb4',color=TEAL,size=18)
    y=417 if prefix=='before' else 547
    delivery.arrow(prefix+'-traffic',[(220+offset,465),(268+offset,465),(268+offset,y),(325+offset,y)],color=NAVY if prefix=='before' else TEAL)
delivery.text('foot',30,635,1140,38,['빌드부터 새 버전 배포까지 자동화해 배포 시간을 30분에서 10분으로 줄였습니다.'],20)

for diagram in [lookup,operator,runtime,delivery]: diagram.svg()
for filename, diagrams in [('autoever-deployment.drawio',[runtime,delivery]),('autoever-kubernetes.drawio',[lookup,operator])]:
    root=ET.Element('mxfile',host='app.diagrams.net',agent='Portfolio diagrams',version='24.7.17',type='device')
    for diagram in diagrams: diagram.drawio(root)
    ET.indent(root)
    ET.ElementTree(root).write(SOURCE/filename,encoding='utf-8',xml_declaration=True)
print('Generated 4 SVG diagrams and 2 editable draw.io files.')
