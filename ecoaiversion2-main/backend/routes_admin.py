from fastapi import APIRouter, HTTPException
from database import supabase

router = APIRouter(prefix="/admin", tags=["admin"])

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

@router.get("/users")
async def get_all_users():
    if not supabase:
        raise HTTPException(status_code=503, detail="Database connection unavailable. Check server logs.")
    try:
        result = supabase.table("users").select("*").order("created_at", desc=True).execute()
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

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
