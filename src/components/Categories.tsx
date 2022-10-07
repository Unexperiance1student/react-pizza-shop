import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageCount } from '../redux/filter/slice';

type CategoriesProps = {
  value: number;
  onCLickCategory: (i: number) => void;
};

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

export const Categories: React.FC<CategoriesProps> = memo(
  ({ value, onCLickCategory }) => {
    const dispatch = useDispatch();
    return (
      <div className='categories'>
        <ul>
          {categories.map((name, index) => (
            <li
              key={index}
              onClick={() => {
                onCLickCategory(index);
                dispatch(setPageCount(1));
              }}
              className={value === index ? ' active' : ''}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
