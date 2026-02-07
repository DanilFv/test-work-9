import {List} from '@mui/material';
import type {ICategory} from '../../types';
import CategoryCardItem from './CategoryCardItem.tsx';
import * as React from 'react';

interface Props {
    items: ICategory[];
    deleteLoading: boolean;
    onDeleteBtn: (id: string) => void;
    onEdit: (id: string) => void;
    editLoading: boolean;
}


const CategoryCard: React.FC<Props> = ({items, deleteLoading, onDeleteBtn, onEdit, editLoading}) => {
    return (
        <List>
          {items.map((item) => (
              <CategoryCardItem
                  key={item.id}
                  item={item}
                  deleteLoading={deleteLoading}
                  onDeleteBtn={onDeleteBtn}
                  onEdit={onEdit}
                  editLoading={editLoading}
              />
          ))}
        </List>
    );
};

export default CategoryCard;