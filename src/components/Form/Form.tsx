import {Box, Button, Grid, MenuItem, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import {CATEGORIES_TYPE, DEFAULT_VALUES} from '../../Constants.ts';
import SaveIcon from '@mui/icons-material/Save';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import * as React from 'react';
import {useEffect} from 'react';
import type {ICategoryMutation} from '../../types';

interface Props {
    isEdit?: boolean;
    initialValue?: ICategoryMutation;
    onSubmit: (data: ICategoryMutation) => void;
    isLoading: boolean;
}


const Form: React.FC<Props> = ({isEdit, initialValue, onSubmit, isLoading}) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ICategoryMutation>({
        defaultValues: DEFAULT_VALUES,
    });


    useEffect(() => {
        if (isEdit && initialValue) {
            reset(initialValue);
        } else {
            reset(DEFAULT_VALUES);
        }
    }, [reset, initialValue, isEdit]);


    return (
        <Box sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid size={12}>
                        <TextField
                            {...register('name', { required: 'Название обязательно' })}
                            label="Name"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            {...register('type', { required: 'Выберите тип' })}
                            select
                            label="Type"
                            fullWidth
                            defaultValue=""
                        >
                            {CATEGORIES_TYPE.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid size={12}>
                        <Button
                            type='submit'
                            disabled={isLoading}
                            startIcon={isEdit ? <EditDocumentIcon /> : <SaveIcon />}
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            {isEdit ? 'Update' : 'Save'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Form;