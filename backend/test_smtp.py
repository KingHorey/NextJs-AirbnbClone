import smtplib
from decouple import config

EMAIL_HOST = config("MAIL_HOST")
EMAIL_HOST_USER = config("MAIL_USER")
EMAIL_HOST_PASSWORD = config("MAIL_PASSWORD")
EMAIL_PORT = 465
EMAIL_USE_TLS = False
EMAIL_TIMEOUT = 300
DEFAULT_FROM_EMAIL = config("MAIL_USER")

def test_smtp_connection():
    try:
        server = smtplib.SMTP(EMAIL_HOST, 465)
        server.starttls()
        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        print("Connection successful!")
        server.quit()
    except Exception as e:
        print(f"Connection failed: {str(e)}")

test_smtp_connection()
