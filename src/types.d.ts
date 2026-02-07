export interface ICategoryMutation {
  name: string;
  type: 'income' | 'expense';
}

export interface ICategory extends ICategoryMutation {
  id: string;
}

export interface ICategoryAPI {
  [key: string]: ICategoryMutation;
}

export interface IUpdateCategory {
  id: string;
  category: ICategoryMutation;
}

export interface ITransactionMutation {
  type: string;
  category: string;
  amount: number;
}

export interface ITransaction extends ITransactionMutation {
  id: string;
  createdAt: string;
}

export interface ITransactionAPI {
  [id: string]: ITransactionMutation;
}

export interface IUpdateTransaction {
  id: string;
  data: ITransactionMutation
}
