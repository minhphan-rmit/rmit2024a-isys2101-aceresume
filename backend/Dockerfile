FROM python:3.11

ARG OPENAI_API_KEY
ARG DATABASE_URI
ARG FROM_EMAIL
ARG EMAIL_PASSWORD

WORKDIR /app
ADD . /app
RUN pip install --no-cache-dir -r requirements.txt


ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV DATABASE_URI=${DATABASE_URI}
ENV FROM_EMAIL=${FROM_EMAIL}
ENV EMAIL_PASSWORD=${EMAIL_PASSWORD}

EXPOSE 8080
CMD ["uvicorn", "main:app", "--workers=-1", "--host=0.0.0.0", "--port=8080"]
