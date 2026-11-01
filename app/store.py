import httpx
from fastapi import HTTPException

URL = "https://fakestoreapi.com/products"


async def get_products():
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            res = await client.get(URL)
            res.raise_for_status()
            return res.json()
    except httpx.HTTPError:
        raise HTTPException(status_code=502, detail="fakestoreapi.com is not available")
