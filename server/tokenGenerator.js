const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Function to generate and print the ID token for a user UID
async function generateAndPrintIdToken(uid) {
  try {
    const customToken = await admin.auth().createCustomToken(uid);
    const idToken = await admin.auth().verifyIdToken(customToken);
    console.log('ID token:', idToken);
  } catch (error) {
    console.error('Error generating ID token:', error);
    throw error;
  }
}

// Example usage: Replace "user_uid_here" with the actual user UID
const userUid = "sUcWBMEptdVuhDK0DO4lpqJ0jQU2";
generateAndPrintIdToken(userUid);



