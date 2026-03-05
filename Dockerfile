FROM python:3.11

WORKDIR /app

COPY backend /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["sh", "-c", "python manage.py runserver 0.0.0.0:$PORT"]