import numpy as np
from pprint import pprint
from collections import OrderedDict
from bs4 import BeautifulSoup
import mysql.connector
import requests
from requests_html import HTMLSession
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep


mydb = mysql.connector.connect(
    host="localhost",
    user="teo",
    passwd="01-01-2002"
)


print(mydb)

url = "https://www.meteoblue.com/es/tiempo/outdoorsports/seeing/madrid_espa%c3%b1a_3117735"

driver = webdriver.Firefox()
driver.get(url)
tablepath = '/html/body/div[1]/div/div[2]/div[3]/div/div[2]/div/div[1]/table/tbody/tr[2]'
tableroot = '/html/body/div[1]/div/div[2]/div[3]/div/div[2]/div/div[1]/table/tbody'
sleep(2)

button = driver.find_element_by_xpath(
    '/html/body/div[2]/div/div/div/div[2]/p[6]/button')
print(button)
button.click()
sleep(5)
table = driver.find_element_by_xpath(tablepath)
print(table.text)
sleep(4)
i = 0
while(True):
    try:
        table = driver.find_element_by_xpath(tableroot + 'tr[' + str(i) + ']')
        print(table.text)
    except:
        break


tbody = driver.find_element_by_xpath(tableroot)


print('_' * 100)
print('tbody')
print(tbody.text)


sleep(1)


text = tbody.text
celestial = tbody.find_elements_by_class_name('celestial-table')


bodies = []
for x in celestial:
    cb = x.get_attribute('textContent').split('\n')
    for i in range(len(cb)):
        cb[i] = cb[i].strip()
    bodies.append(cb)

print(bodies)
# driver.close()
data=bodies
driver.close()


data = [[cell for cell in row if cell != ''] for row in data]


parsedrows = text.split('\n')
parsedtable = [x.split() for x in parsedrows]

print(parsedtable)
for i in parsedtable:
    if(type(i) == str):
        pass
