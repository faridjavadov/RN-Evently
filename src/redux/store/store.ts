import { createStore } from "redux";
import {configureStore, } from "@reduxjs/toolkit";
import PlacesSlice from "../slices/PlacesSlice";
import SettingsSlice from "../slices/SettingsSlice";

export const store = configureStore({
    reducer:{
        PlacesSlice:PlacesSlice,
        SettingsSlice:SettingsSlice
    }
})
export type AppDispatch = typeof store.dispatch
export type StateType = ReturnType<typeof store.getState>