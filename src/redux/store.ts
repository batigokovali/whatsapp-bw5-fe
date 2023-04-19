import { configureStore } from "@reduxjs/toolkit";
import { StoreSlice } from "./reducers/storeSlice";

export const store = configureStore({

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }),
      reducer: {
        store: StoreSlice.reducer
    },
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch