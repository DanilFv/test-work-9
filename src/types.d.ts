export interface ICategoryMutation {
  name: string;
  type: 'income' | 'expense';
}

export interface ICategory extends CategoryMutation {
  id: string;
}