import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI in environment");

const isDev = process.env.NODE_ENV !== "production";

const globalMongo = globalThis.__mongo || {};
globalThis.__mongo = globalMongo;

if (!globalMongo.client) {
    // NOTE: In dev we allow invalid certs if Atlas TLS is problematic.
    // Remove tlsAllowInvalidCertificates in a production environment.
    const opts = isDev
        ? { serverSelectionTimeoutMS: 10000, tls: true, tlsAllowInvalidCertificates: true, tlsAllowInvalidHostnames: true }
        : { serverSelectionTimeoutMS: 10000 };
    globalMongo.client = new MongoClient(uri, opts);
}

export async function getDb() {
    if (!globalMongo.client) {
        throw new Error("MongoClient not initialized");
    }
    if (!globalMongo.client.topology || !globalMongo.client.topology.isConnected?.()) {
        await globalMongo.client.connect();
    }
    // db() uses DB name from URI or default
    const db = globalMongo.client.db();
    return db;
}
