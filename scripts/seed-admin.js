// scripts/seed-admin.js
import dotenv from 'dotenv'
dotenv.config()
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'

const uri = process.env.MONGODB_URI
console.log(uri,"uri2");

if (!uri) throw new Error('MONGODB_URI missing')

async function run(){
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db()
  const plain = 'AdminPass123' // change if you want
  const hash = await bcrypt.hash(plain, 10)
  const doc = { username:'admin', email:'admin@example.com', passwordHash: hash, createdAt: new Date() }
  await db.collection('auth').deleteMany({}) // optional clear for dev
  const r = await db.collection('auth').insertOne(doc)
  console.log('Inserted admin id:', r.insertedId, 'password:', plain)
  await client.close()
}
run().catch(e=>{ console.error(e); process.exit(1) })
