import type {
    ICategory,
    ICategoryAPI,
    ICategoryMutation,
    IUpdateCategory
} from '../../types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';
import {toast} from 'react-toastify';

interface CategorySlice {
    items: ICategory[];
    oneItem: ICategory | null;
    fetchLoading: boolean;
    addLoading: boolean;
    deleteLoading: boolean;
    editLoading: boolean;
}

const initialState: CategorySlice = {
    items: [],
    oneItem: null,
    fetchLoading: false,
    addLoading: false,
    deleteLoading: false,
    editLoading: false,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.fetchLoading = false;
            state.items = action.payload;
        });
        builder.addCase(fetchCategories.rejected, (state) => {
            state.fetchLoading = false;
        });


        builder.addCase(fetchAddCategories.pending, (state) => {
            state.addLoading = true;
        });
        builder.addCase(fetchAddCategories.fulfilled, (state) => {
            state.addLoading = false;
        });
        builder.addCase(fetchAddCategories.rejected, (state) => {
            state.addLoading = false;
        });

        builder.addCase(fetchDeleteCategory.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(fetchDeleteCategory.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(fetchDeleteCategory.rejected, (state) => {
            state.deleteLoading = false;
        });

        builder.addCase(fetchEditCategory.pending, (state) => {
            state.editLoading = true;
        });
        builder.addCase(fetchEditCategory.fulfilled, (state) => {
            state.editLoading = false;
        });
        builder.addCase(fetchEditCategory.rejected, (state) => {
            state.editLoading = false;
        });

         builder.addCase(fetchOneItem.pending, (state) => {
            state.editLoading = true;
        });
        builder.addCase(fetchOneItem.fulfilled, (state, action) => {
            state.editLoading = false;
            const payload = action.payload;
            if (payload) state.oneItem = payload;
        });
        builder.addCase(fetchOneItem.rejected, (state) => {
            state.editLoading = false;
        });
    }
});


export const fetchCategories = createAsyncThunk<ICategory[], void>('/allCategories',
    async () => {
    const response = await axiosAPI.get<ICategoryAPI>('categories.json');
    const data = response.data;

    if (!data) return [];

    return Object.keys(data).map(id => {
        return {
            ...data[id],
            id
        }
    });
});

export const fetchAddCategories = createAsyncThunk<void, ICategoryMutation>('/addCategory',
    async (category: ICategoryMutation) => {
    await axiosAPI.post('categories.json', category);
    toast.success('Категория успешно добавилась!');
});

export const fetchDeleteCategory = createAsyncThunk<void, string >('/deleteCategory',
    async (id) => {
    await axiosAPI.delete(`categories/${id}.json`);
    toast.success('Категория успешно удалена!');
});

export const fetchEditCategory = createAsyncThunk<void, IUpdateCategory>('/editCategory',
    async ({ id, category }) => {
    await axiosAPI.put(`categories/${id}.json`, category);
    toast.success('Категория успешно обновлена!');
});

export const fetchOneItem = createAsyncThunk<ICategory, string>('/addOneContact',
    async (id) => {
    const response = await axiosAPI.get<ICategoryMutation>(`categories/${id}.json`);
    return {
        ...response.data,
        id
    };
});


export const categoriesReducer = categorySlice.reducer;