import {Box, Button, Paper, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import * as React from 'react';
import type {ICategory, ITransaction} from '../../../types';

interface Props {
  transaction: ITransaction;
  categories: ICategory[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  editLoading: boolean;
  deleteLoading: boolean;
}

const TransactionCardItem: React.FC<Props> = ({ transaction, categories, onEdit, onDelete, deleteLoading, editLoading }) => {
  const category = categories.find(c => c.id === transaction.category);

  const isIncome = transaction.type === 'income';

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Typography variant="body2" component='p' color="text.secondary">
          {dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm')}
        </Typography>

        <Typography variant="h6" component='h6' sx={{ minWidth: 150 }}>
          {category ? category.name : 'Unknown Category'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography
          variant="h6"
          component='p'
          sx={{ fontWeight: 'bold', color: isIncome ? 'success.main' : 'error.main' }}
        >
          {isIncome ? '+' : '-'}{transaction.amount} KGS
        </Typography>

        <Button
            onClick={() => onEdit(transaction.id)}
            color="primary"
            variant='outlined'
            loading={editLoading}
        >
          <EditIcon />
        </Button>

        <Button
          onClick={() => onDelete(transaction.id)}
          color="error"
          variant='outlined'
          loading={deleteLoading}
        >
          <DeleteIcon />
        </Button>
      </Box>
    </Paper>
  );
};

export default TransactionCardItem;