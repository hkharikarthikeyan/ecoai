from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from database import supabase
from datetime import datetime
from auth_utils import verify_token

router = APIRouter(prefix="/orders", tags=["orders"])

class CartItem(BaseModel):
    id: str
    name: str
    points: int
    quantity: int

class DeliveryDetails(BaseModel):
    first_name: str
    last_name: str
    address: str
    city: str
    state: str
    zip: str
    phone: str

class CreateOrderRequest(BaseModel):
    cart_items: List[CartItem]
    delivery_method: str
    total_points: int
    delivery_details: Optional[DeliveryDetails] = None
    user_id: str

@router.post("/")
async def create_order(data: CreateOrderRequest):
    # Deduct points from user
    user_result = supabase.table("users").select("points").eq("id", data.user_id).execute()
    if not user_result.data:
        raise HTTPException(status_code=404, detail="User not found")
    
    current_points = user_result.data[0]["points"]
    if current_points < data.total_points:
        raise HTTPException(status_code=400, detail="Insufficient points")
    
    # Update user points
    new_points = current_points - data.total_points
    supabase.table("users").update({"points": new_points}).eq("id", data.user_id).execute()
    
    # Create order
    order_data = {
        "user_id": data.user_id,
        "cart_items": [item.dict() for item in data.cart_items],
        "delivery_method": data.delivery_method,
        "total_points": data.total_points,
        "delivery_details": data.delivery_details.dict() if data.delivery_details else None,
        "status": "pending",
        "created_at": datetime.utcnow().isoformat()
    }
    
    result = supabase.table("orders").insert(order_data).execute()
    
    return {
        "success": True,
        "order_id": result.data[0]["id"],
        "remaining_points": new_points
    }

@router.get("/{order_id}")
async def get_order(order_id: str):
    result = supabase.table("orders").select("*").eq("id", order_id).execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return result.data[0]

@router.get("/user/{user_id}")
async def get_user_orders(user_id: str):
    result = supabase.table("orders").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return result.data
