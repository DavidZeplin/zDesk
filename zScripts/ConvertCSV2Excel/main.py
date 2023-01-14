import pandas as pd

read_file = pd.read_csv (r'...\CSV\csvOne.csv')
read_file.to_excel (r'...\EXCEL\NewcsvOne.xlsx', index = None, header=True)