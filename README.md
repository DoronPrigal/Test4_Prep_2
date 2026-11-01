# Products REST API

שרת REST API ב-FastAPI שמחזיר מוצרים מ-https://fakestoreapi.com ושומר Log של כל בקשת API בטבלת `logs` ב-MySQL (`logs_db`).

## Routes
| Route | תיאור |
|---|---|
| `GET /api/products` | כל המוצרים |
| `GET /api/search/{text}` | מוצרים שה-title שלהם מכיל את הטקסט (ללא הבדל בין אותיות גדולות/קטנות) |
| `GET /api/price/{max}` | מוצרים במחיר קטן או שווה ל-max |
| `GET /api/rating/{min}` | מוצרים עם `rating.rate` גדול או שווה ל-min (0–5) |

תיעוד Swagger: http://localhost:4000/docs

## טבלת logs
`id`, `Description`, `Method`, `Route`, `Duration_ms`. נרשמות גם בקשות שנכשלו (למשל 422).

## הרצה עם Docker (פקודה אחת)
1. `copy .env.example .env` ולשנות את `DB_PASSWORD`.
2. `docker compose up -d --build`

השרת (כולל ה-Frontend) זמין ב-http://localhost:4000
ה-Dockerfile בונה את ה-Frontend אוטומטית.

## הרצה מקומית
```
docker compose up -d db
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --port 4000
```

## Frontend (React + TypeScript)
בתיקייה `frontend`. השרת מגיש את `frontend/dist` בנתיב `/`.
```
cd frontend
npm install
npm run build      # יוצר את frontend/dist, והשרת מגיש אותו ב-http://localhost:4000
npm run dev        # פיתוח: http://localhost:5173 (מפנה את /api לשרת)
```

## Postman
לייבא את `Products_API.postman_collection.json`.
