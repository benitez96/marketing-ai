# pull official base image
FROM python:3.12-bookworm

# set work directory
WORKDIR /app

# set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
# RUN apk update \
#     && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# copy project
COPY . .
# RUN sed -i 's/\r$//g' /app/entrypoint.sh
# RUN chmod +x /app/entrypoint.sh
