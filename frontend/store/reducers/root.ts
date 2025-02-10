import { combineReducers } from "@reduxjs/toolkit";
import bookingFilterSlice from "./bookingFilterReducer/bookingFilterReducer";

const rootReducer = combineReducers({
  bookingFilter: bookingFilterSlice,
});

export default rootReducer;
