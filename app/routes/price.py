from fastapi import APIRouter
from app.store import get_products

router = APIRouter()


@router.get("/price/{max_price}")
async def price(max_price: float):
    products = await get_products()
    return [p for p in products if p["price"] <= max_price]
