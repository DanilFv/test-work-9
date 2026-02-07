import type {ICategory, ITransactionMutation} from '../../types';
import * as React from 'react';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {CATEGORIES_TYPE, DEFAULT_TRANSACTION_VALUES} from '../../Constants.ts';
import {Box, Button, Grid, MenuItem, TextField} from '@mui/material';

interface Props {
    categories: ICategory[];
    initialValues?: ITransactionMutation;
    isEdit?: boolean;
    isLoading?: boolean;
    onSubmit: (data: ITransactionMutation) => void;
}

const TransactionsForm: React.FC<Props> = ({categories, initialValues, isEdit, isLoading, onSubmit}) => {
    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm<ITransactionMutation>({
        defaultValues: DEFAULT_TRANSACTION_VALUES
    });

     useEffect(() => {
         if (isEdit && initialValues) {
            reset(initialValues);
         } else {
            reset(DEFAULT_TRANSACTION_VALUES);
         }
    }, [reset, initialValues, isEdit]);

     const currentType = watch('type');

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>

                    <Grid size={12}>
                        <TextField
                            {...register('type', {required: 'Выберите тип!'})}
                            select
                            label="Type"
                            fullWidth
                            disabled={isLoading}
                            error={!!errors.type}
                            helperText={errors.type?.message}
                        >
                            {CATEGORIES_TYPE.map(category => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid size={12}>
                        <TextField
                        {...register('category', {required: 'Выберите категорию!'})}
                        select
                        label="Category"
                        fullWidth
                        disabled={isLoading}
                        error={!!errors.category}
                        helperText={errors.category?.message}
                        >
                        {categories.filter(cat => cat.type === currentType).map(cat => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid size={12}>
                        <TextField
                            {...register('amount', {
                                required: 'Введите сумму',
                                min: {
                                    value: 1,
                                    message: 'Сумма должна быть больше 0'
                                },
                                valueAsNumber: true,
                            })}
                            type="number"
                            label="Amount"
                            fullWidth
                            disabled={isLoading}
                            error={!!errors.amount}
                            helperText={errors.amount?.message}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isLoading}
                        >
                        Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default TransactionsForm;