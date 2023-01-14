import pandas as pd

df = pd.read_json (r'...\JSON\jsonOne.json')
df.to_csv (r'...\CSV\csvOne.csv', index = None)