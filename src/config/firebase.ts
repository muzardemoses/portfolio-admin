// import { initializeApp } from "firebase/app";
// import {
//     getAuth,
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
//     signOut,
//     onAuthStateChanged,
//     sendPasswordResetEmail,
//     sendEmailVerification,
//     EmailAuthProvider,
//     updateProfile,
//     updateEmail,
//     updatePassword,
//     reauthenticateWithCredential,
//     verifyBeforeUpdateEmail,
//     User,
// } from "firebase/auth";
// import {
//     getFirestore,
//     collection,
//     query,
//     where,
//     getDoc,
//     setDoc,
//     addDoc,
//     deleteDoc,
//     doc,
//     getDocs,
//     updateDoc,
//     serverTimestamp,
//     arrayUnion,
//     onSnapshot,
//     writeBatch,
// } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getConfigField } from "@/utils/doc/getConfigField";
// import { notifyVerified } from "@/emails/auth";
// import { User as UserType } from "@/types/users";


// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// export const createUserProfileDocument = async (userAuth: User, additionalData: { photoURL?: string; name?: string; dateOfBirth?: string; hasDateOfBirth?: boolean;}) => {
//     if (!userAuth) return;

//     const userRef = doc(db, `users/${userAuth.uid}`);
//     const snapShot = await getDoc(userRef);

//     if (!snapShot.exists()) {
//         const { displayName, email, photoURL } = userAuth; // These are from the userAuth object
//         const createdAt = new Date().toISOString();

//         // Use additionalData for the name, dateOfBirth, etc.
//         const { name, dateOfBirth, hasDateOfBirth } = additionalData;

//         // const name = "";
//         const followers = [] as UserType["followers"]
//         const following = [] as UserType["following"]
//         const lastLogin = new Date().toISOString() as UserType["lastLogin"];
//         const selectedOptions = [] as UserType["selectedOptions"];
//         const notifications = [] as UserType["notifications"];
//         const recentSearches = [] as UserType["recentSearches"];
//         const sidebarPins = [] as UserType["sidebarPins"];
//         const isEmailVerified = true as UserType["isEmailVerified"];
//         const mutes = [] as UserType["mutes"];
//         const blocks = [] as UserType["blocks"];
//         const lastActive = new Date().toISOString() as UserType["lastActive"];
//         const isSuspended = false as UserType["isSuspended"];
//         const suspendedDuration = "" as UserType["suspendedDuration"];
//         const suspendedAt = null as UserType["suspendedAt"];
//         const isDeleted = false as UserType["isDeleted"];
//         const statusHistory = [
//             {
//                 status: "active",
//                 date: new Date(),
//                 by: "user",
//                 color: "rgb(17,141,87)",
//                 background: "rgba(34,197,94,0.16)",
//             },
//         ] as UserType["statusHistory"];
//         const bookmarkedPosts = [] as UserType["bookmarkedPosts"];
//         const notificationPreferences = {
//             email: {
//                 comments: true,
//                 likes: true,
//                 reposts: true,
//                 follows: true,
//                 mentions: true,
//                 messages: true,
//                 newsletter: true,
//             },
//             push: {
//                 comments: true,
//                 likes: true,
//                 reposts: true,
//                 follows: true,
//                 mentions: true,
//                 messages: true,
//                 newsletter: true,
//             },
//         } as UserType["notificationPreferences"];
//         const shortBio = "" as UserType["shortBio"];
//         const facebookLink = "" as UserType["facebookLink"];
//         const twitterLink = "" as UserType["twitterLink"];
//         const instagramLink = "" as UserType["instagramLink"];
//         const linkedinLink = "" as UserType["linkedinLink"];
//         const country = "" as UserType["country"];
//         const websiteUrl = "" as UserType["websiteUrl"];
//         const occupation = "" as UserType["occupation"];

//         // get unusableUsernames from config
//         const unusableUsernames = await getConfigField(db, "userConifg", "unusableUsernames");

//         //Generate username from email
//         if (email) {
//             const username = email.split("@")[0].replace(/[^a-z]/g, "");
//             if (!username || unusableUsernames.includes(username)) return;
//             // if (!username) return;
//             let usernameTaken = true;
//             let usernameToSave = username;
//             let i = 1;

//             // Check if username is already taken
//             while (usernameTaken) {
//                 const querySnapshot = await getDocs(
//                     query(
//                         collection(db, "users"),
//                         where("username", "==", usernameToSave)
//                     )
//                 );
//                 if (querySnapshot.empty) {
//                     usernameTaken = false;
//                 } else {
//                     usernameToSave = username + i;
//                     i++;
//                 }
//             }

//             const profileLink = `https://www.wholesquare.org/${usernameToSave}`;

//             try {
//                 await setDoc(userRef, {
//                     displayName: displayName || name, //no forget to have john for users with no displayName
//                     name: name || displayName,
//                     email,
//                     photoURL: photoURL || additionalData.photoURL,
//                     createdAt,
//                     followers,
//                     following,
//                     selectedOptions,
//                     notifications,
//                     recentSearches,
//                     sidebarPins,
//                     lastLogin,
//                     isEmailVerified,
//                     dateOfBirth: dateOfBirth || "",
//                     hasDateOfBirth: hasDateOfBirth || false,
//                     bookmarkedPosts,
//                     username: usernameToSave, // set the final value of usernameToSave
//                     mutes,
//                     blocks,
//                     lastActive,
//                     isSuspended,
//                     suspendedDuration,
//                     suspendedAt,
//                     isDeleted,
//                     statusHistory,
//                     notificationPreferences,
//                     shortBio,
//                     facebookLink,
//                     twitterLink,
//                     instagramLink,
//                     linkedinLink,
//                     country,
//                     websiteUrl,
//                     occupation,
//                     ...additionalData,
//                 });
//                 await notifyVerified(email, name as string, usernameToSave, profileLink);
//                 //await updateDoc(userRef, { lastLoginAt});
//             } catch (error) {
//                 console.log("error creating user", (error as Error).message);
//             }
//         } else {
//             const username = displayName?.replace(/\s+/g, "").toLowerCase();
//             if (!username || unusableUsernames.includes(username)) return;
//             let usernameTaken = true;
//             let usernameToSave = username;
//             let i = 1;

//             // Check if username is already taken
//             while (usernameTaken) {
//                 const querySnapshot = await getDocs(
//                     query(
//                         collection(db, "users"),
//                         where("username", "==", usernameToSave)
//                     )
//                 );
//                 if (querySnapshot.empty) {
//                     usernameTaken = false;
//                 } else {
//                     usernameToSave = username + i;
//                     i++;
//                 }
//             }

//             const profileLink = `https://www.wholesquare.org/${usernameToSave}`;

//             try {
//                 await setDoc(userRef, {
//                     displayName: displayName || name, //no forget to have john for users with no displayName
//                     name: name || displayName,
//                     email,
//                     photoURL: photoURL || additionalData.photoURL,
//                     createdAt,
//                     followers,
//                     following,
//                     selectedOptions,
//                     notifications,
//                     recentSearches,
//                     sidebarPins,
//                     lastLogin,
//                     isEmailVerified,
//                     dateOfBirth: dateOfBirth || "",
//                     hasDateOfBirth: hasDateOfBirth || false,
//                     bookmarkedPosts,
//                     username: usernameToSave, // set the final value of usernameToSave
//                     mutes,
//                     blocks,
//                     lastActive,
//                     isSuspended,
//                     suspendedDuration,
//                     suspendedAt,
//                     isDeleted,
//                     statusHistory,
//                     notificationPreferences,
//                     shortBio,
//                     facebookLink,
//                     twitterLink,
//                     instagramLink,
//                     linkedinLink,
//                     country,
//                     websiteUrl,
//                     occupation,
//                     ...additionalData,
//                 });
//                 await notifyVerified(email as string, displayName as string, usernameToSave, profileLink);
//             } catch (error) {
//                 console.log("error creating user", (error as Error).message);
//             }
//         }
//     }
//     return userRef;
// };




// export {
//     auth,
//     storage,
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
//     signOut,
//     onAuthStateChanged,
//     sendPasswordResetEmail,
//     sendEmailVerification,
//     EmailAuthProvider,
//     verifyBeforeUpdateEmail,
//     updateProfile,
//     updateEmail,
//     updatePassword,
//     reauthenticateWithCredential,
//     db,
//     collection,
//     query,
//     where,
//     getDoc,
//     setDoc,
//     addDoc,
//     deleteDoc,
//     doc,
//     getDocs,
//     updateDoc,
//     serverTimestamp,
//     arrayUnion,
//     onSnapshot,
//     writeBatch,
// };