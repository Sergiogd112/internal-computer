import requests
import urllib.request
import time
from bs4 import BeautifulSoup

# Set the URL you want to webscrape from
url = 'http://web.mta.info/developers/turnstile.html'
url = "https://www.meteoblue.com/es/tiempo/outdoorsports/seeing/madrid_espa%c3%b1a_3117735"
# Connect to the URL
response = requests.get(url).render()

# Parse HTML and save to BeautifulSoup object¶
soup = BeautifulSoup(response.text, "html.parser")

print(soup)

print(soup.findAll('tbody'))
