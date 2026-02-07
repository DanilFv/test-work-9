import type {
    ITransaction,
    ITransactionAPI,
    ITransactionMutation,
    IUpdateTransaction
} from '../../types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';
import {toast} from 'react-toastify';

interface TransactionsSlice {
    transactions: ITransaction[];
    oneTransaction: ITransaction | null;
    isLoading: boolean;
    deleteLoading: boolean;
    addLoading: boolean;
    editLoading: boolean;
    fetchOneLoading: boolean;
}

const initialState: TransactionsSlice = {
    transactions: [],
    oneTransaction: null,
    isLoading: false,
    deleteLoading: false,
    addLoading: false,
    editLoading: false,
    fetchOneLoading: false,
}


const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchTransactions.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.transactions = action.payload;
        });
        builder.addCase(fetchTransactions.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(fetchAddTransaction.pending, (state) => {
            state.addLoading = true;
        });
        builder.addCase(fetchAddTransaction.fulfilled, (state) => {
            state.addLoading = false;
        });
        builder.addCase(fetchAddTransaction.rejected, (state) => {
            state.addLoading = false;
        });

         builder.addCase(fetchOneTransaction.pending, (state) => {
            state.fetchOneLoading = true;
        });
        builder.addCase(fetchOneTransaction.fulfilled, (state, action) => {
            state.fetchOneLoading = false;
            state.oneTransaction = action.payload
        });
        builder.addCase(fetchOneTransaction.rejected, (state) => {
            state.fetchOneLoading = false;
        });

        builder.addCase(fetchEditTransaction.pending, (state) => {
            state.editLoading = true;
        });
        builder.addCase(fetchEditTransaction.fulfilled, (state) => {
            state.editLoading = false;

        });
        builder.addCase(fetchEditTransaction.rejected, (state) => {
            state.editLoading = false;
        });

        builder.addCase(fetchDeleteTransaction.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(fetchDeleteTransaction.fulfilled, (state) => {
            state.deleteLoading = false;

        });
        builder.addCase(fetchDeleteTransaction.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});


export const fetchTransactions = createAsyncThunk<ITransaction[], void>('/allTransactions',
    async () => {
    const response = await axiosAPI.get<ITransactionAPI>('transactions.json');
    const data = response.data;

    if (!data) return [];

    return Object.keys(data).map(id => {
        return {
            ...data[id],
            id,
            createdAt: (data[id] as ITransaction).createdAt
        };
    });
});

export const fetchAddTransaction = createAsyncThunk<void, ITransactionMutation>('/addTransaction',
    async (transaction) => {
    await axiosAPI.post('transactions.json', {
        ...transaction,
        createdAt: new Date().toISOString(),
    });
    toast.success('Вы успешно добавили транзакцию!');
});

export const fetchOneTransaction = createAsyncThunk<ITransaction, string>('/fetchOneTransaction',
    async (id) => {
    const response = await axiosAPI.get<ITransactionMutation & { createdAt: string }>(`transactions/${id}.json`);
    return {
        ...response.data,
        id,
    };
});

export const fetchDeleteTransaction = createAsyncThunk<void, string>('/deleteTransaction',
    async (id) => {
    await axiosAPI.delete(`transactions/${id}.json`);
    toast.success('Вы успешно удалили транзакцию!');
});

export const fetchEditTransaction = createAsyncThunk<void, IUpdateTransaction>('/editTransaction',
    async ({id, data}) => {
    const response = await axiosAPI.get<ITransaction>(`transactions/${id}.json`);
    const date = response.data.createdAt;

    await axiosAPI.put(`transactions/${id}.json`, {
        ...data,
        createdAt: date
    });
    toast.success('Транзакция успешно обновлена!');
});













export const transactionsReducer = transactionsSlice.reducer;