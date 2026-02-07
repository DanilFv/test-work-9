import {configureStore} from '@reduxjs/toolkit';
import {
    categoriesReducer
} from '../containers/CategoriesPage/categoriesSlice.ts';

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;