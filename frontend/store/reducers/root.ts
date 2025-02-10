import { combineReducers } from "@reduxjs/toolkit";
import bookingFilterSlice from "./bookingFilterReducer/bookingFilterReducer";
import userInfoSlice from "./userInfo/userReducer";

const rootReducer = combineReducers({
  bookingFilter: bookingFilterSlice,
  userAuth: userInfoSlice,
});

export default rootReducer;
