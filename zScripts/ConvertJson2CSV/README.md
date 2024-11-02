# Convert JSON to CSV File in Python
<h2>In this guide show howto: the steps to convert a JSON string to CSV using Python.</h2>
<h3>Step 1: Create the JSON File</h3>
<p>Once you have your JSON string ready, save it within a JSON file.</p>
<p>Alternatively, you may copy the JSON string into Notepad, and then save that file with a .json extension.<br />
Example: This is how the JSON string would look like for our example:</p>
<p><code>{"Product":{"0":"Desktop Computer","1":"Tablet","2":"Printer","3":"Laptop"},"Price":{"0":700,"1":250,"2":100,"3":1200}}</code></p>
<h3>Step 2: Install the Pandas Package</h3>
<p>If you haven’t already done so, install the Pandas package. You may use the following command to install the Pandas package under Windows:</p>
<p><code>pip install pandas</code></p>
<h3>Step 3: Convert the JSON String to CSV using Python</h3>
<p>You may now use the following template to assist you in converting the JSON string to CSV using Python:</p>
<p><code>import pandas as pd<br />
df = pd.read_json (r'For Path replace "..."\JSON\exist file name.json')<br />
df.to_csv (r'For Path replace "..."\CSV\create new name.csv', index = None)
</code></p>