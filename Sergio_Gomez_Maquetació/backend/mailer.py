import sys
import email
import smtplib
import ssl

from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

port = 465  # For SSL
labels = ['-f', '-p', '-s', '-e', '-h', '--h',
          '-?', '-help', '--help', '-t', '-a']
helpl = ['--h', '-?', '-help', '--help']
lchar = 'faehpst'

# Detects if the sintaxis of argv is correct and returns 0 for help,
# 1 for ordered mode, 2 for label and then variable and 3 for all the lables
# first and then the input in order of label


def check_prefix(array):
    n = len(array) // 2
    for i in range(len(array) // 2):
        if (not(array[i * 2] in labels)):
            n = n - 1
        elif(array[i * 2] in helpl):
            showhelp()
            return 0
    else:
        if (n == 0):
            return 1
        elif (n < (len(array) / 2) and n != len(array) - 1):
            showhelp()
            raise(
                'Invalid identification: you must use the labels or just the variables in order')
        elif(n == len(array) - 1 and array[0][0] == '-'):
            for i in array[0][1:]:
                if (not(i in lchar)):
                    showhelp()
                    raise("Invalid identification: the expression label isn't correct")
            else:
                return 3
        elif(n == (len(array) / 2)):
            return 2

# Prints the help menu


def showhelp():
    help = '\npython3 mailer.py [useremail][heather][text][atachments]\n' +\
             '                  or [-e usermail][-h heather][-t text][-a atatchment]\n' + \
             '                  or [-ehta][elements in orther of expression]\n\n\n' + \
             '-?                Shows this menu\n' + \
             '-a                atatchemnt path as an array of strings\n' +\
             '-e                array of reciever emails\n' +\
             '-f                email of the sender\n' + \
             '-h                heather\n' + \
             '--h               Shows this menu\n' + \
             '-help/--help      Shows this menu\n' + \
             '-p                Password of the sender\n' + \
             '-s                smtp server url' + \
             '-t                text for the mail\n'
    print(help)


# selects the parsing funtion depending of the value returned by check_prefix
def selectmode(val, array):
    if (val == 0):
        pass
    elif(val == 1):
        preordermode(array)
    elif(val == 2):
        labledmode(array)
    elif(val == 3):
        label_order_mode(array)
    else:
        raise("Undefined mode: the mode selected doesn't exist")
# parses the array by orther: email of the sender, list of emails of who
# recieves the email, heather, text and the list of atatchemnts


def preordermode(array):
    send_email(array[0], array[1], array[2],
               array[3], array[4], array[5], array[6])


def labelmode(array):
    mail = {
        'f': '',
        'p': '',
        's': '',
        'e': [],
        'h': '',
        't': '',
        'a': []
    }
    for i in range(len(array) // 2):
        mail[array[i * 2][-1]] = array[i * 2 + 1]
    send_email(mail['f'], mail['p'], mail['s'],
               mail['e'], mail['h'], mail['t'], mail['a'])


def label_order_mode(array):
    mail = {
        'f': '',
        'p': '',
        's': '',
        'e': [],
        'h': '',
        't': '',
        'a': []
    }
    for i in range(1, len(array[1:])):
        mail[array[0][i]] = array[i]
    send_email(mail['f'], mail['p'], mail['s'],
               mail['e'], mail['h'], mail['t'], mail['a'])
# email sender


def send_email(femail='', password='', server='smtp.gmail.com' temail=[], heather=None, text='', atatchemnts=''):

    print(femail, arrayparser(temail), heather, text, arrayparser(atatchemnts))
    context = ssl.create_default_context()
    message = MIMEMultipart()
    message["From"] = femail
    message["To"] = ','.join(temail)
    message["Subject"] = heather
    message["Bcc"] = ','.join(temail)  # Recommended for mass emails

    # Add body to email
    message.attach(MIMEText(text, "plain"))
    try:
        for filename in atatchments:
            with open(filename, "rb") as attachment:
                # Add file as application/octet-stream
                # Email client can usually download this automatically as attachment
                part = MIMEBase("application", "octet-stream")
                part.set_payload(attachment.read())
            # Encode file in ASCII characters to send by email
            encoders.encode_base64(part)

            # Add header as key/value pair to attachment part
            part.add_header(
                "Content-Disposition",
                f"attachment; filename= {filename}",
            )

            # Add attachment to message and convert message to string
            message.attach(part)
    except Exception():
        print(Exception())
    text = message.as_string()
    with smtplib.SMTP_SSL(server, port, context=context) as server:
        server.login(femail, password)
        server.sendmail(sender_email, receiver_email, text)


# parser that converst an string to a list. Ex: '[potato,potato]' to
# ['potato','potato']


def arrayparser(str):
    return str[1:-2].split(',')


selectmode(check_prefix(sys.argv[1:]), sys.argv[1:])
