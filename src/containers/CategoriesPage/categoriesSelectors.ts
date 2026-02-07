import type {RootState} from '../../app/store.ts';

export const selectItems = (state: RootState) => state.categories.items;
export const selectOneItem = (state: RootState) => state.categories.oneItem;

export const selectLoading = (state: RootState) => state.categories.fetchLoading;
export const selectAddLoading = (state: RootState) => state.categories.addLoading;
export const selectDeleteLoading = (state: RootState) => state.categories.deleteLoading;
export const selectEditLoading = (state: RootState) => state.categories.editLoading;