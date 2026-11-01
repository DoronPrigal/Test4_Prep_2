from fastapi import APIRouter
from app.store import get_products

router = APIRouter()


@router.get("/products")
async def all_products():
    return await get_products()
