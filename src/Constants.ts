import type {ICategoryMutation, ITransactionMutation} from './types';

export const MODAL_STYLES = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export const CATEGORIES_TYPE: string[] = ['income', 'expense'];

export const DEFAULT_VALUES: ICategoryMutation = {
    name: '',
    type: 'expense',
};

export const DEFAULT_TRANSACTION_VALUES: ITransactionMutation = {
  type: '',
  category: '',
  amount: 0
};