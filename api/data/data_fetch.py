import csv
import json
from pprint import pformat, pprint

from requests import get


files = {
    'bike.csv': 'https://opendata.braunschweig.de/node/2727/download'
}

for file, url in files.items():
    with open(file, 'w') as f:
        f.write(get(url).text)
    r = csv.DictReader(open(file))
    rows = list(r)
    rows.sort(key=lambda x: x['DATUM'])

    pprint(json.dumps(rows))

    js = pformat(rows)
    with open(file.split('.')[0] + '.json', 'w') as a:
        a.write(js)
