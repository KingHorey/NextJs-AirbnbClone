FROM Python:3.13.1

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "airbnb.asgi:application"]


