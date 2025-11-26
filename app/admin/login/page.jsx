"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AdminLoginPage({ from = "/admin" }) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function submit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usernameOrEmail: id, password }),
                credentials: "same-origin",
            });

            let data;
            try {
                data = await res.json();
            } catch {
                data = null;
            }

            if (!res.ok) {
                const message = data?.error || `Login failed (status ${res.status})`;
                toast.error(message);
                setLoading(false);
                return;
            }

            toast.success("Signed in — redirecting…");
            setTimeout(() => router.push(from), 300);
        } catch (err) {
            console.error(err);
            toast.error("Network error. Try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
            <form onSubmit={submit} className="w-full max-w-md bg-white/5 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Admin Login</h2>

                <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Email or username"
                    className="w-full p-3 mb-3 rounded bg-transparent border border-white/10"
                    autoComplete="username"
                />

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-3 rounded bg-transparent border border-white/10"
                    autoComplete="current-password"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 py-2 rounded bg-yellow-400 text-black flex items-center justify-center gap-3 ${loading ? "opacity-80 cursor-wait" : ""
                        }`}
                >
                    {loading ? (
                        <>
                            <Spinner /> Signing in…
                        </>
                    ) : (
                        "Sign in"
                    )}
                </button>
            </form>
        </div>
    );
}

function Spinner() {
    return (
        <svg className="animate-spin w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
        </svg>
    );
}
