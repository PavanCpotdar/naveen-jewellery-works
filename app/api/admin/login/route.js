// 
// app/api/admin/login/route.js
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { getDb } from '../../../../lib/mongodb.js'

export async function POST(req) {
    try {
        let body
        try {
            body = await req.json()
        } catch (_) {
            return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
        }
        const { usernameOrEmail, password } = body || {}
        if (!usernameOrEmail || !password) return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })

        const db = await getDb()

        const user = await db.collection('auth').findOne({
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
        })
        console.log(user, "user");


        if (!user || !user.passwordHash) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

        const ok = await bcrypt.compare(password, user.passwordHash)
        if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

        const ADMIN_TOKEN = process.env.ADMIN_TOKEN || Math.random().toString(36).slice(2)
        const isProd = process.env.NODE_ENV === 'production'
        const maxAge = 60 * 60 * 24 * 7

        const cookie = [
            `admin_token=${ADMIN_TOKEN}`,
            `Path=/`,
            `HttpOnly`,
            `SameSite=Lax`,
            `Max-Age=${maxAge}`,
            isProd ? 'Secure' : ''
        ].filter(Boolean).join('; ')

        const res = NextResponse.json({ ok: true })
        res.headers.set('Set-Cookie', cookie)
        return res
    } catch (err) {
        console.error('Login error:', err)
        return NextResponse.json({ error: 'Server error', details: err?.message }, { status: 500 })
    }
}
