import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/root";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
