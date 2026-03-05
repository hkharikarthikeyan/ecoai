"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:8000/admin/users/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const handleUpdateCoins = async () => {
    if (!weight || parseFloat(weight) <= 0) return;
    
    setLoading(true);
    const coins = parseFloat(weight) * 20;
    
    try {
      const res = await fetch(`http://localhost:8000/admin/users/${params.id}/coins`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight: parseFloat(weight), coins })
      });
      
      if (res.ok) {
        await fetchUser();
        setWeight("");
      }
    } catch (error) {
      console.error("Failed to update coins:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => router.back()} className="mb-4 text-blue-600">← Back</button>
      
      <h1 className="text-3xl font-bold mb-8">User Details</h1>
      
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Points:</strong> {user.points}</p>
          <p><strong>Tier:</strong> {user.tier}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Add Coins</h2>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter weight"
              step="0.1"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Coins</label>
            <input
              type="text"
              value={weight ? (parseFloat(weight) * 20).toFixed(0) : ""}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-50"
              placeholder="Auto-calculated"
            />
          </div>
          <button
            onClick={handleUpdateCoins}
            disabled={loading || !weight}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Add Coins"}
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">1 kg = 20 coins</p>
      </div>
    </div>
  );
}
