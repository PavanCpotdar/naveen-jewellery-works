"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminDashboard() {
    const [form, setForm] = useState({ name: "", price: "", category: "", stock: "", image: "", description: "" });
    const [msg, setMsg] = useState("");
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setLoadingProducts(true);
        fetch("/api/products")
            .then(async (r) => {
                if (!r.ok) {
                    const t = await r.text().catch(() => "");
                    throw new Error(t || `HTTP ${r.status}`);
                }
                return r.json();
            })
            .then((d) => setProducts(d.products || []))
            .catch((err) => {
                console.error("fetch products failed", err);
                toast.error("Failed to load products");
            })
            .finally(() => setLoadingProducts(false));
    }, []);

    async function submit(e) {
        e.preventDefault();
        setMsg("");
        setSaving(true);
        try {
            const res = await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "same-origin",
                body: JSON.stringify(form),
            });

            let data = null;
            try {
                data = await res.json();
            } catch {
                data = null;
            }

            if (!res.ok) {
                const errorMsg = data?.error || `Failed (${res.status})`;
                toast.error(errorMsg);
                setMsg(errorMsg);
                return;
            }

            toast.success("Product added");
            setProducts((prev) => [data.product, ...prev]);
            setForm({ name: "", price: "", category: "", stock: "", image: "", description: "" });
        } catch (err) {
            console.error(err);
            toast.error("Network error while adding");
            setMsg("Network error");
        } finally {
            setSaving(false);
        }
    }

    async function signOut() {
        try {
            await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
            toast.success("Signed out");
        } catch (err) {
            console.error(err);
            toast.error("Sign out error");
        } finally {
            // allow middleware to redirect (reload)
            setTimeout(() => (window.location.href = "/admin/login"), 300);
        }
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
                <button onClick={signOut} className="px-3 py-1 bg-black text-yellow-300 rounded">
                    Logout
                </button>
            </div>

            <section className="mt-6 max-w-lg">
                <h2 className="font-semibold mb-2">Add Product</h2>
                <form onSubmit={submit} className="space-y-2">
                    <input className="w-full p-2 border" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input className="w-full p-2 border" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                    <input className="w-full p-2 border" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                    <input className="w-full p-2 border" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                    <input className="w-full p-2 border" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                    <textarea className="w-full p-2 border" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    <div>
                        <button type="submit" disabled={saving} className={`px-4 py-2 bg-black text-yellow-300 rounded flex items-center gap-3 ${saving ? "opacity-80 cursor-wait" : ""}`}>
                            {saving ? <><Spinner /> Adding…</> : "Add product"}
                        </button>
                    </div>
                </form>
                {msg && <div className="mt-2 text-sm">{msg}</div>}
            </section>

            <section className="mt-8">
                <h2 className="font-semibold mb-3">Products</h2>

                {loadingProducts ? (
                    <div className="py-8 flex items-center justify-center">
                        <SpinnerLarge />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-4">
                        {products.length === 0 && <div className="text-sm text-gray-500">No products yet</div>}
                        {products.map((p) => (
                            <div key={p._id} className="p-3 border rounded bg-white">
                                <img src={p.image || "/images/diamond-studs.jpg"} alt={p.name} className="w-full h-36 object-cover rounded" />
                                <h3 className="font-semibold mt-2">{p.name}</h3>
                                <div className="text-sm text-slate-600">${p.price}</div>
                                <div className="text-xs mt-1">{p.category}</div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

function Spinner() {
    return (
        <svg className="animate-spin w-4 h-4 text-yellow-300" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
    );
}

function SpinnerLarge() {
    return (
        <svg className="animate-spin w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
    );
}
