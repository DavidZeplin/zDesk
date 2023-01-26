import requests, csv
from requests.auth import HTTPBasicAuth

url = 'https://YOUR_ZENDESK_SUBDOMAIN.zendesk.com/api/v2/search/export.json?query=role%3Aagent&filter[type]=user'
zd_auth = HTTPBasicAuth('ZENDESK_USER@YOUR_COMPANY.COM/token', 'YOUR_ZENDESK_API_TOKEN')
response = requests.get(url, auth = zd_auth)
data = response.json()
results = data['results']

# Open a file for writing and create csv writer
csv_file = open('users.csv', 'w')
csv_writer = csv.writer(csv_file)

# Write headers to the CSV file
header_line = results[0]
header = header_line.keys()
csv_writer.writerow(header)

for user in results:
    csv_writer.writerow(user.values())

while data['meta']['has_more']:
    url = data['links']['next']
    response = requests.get(url, auth = zd_auth)
    data = response.json()
    results = data['results']
    for user in results:
        csv_writer.writerow(user.values())

csv_file.close()