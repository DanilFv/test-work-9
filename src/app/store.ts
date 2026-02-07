import {configureStore} from '@reduxjs/toolkit';
import {
    categoriesReducer
} from '../containers/CategoriesPage/categoriesSlice.ts';
import {transactionsReducer} from '../containers/Home/transactionsSlice.ts';

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        transactions: transactionsReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;