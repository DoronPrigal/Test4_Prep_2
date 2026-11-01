from fastapi import APIRouter, Path
from app.store import get_products

router = APIRouter()


@router.get("/rating/{min_rate}")
async def rating(min_rate: float = Path(ge=0, le=5)):
    products = await get_products()
    return [p for p in products if p["rating"]["rate"] >= min_rate]
