import smtplib
from decouple import config

EMAIL_HOST = config("MAIL_HOST")
EMAIL_HOST_USER = config("MAIL_USER")
EMAIL_HOST_PASSWORD = config("MAIL_PASSWORD")
EMAIL_PORT = 465
EMAIL_USE_TLS = True
EMAIL_TIMEOUT = 300
DEFAULT_FROM_EMAIL = config("MAIL_USER")

def test_smtp_connection():
    try:
        server = smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT)
        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        print("Connection successful!")
        server.quit()
    except Exception as e:
        print(f"Connection failed: {str(e)}")

test_smtp_connection()
