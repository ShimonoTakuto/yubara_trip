"""Regenerate browser data from plan.md: python build_data.py"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
data = {key: [] for key in ('food', 'spots', 'stay', 'onsen', 'parking', 'katsuyama')}
sections = {'## グルメ': 'food', '## スポット': 'spots', '## 宿': 'stay',
            '### 宿内': 'stay', '### 宿外': 'onsen', '## 駐車場': 'parking',
            '# 勝山町並み保存地区': 'katsuyama'}
current = None
in_bath = False
hotel = ''
from urllib.parse import quote
for line in ROOT.joinpath('plan.md').read_text(encoding='utf-8-sig').splitlines():
    if line.startswith('#'):
        current = sections.get(line.strip())
        in_bath = line.strip() == '### 宿内'
    elif current and line.startswith('|') and '[地図]' in line:
        cells = [cell.strip() for cell in line.strip().strip('|').split('|')]
        name, hours, tue, wed, map_cell = cells[:5]
        map_match = re.search(r'\]\((https://[^)]+)\)', map_cell)
        data[current].append(dict(name=name, hours='不明' if hours == '-' else hours,
                                  tue='不明' if tue == '-' else tue,
                                  wed='不明' if wed == '-' else wed,
                                  map=map_match.group(1) if map_match else ''))
    elif current == 'stay' and line.startswith('- '):
        name = line[2:].strip()
        if not in_bath:
            hotel = name
        data['stay'].append(dict(name=name, hours='不明', tue='不明', wed='不明',
            type='宿内温泉' if in_bath else 'お宿',
            map='https://www.google.com/maps/search/?api=1&query=' + quote('岡山県 真庭市 ' + hotel)))
photos = json.loads(ROOT.joinpath('photos.json').read_text(encoding='utf-8'))
for places in data.values():
    for place in places:
        if place['name'] in photos:
            place['photo'] = photos[place['name']]
ROOT.joinpath('data.js').write_text('const TRIP_DATA = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
print('Updated data.js: ' + ', '.join(f'{key}={len(value)}' for key, value in data.items()))
