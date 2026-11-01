from fastapi import APIRouter
from app.store import get_products

router = APIRouter()


@router.get("/search/{text}")
async def search(text: str):
    products = await get_products()
    return [p for p in products if text.lower() in p["title"].lower()]
