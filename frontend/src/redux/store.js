import { configureStore } from '@reduxjs/toolkit';
import companionSlice from './slices/companionSlice';
import archiveSlice from './slices/archiveSlice';

export const store = configureStore({
    reducer: {
        companion: companionSlice,
        archive: archiveSlice
    }
})