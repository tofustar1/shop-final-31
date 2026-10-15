import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {productsReducer} from "../features/products/productsSlice.ts";
import {categoriesReducer} from "../features/categories/categoriesSlice.ts";
import {usersReducer} from "../features/users/usersSlice.ts";
import {FLUSH, REHYDRATE, PAUSE, REGISTER, PERSIST, PURGE, persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/es/storage";

const usersPersistConfig = {
  key: 'shop:users',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  }
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch