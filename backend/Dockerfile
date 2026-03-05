# Koristimo Python image
FROM python:3.11-slim

# Postavimo radni folder
WORKDIR /app

# Kopiramo requirements
COPY requirements.txt .

# Instaliramo dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Kopiramo ostatak koda
COPY . .

# Otvaramo port
EXPOSE 8000

# Pokrećemo server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]