import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {
    selectAddLoading,
    selectDeleteLoading,
    selectEditLoading,
    selectLoading,
    selectOneLoading,
    selectOneTransaction,
    selectTransactions
} from './transactionsSelectors.ts';
import * as React from 'react';
import {useEffect} from 'react';
import {
    fetchAddTransaction,
    fetchDeleteTransaction,
    fetchEditTransaction,
    fetchOneTransaction,
    fetchTransactions
} from './transactionsSlice.ts';
import type {ITransactionMutation} from '../../types';
import ModalWindow from '../../components/UI/ModalWindow/ModalWindow.tsx';
import TransactionsForm
    from '../../components/TransactionsForm/TransactionsForm.tsx';
import {selectItems} from '../CategoriesPage/categoriesSelectors.ts';
import TransactionsCard
    from '../../components/TransactionsCard/TransactionsCard.tsx';
import {fetchCategories} from '../CategoriesPage/categoriesSlice.ts';
import {Box, Typography} from '@mui/material';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}


const Home: React.FC<Props> = ({modalOpen, setModalOpen, isEdit, setIsEdit}) => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransactions);
    const oneTransaction = useAppSelector(selectOneTransaction);
    const categories = useAppSelector(selectItems);

    const addLoading = useAppSelector(selectAddLoading);
    const isLoading = useAppSelector(selectLoading);
    const editLoading = useAppSelector(selectEditLoading);
    const deleteLoading = useAppSelector(selectDeleteLoading);
    const fetchOneLoading = useAppSelector(selectOneLoading);


    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchCategories());
    },[dispatch]);


    const editModal = async (id: string) => {
        setIsEdit(true);
        await dispatch(fetchOneTransaction(id));
        setModalOpen(true);
    }

    const deleteTransaction = async (id: string) => {
        if (window.confirm('Удалить транзакцию?')) {
            await dispatch(fetchDeleteTransaction(id));
            dispatch(fetchTransactions());
        }
    }

    const handleSubmit = async (data: ITransactionMutation) => {
        if (isEdit && oneTransaction) {
            await dispatch(fetchEditTransaction({ id: oneTransaction.id, data }));
        } else {
            await dispatch(fetchAddTransaction(data));
        }

        setModalOpen(false);
        dispatch(fetchTransactions());
    };
    const totalBalance = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
            return acc + transaction.amount;
        } else {
            return acc - transaction.amount;
        }
    }, 0);

    let color = 'green';

    if (totalBalance < 0) {
       color = 'red';
    }

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && transactions.length === 0 && <Typography variant='h6' component='h6'>Нет транзакций</Typography>}
            {!isLoading && transactions.length > 0 &&
                <Box>

                   <Box
                sx={{
                    p: 3,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #eee'
                }}
            >
                <Typography variant="h6" component='p' sx={{ fontWeight: 'bold', color: `${color}` }}>
                    Total Balance: {totalBalance} KGS
                </Typography>
            </Box>

            <TransactionsCard
                transactions={transactions}
                categories={categories}
                onEdit={editModal}
                onDelete={deleteTransaction}
                deleteLoading={deleteLoading}
                editLoading={editLoading}
            />

                </Box>
            }

            <ModalWindow show={modalOpen} title={isEdit ? 'Edit Transaction' : 'Add Transaction'} onClose={() => setModalOpen(false)}>
                <TransactionsForm
                    categories={categories}
                    initialValues={isEdit && oneTransaction ? oneTransaction : undefined}
                    isEdit={isEdit}
                    isLoading={addLoading || editLoading || fetchOneLoading}
                    onSubmit={handleSubmit}
                />
            </ModalWindow>
        </>
    );
};

export default Home;