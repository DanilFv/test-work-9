import {Box, Button, Typography} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type {ICategory} from '../../types';
import * as React from 'react';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

interface Props {
    item: ICategory;
    deleteLoading: boolean;
    editLoading: boolean;
    onDeleteBtn: (id: string) => void;
    onEdit: (id: string) => void;
}


const CategoryCardItem: React.FC<Props> = ({item, deleteLoading, onDeleteBtn, onEdit, editLoading}) => {

    return (
        <Box
            sx={{ border: '1px solid #ccc', mb: 1, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center',  borderRadius: 1 }}
        >
            <Box>
                <Typography variant="h6" component='p' sx={{ fontWeight: 'medium' }}>{item.name}</Typography>
                <Typography variant="body2" color={item.type === 'income' ? 'green' : 'red'} sx={{ fontWeight: 'medium' }} >
                    {item.type}
                </Typography>
              </Box>
              <Box>
                <Button
                    variant="outlined"
                    type='button'
                    loading={editLoading}
                    loadingPosition='center'
                    endIcon={<EditDocumentIcon />}
                    onClick={() => onEdit(item.id)}
                    sx={{ mx: 1 }}
                >
                    Edit
                </Button>
                <Button
                    loading={deleteLoading}
                    type='button'
                    color="error"
                    onClick={() => onDeleteBtn(item.id)}
                >
                    <DeleteForeverIcon />
                </Button>
              </Box>
        </Box>
    );
};

export default CategoryCardItem;