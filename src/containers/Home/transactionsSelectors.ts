import type {RootState} from '../../app/store.ts';

export const selectTransactions = (state: RootState) => state.transactions.transactions;
export const selectOneTransaction = (state: RootState) => state.transactions.oneTransaction;

export const selectLoading = (state: RootState) => state.transactions.isLoading;
export const selectDeleteLoading = (state: RootState) => state.transactions.deleteLoading;
export const selectAddLoading = (state: RootState) => state.transactions.addLoading;
export const selectEditLoading = (state: RootState) => state.transactions.editLoading;
export const selectOneLoading = (state: RootState) => state.transactions.fetchOneLoading;