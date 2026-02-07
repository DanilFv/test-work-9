import type {ICategory, ITransaction} from '../../types';
import {Box} from '@mui/material';
import TransactionCardItem
    from './TransactionsCardItem/TransactionsCardItem.tsx';

interface Props {
    transactions: ITransaction[];
    categories: ICategory[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    deleteLoading: boolean;
    editLoading: boolean;
}

const TransactionsCard: React.FC<Props> = ({transactions, categories, onEdit, onDelete, deleteLoading, editLoading}) => {
    return (
        <Box sx={{ mt: 2 }}>
            {transactions.map((transaction) => (
                <TransactionCardItem
                    key={transaction.id}
                    transaction={transaction}
                    categories={categories}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    deleteLoading={deleteLoading} 
                    editLoading={editLoading}
                />
            ))}
        </Box>
    );
};

export default TransactionsCard;