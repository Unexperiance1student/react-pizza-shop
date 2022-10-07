import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';
import './scss/app.scss';

const Cart = lazy(() => import(/*webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = lazy(
  () => import(/*webpackChunkName: "FullPizza" */ './pages/FullPizza')
);
const Home = lazy(() => import(/*webpackChunkName: "Home" */ './pages/Home'));

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<MainLayout />}>
        <Route
          path='/'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Home />
            </Suspense>
          }></Route>
        <Route
          path='/cart'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          }></Route>
        <Route
          path='/pizza/:id'
          element={<FullPizza />}></Route>
        <Route
          path='*'
          element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
