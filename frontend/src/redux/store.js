import { configureStore } from '@reduxjs/toolkit';
import companionSlice from './slices/companionSlice';

export const store = configureStore({
    reducer: {
        companion: companionSlice,
    }
})