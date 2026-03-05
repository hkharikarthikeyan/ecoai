from fastapi import APIRouter, HTTPException
from database import supabase
from pydantic import BaseModel

router = APIRouter(prefix="/admin", tags=["admin"])

class CoinsUpdate(BaseModel):
    weight: float
    coins: int

@router.get("/stats")
async def get_stats():
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    users = supabase.table("users").select("*", count="exact").execute()
    orders = supabase.table("orders").select("*", count="exact").execute()
    pending = supabase.table("orders").select("*", count="exact").eq("status", "pending").execute()
    
    total_points = sum(user["points"] for user in users.data) if users.data else 0
    
    return {
        "totalUsers": users.count or 0,
        "totalOrders": orders.count or 0,
        "pendingOrders": pending.count or 0,
        "totalPoints": total_points
    }

@router.get("/users/{user_id}")
async def get_user(user_id: str):
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    try:
        result = supabase.table("users").select("*").eq("id", user_id).execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="User not found")
        return result.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@router.get("/users")
async def get_all_users():
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection unavailable. Check server logs.")
    try:
        result = supabase.table("users").select("*").order("created_at", desc=True).execute()
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.put("/users/{user_id}/coins")
async def update_user_coins(user_id: str, data: CoinsUpdate):
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    
    user = supabase.table("users").select("points").eq("id", user_id).execute()
    if not user.data:
        raise HTTPException(status_code=404, detail="User not found")
    
    new_points = user.data[0]["points"] + data.coins
    result = supabase.table("users").update({"points": new_points}).eq("id", user_id).execute()
    return {"success": True, "data": result.data}

@router.get("/orders")
async def get_all_orders():
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    result = supabase.table("orders").select("*, users(name)").order("created_at", desc=True).execute()
    orders = []
    for order in result.data:
        orders.append({
            **order,
            "user_name": order["users"]["name"] if order.get("users") else "Unknown"
        })
    return orders

@router.put("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: dict):
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    result = supabase.table("orders").update({"status": status["status"]}).eq("id", order_id).execute()
    return {"success": True, "data": result.data}
