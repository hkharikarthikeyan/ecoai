from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import supabase

router = APIRouter(prefix="/cart", tags=["cart"])

class AddToCartRequest(BaseModel):
    user_id: str
    product_id: str
    product_name: str
    product_image: str
    product_points: int
    quantity: int = 1

@router.get("/{user_id}")
async def get_cart(user_id: str):
    result = supabase.table("cart").select("*").eq("user_id", user_id).execute()
    return result.data

@router.post("/")
async def add_to_cart(data: AddToCartRequest):
    # Check if item already exists
    existing = supabase.table("cart").select("*").eq("user_id", data.user_id).eq("product_id", data.product_id).execute()
    
    if existing.data:
        # Update quantity
        new_quantity = existing.data[0]["quantity"] + data.quantity
        result = supabase.table("cart").update({"quantity": new_quantity}).eq("id", existing.data[0]["id"]).execute()
    else:
        # Insert new item
        result = supabase.table("cart").insert({
            "user_id": data.user_id,
            "product_id": data.product_id,
            "product_name": data.product_name,
            "product_image": data.product_image,
            "product_points": data.product_points,
            "quantity": data.quantity
        }).execute()
    
    return {"success": True, "data": result.data}

@router.put("/{cart_id}")
async def update_cart_item(cart_id: str, quantity: int):
    result = supabase.table("cart").update({"quantity": quantity}).eq("id", cart_id).execute()
    return {"success": True, "data": result.data}

@router.delete("/{cart_id}")
async def remove_from_cart(cart_id: str):
    result = supabase.table("cart").delete().eq("id", cart_id).execute()
    return {"success": True}

@router.delete("/user/{user_id}")
async def clear_cart(user_id: str):
    result = supabase.table("cart").delete().eq("user_id", user_id).execute()
    return {"success": True}
