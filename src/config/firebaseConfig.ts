import dotenv from 'dotenv';
dotenv.config(); // ✅ load .env at the very top

import {
    initializeApp,
    cert,
    getApps,
    App,
    AppOptions,
    ServiceAccount,
} from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

const getFirebaseConfig = (): AppOptions => {
    const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

    // 🔹 Debug: log what Node sees
    console.log("DEBUG: FIREBASE_PROJECT_ID:", FIREBASE_PROJECT_ID);
    console.log("DEBUG: FIREBASE_CLIENT_EMAIL:", FIREBASE_CLIENT_EMAIL);
    console.log("DEBUG: FIREBASE_PRIVATE_KEY:", FIREBASE_PRIVATE_KEY ? "exists" : "missing");

    if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
        throw new Error(
            "Missing Firebase configuration. Please check your environment variables."
        );
    }

    const serviceAccount: ServiceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        // 🔹 Ensure newlines are handled
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };

    return {
        credential: cert(serviceAccount),
    };
};

const initializeFirebaseAdmin = (): App => {
    const existingApp: App = getApps()[0];
    if (existingApp) return existingApp;
    return initializeApp(getFirebaseConfig());
};

const app: App = initializeFirebaseAdmin();
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { db, auth };