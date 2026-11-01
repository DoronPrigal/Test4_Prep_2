# בניית ה-Frontend
FROM node:22-slim AS build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
RUN npm run build

# השרת
FROM python:3.12-slim
WORKDIR /code
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app ./app
COPY --from=build /frontend/dist ./frontend/dist
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "4000"]
