# Convert CSV to Excel File in Python
<h2>In this guide show howto: the steps to convert a CSV to Excel using Python.</h2>
<h3>Step 1: Find the path where the CSV file is stored</h3>
<p>Next, find the path where the CSV file is stored on your computer.</p>
<h3>Step 2: Install the Pandas Package</h3>
<p>If you haven’t already done so, install the Pandas package, then you will need to do so...</p>
<p><code>pip install pandas</code></p>
<h3>Step 3: Specify the path where the new Excel file will be stored</h3>
<p>need to specify the path where the new Excel file will be stored. For example:</p>
<p><code>import pandas as pd
df = pd.read_json (r'For Path replace "..."\JSON\exist file name.json')
df.to_csv (r'For Path replace "..."\CSV\create new name.csv', index = None)
</code></p>
<h3>Step 4: Convert the CSV to Excel using Python</h3>
<p>need to use the following template to perform the conversion:</p>
<code>import pandas as pd
read_file = pd.read_csv (r'For Path replace "..."\CSV\exist file name.csv')
read_file.to_excel (r'For Path replace "..."\EXCEL\create new name.xlsx', index = None, header=True)
</code>