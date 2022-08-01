FROM python:3.9.5-alpine3.13
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

ENV DB_HOST=$DB_HOST
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_PORT=$DB_HOST

WORKDIR /app

RUN apk add --no-cache --virtual .build-deps \
        gcc g++ musl-dev libffi-dev postgresql-dev &&\
    apk add --no-cache --virtual caddy postgresql-libs &&\
    apk add yarn

COPY ./Caddyfile ./

RUN start caddy &

WORKDIR /app/AcmeHrApp

COPY ./AcmeHrApp/requirements.txt /app/AcmeHrApp/

RUN pip install -r requirements.txt &&\
    apk del --no-network .build-deps  

COPY ./AcmeHrApp /app/AcmeHrApp/

WORKDIR /app/frontend

COPY ["./frontend/package.json", "./frontend/yarn.lock", "./app/frontend/"]

RUN yarn install

COPY ./frontend /app/frontend/

RUN yarn add react-scripts &&\
    yarn relocate

EXPOSE 8080

WORKDIR /app/AcmeHrApp

RUN python manage.py collectstatic

CMD ["gunicorn", "AcmeHrApp.wsgi:application", "--timeout", "200", "--bind", "0.0.0.0:8080"]
