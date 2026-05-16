FROM python:3.10-slim

WORKDIR /app

# 1. Pehle requirements file ko container mein copy karein
COPY requirements.txt .

# 2. Container ke andar pip install chalayein
RUN pip install --no-cache-dir -r requirements.txt

# 3. Baqi ka sara code (app.py) copy karein
COPY app.py .

EXPOSE 5000

CMD ["python", "app.py"]




