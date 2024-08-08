import csv
import json
from pprint import pformat, pprint

from requests import get


def fetch_bikedata():
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

    with open(file.split('.')[0] + '_sums.json', 'w') as f:
        d = ''
        for r in rows:
            if d != r['DATUM']:
                if d:
                    f.write(d + ',' + str(s) + '\n')
                d = r['DATUM']
                s = 0
            s += int(r['TAGESWERT'] if r['TAGESWERT'] else 0)


def fetch_mapdata():
    from bs4 import BeautifulSoup
    from lxml import etree
    maps = {}
    url_base = 'https://opendata.braunschweig.de'
    #shape_listing = 'https://opendata.braunschweig.de/search/field_resources%253Afield_format/shape-927'
    try:
        for page in range(0, 4):
            shape_listing = f'https://opendata.braunschweig.de/search/field_resources%253Afield_format/shape-927?q=search/field_resources%253Afield_format/shape-927&sort_by=changed&page=0%2C{page}'
            t = get(shape_listing).text
            BeautifulSoup(t, 'html.parser')
            dom = etree.HTML(t)
            for i in range(1, 11):
                xpath_link = f'/html/body/div[2]/div/div/section/div/div/div/div/div[2]/div/div/div/div/div[3]/div[{i}]/article/div[2]/h2/a'
                l = url_base + dom.xpath(xpath_link)[0].get('href')
                title = dom.xpath(xpath_link)[0].text
                if title in ['OpenGeoData.NI ']:
                    continue

                # get()
                xpath_dl = '/html/body/div[2]/div/div/section/div/div/div/div/div[2]/div/div/div/article/div[1]/div[2]/div/div/ul/li/div/span/a'

                dl = etree.HTML(get(l).text).xpath(xpath_dl)[0].get('href')
                maps[title] = dl
                print(title + ': ' + dl)
    except IndexError:
        pass
    return maps

fetch_bikedata()
# maps = fetch_mapdata()
# for map_name, map_url in maps.items():
#     print('Downloading ' + map_name)
#     with open('maps/' + map_name + '.zip', 'wb') as f:
#         m = get(map_url).content
#         f.write(m)
