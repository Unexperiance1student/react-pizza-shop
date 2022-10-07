import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct } from '../redux/cart/slice';
import { CartItem } from '../redux/cart/types';

const FullPizza: React.FC = () => {
  const typeName = ['тонкая', 'традиционная'];
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    id: number;
    imageUrl: string;
    title: string;
    price: number;
    sizes: number[];
    types: number[];
  }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickAdd = () => {
    const item: CartItem = {
      id: id,
      title: pizza?.title,
      price: pizza?.price,
      imageUrl: pizza?.imageUrl,
      type: typeName[activeType],
      size: pizza?.sizes[activeSyze],
      count: 0,
    } as CartItem;
    dispatch(addProduct(item));
  };
  const [activeType, setActiveType] = useState(0);
  const [activeSyze, setActiveSyze] = useState(0);
  useEffect(() => {
    async function fetchPiza() {
      try {
        const res = await axios.get(
          'https://631f574722cefb1edc498d47.mockapi.io/items/' + id
        );
        setPizza(res.data);
      } catch (error) {
        alert('Ошибка при получении ПИТСЫ');
        navigate('/');
      }
    }
    fetchPiza();
  }, []);

  if (!pizza) {
    return <h1>Загрузка...</h1>;
  }
  return (
    <>
      <div className='container center content'>
        <img
          className='pizza-block__image'
          src={pizza.imageUrl}
          alt='pizzaImage'
        />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} ₽</h4>
      </div>
      <div className='pizza-block-wrapper'>
        <div className='pizza-block'>
          <div className='pizza-block__selector'>
            <ul>
              {pizza.types.map((typeId) => (
                <li
                  key={typeId}
                  onClick={() => {
                    setActiveType(typeId);
                  }}
                  className={activeType === typeId ? 'active' : ''}>
                  {typeName[typeId]}
                </li>
              ))}
            </ul>
            <ul>
              {pizza.sizes.map((size, index) => (
                <li
                  key={index + 1}
                  onClick={() => {
                    setActiveSyze(index);
                  }}
                  className={activeSyze === index ? 'active' : ''}>
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
          <div className='pizza-block__bottom'>
            <div className='pizza-block__price'>от {pizza.price} ₽</div>
            <button
              className='button button--outline button--add'
              onClick={onClickAdd}>
              <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                  fill='white'
                />
              </svg>
              <span>Добавить</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullPizza;
