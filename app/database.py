import os
import pymysql
from dotenv import load_dotenv

load_dotenv()


def get_connection():
    return pymysql.connect(
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT")),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        autocommit=True,
    )


def init_db():
    # יצירת טבלת logs אם אינה קיימת
    with get_connection() as conn, conn.cursor() as cur:
        cur.execute(
            """CREATE TABLE IF NOT EXISTS logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Description VARCHAR(255) NOT NULL,
                Method VARCHAR(10) NOT NULL,
                Route VARCHAR(255) NOT NULL,
                Duration_ms FLOAT NOT NULL
            )"""
        )


def save_log(description, method, route, duration_ms):
    with get_connection() as conn, conn.cursor() as cur:
        cur.execute(
            "INSERT INTO logs (Description, Method, Route, Duration_ms) VALUES (%s, %s, %s, %s)",
            (description, method, route, duration_ms),
        )
