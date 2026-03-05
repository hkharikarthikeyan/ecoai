"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8000/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Users</h1>
      
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Points</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Tier</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Join Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user: any) => (
              <tr key={user.id}>
                <td className="px-6 py-4">
                  <Link href={`/users/${user.id}`} className="text-blue-600 hover:underline">
                    {user.name}
                  </Link>
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.points}</td>
                <td className="px-6 py-4">{user.tier}</td>
                <td className="px-6 py-4">{new Date(user.join_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
