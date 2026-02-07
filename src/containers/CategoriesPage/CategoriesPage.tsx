import {Box, Button, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import ModalWindow from '../../components/UI/ModalWindow/ModalWindow.tsx';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {
    selectAddLoading,
    selectDeleteLoading,
    selectEditLoading,
    selectItems,
    selectLoading,
    selectOneItem
} from './categoriesSelectors.ts';
import {
    fetchAddCategories,
    fetchCategories,
    fetchDeleteCategory,
    fetchEditCategory,
    fetchOneItem
} from './categoriesSlice.ts';
import type {ICategoryMutation} from '../../types';
import CategoryCard from '../../components/CategoryCard/CategoryCard.tsx';
import CategoryForm from '../../components/CategoryForm/CategoryForm.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';


const CategoriesPage = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectItems);
    const oneItem = useAppSelector(selectOneItem);

    const deleteLoading = useAppSelector(selectDeleteLoading);
    const loading = useAppSelector(selectLoading);
    const editLoading = useAppSelector(selectEditLoading);
    const addLoading = useAppSelector(selectAddLoading);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEdit,setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

     const openModalAdd = () => {
         setIsEdit(false);
         setIsModalOpen(true);
    };

     const openModalEdit = async (id: string) => {
         setIsEdit(true);
         await dispatch(fetchOneItem(id))
         setIsModalOpen(true);
     };

     const handleSubmit = async (data: ICategoryMutation) => {
         if (isEdit && oneItem) {
             await dispatch(fetchEditCategory({id: oneItem.id, category: data}));
         } else {
             await dispatch(fetchAddCategories(data));
         }
         setIsModalOpen(false);
         dispatch(fetchCategories());
     };

     const onDelete =  async (id: string) => {
       if (window.confirm('Удалить категорию?')) {
           await dispatch(fetchDeleteCategory(id));
           dispatch(fetchCategories());
       }
     };

    return (
        <>
            <ModalWindow
                show={isModalOpen}
                title={isEdit? 'Edit Category' : 'Add Category'}
                onClose={() => setIsModalOpen(false)}
            >
                <CategoryForm
                    onSubmit={handleSubmit}
                    isLoading={addLoading || editLoading}
                    isEdit={isEdit}
                    initialValue={isEdit ? oneItem || undefined : undefined}
                />
            </ModalWindow>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" component="h5" sx={{ fontWeight: 'bold' }}>
                    Categories
                </Typography>

                <Button type='button' variant='outlined' onClick={openModalAdd}>
                    Add
                </Button>
            </Box>

            {loading && <Spinner />}
            {!loading && items.length === 0 && <Typography variant='h6' component='p'>Please Add some category</Typography>}
            {!loading && items.length > 0 &&
                <CategoryCard
                    items={items}
                    deleteLoading={deleteLoading}
                    onDeleteBtn={onDelete}
                    onEdit={openModalEdit}
                    editLoading={editLoading}
                />
            }
        </>
    );
};

export default CategoriesPage;