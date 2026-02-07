import {Box, Button, Typography} from '@mui/material';
import {useState} from 'react';
import ModalWindow from '../../components/UI/ModalWindow/ModalWindow.tsx';

const CategoriesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <ModalWindow show={isModalOpen} title='title' onClose={() => setIsModalOpen(false)}>
                Some text
            </ModalWindow>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" component="h5" sx={{ fontWeight: 'bold' }}>
                    Categories
                </Typography>

                <Button type='button' variant='outlined' onClick={openModal}>
                    Add
                </Button>
            </Box>
        </>
    );
};

export default CategoriesPage;