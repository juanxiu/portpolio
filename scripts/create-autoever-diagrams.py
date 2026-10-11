"""Compatibility entrypoint: export SVGs from the editable draw.io originals.

The .drawio files are the source of truth. This command never regenerates or
replaces them. Edit diagrams in draw.io, then run this exporter.
"""
from pathlib import Path
import os
import shutil
import subprocess
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DEFAULT = '/Applications/draw.io.app/Contents/MacOS/draw.io'
executable = os.environ.get('DRAWIO_BIN') or shutil.which('drawio') or DEFAULT
if not Path(executable).is_file():
    raise SystemExit('draw.io Desktop is required. Set DRAWIO_BIN to its executable.')

exports = {
    'autoever-deployment.drawio': ['runtime-architecture.svg', 'bluegreen-deployment.svg'],
    'autoever-kubernetes.drawio': ['lookup-paths.svg', 'operator-flow.svg'],
}
for source, pages in exports.items():
    for page, filename in enumerate(pages, start=1):
        output = ROOT / 'public/images/autoever' / filename
        subprocess.run([
            executable, '--export', '--format', 'svg', '--page-index', str(page),
            '--theme', 'light', '--embed-svg-images', '--embed-svg-fonts', 'false',
            '--output', str(output), str(ROOT / 'public/diagrams' / source),
        ], check=True)
        tree = ET.parse(output)
        print(f'{filename}: {tree.getroot().get("viewBox")}')
