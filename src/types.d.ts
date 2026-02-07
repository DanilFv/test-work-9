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

