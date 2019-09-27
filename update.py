from distutils.dir_util import copy_tree
import os
os.system('cd /home/sgomez/internal-computer/')
os.system('git pull')
copy_tree("./www", "../www")
