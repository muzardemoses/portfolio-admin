import { configureStore } from "@reduxjs/toolkit";
import storage from "./storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import rootReducers from "./rootReducer";

const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

// const userConfig = {
//   key: "user",
//   storage,
// };

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            ignoredPaths: ["user.user.lastLogin"], // Ignore specific paths
        },
    })
});

const persistor = persistStore(store);
export { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
