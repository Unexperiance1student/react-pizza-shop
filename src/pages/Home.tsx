import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { v4 } from 'uuid';

import {
  Categories,
  SortPopup,
  PizzaBlock,
  Skeleton,
  Pagination,
} from '../components';

import {
  selectFilter,
  selectFilterSortProperty,
} from '../redux/filter/selector';
import { setCategotyId, setPageCount } from '../redux/filter/slice';
import { selectPizza } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
  const [resLength, setresLength] = useState(0);
  const { categoryId, currentPage, searchValue, sort } =
    useSelector(selectFilter);
  const sortType = useSelector(selectFilterSortProperty);
  const { items, status } = useSelector(selectPizza);

  const dispatch = useAppDispatch();

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategotyId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setPageCount(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    getPizzas();
    fetch(
      `https://631f574722cefb1edc498d47.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((json) => {
        setresLength(json.length);
      });
  }, [categoryId, sortType, searchValue, currentPage]);
  const pizzas = items.map((item: any) => (
    <PizzaBlock
      key={item.id}
      {...item}></PizzaBlock>
  ));

  const skeletons = [...new Array(6)].map(() => (
    <Skeleton key={v4()}></Skeleton>
  ));

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onCLickCategory={onChangeCategory}
        />
        <SortPopup value={sort} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='cart cart--empty'>
          <h2>
            Ошибка <span>😕</span>
          </h2>
          <p>
            К сожалению, не удалось найти ПИТСЫ, попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      {resLength > 4 ? (
        <Pagination
          resLength={resLength}
          currentPage={currentPage}
          onChangePage={onChangePage}></Pagination>
      ) : null}
    </div>
  );
};

export default Home;
