import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoRecycle Admin Panel",
  description: "Admin panel for EcoRecycle platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        <div className="flex min-h-screen">
          <aside className="w-64 bg-primary text-primary-foreground p-6">
            <h1 className="text-2xl font-bold mb-8">EcoRecycle Admin</h1>
            <nav className="space-y-2">
              <a href="/" className="block px-4 py-2 rounded hover:bg-primary/80">Dashboard</a>
              <a href="/users" className="block px-4 py-2 rounded hover:bg-primary/80">Users</a>
              <a href="/orders" className="block px-4 py-2 rounded hover:bg-primary/80">Orders</a>
              <a href="/products" className="block px-4 py-2 rounded hover:bg-primary/80">Products</a>
            </nav>
          </aside>
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
