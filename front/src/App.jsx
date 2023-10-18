import { useState } from 'react'
import { Routes, Route, } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { BACKEND_URL } from '../utils'
import { CartProvider } from "./Components/Cart/CartContext/CartContext";
import { useUser } from './Context/UserContext';
import AddBook  from './Components/Admin dashboard/Add Book (nuevo create)/AddBook'
import Home from './Views/Home/Home'
import Profile from './Views/Profile/Profile'
import Detail from './Components/Detail/Detail'
import Nav from './Components/Nav/Nav'
import LogIn from "./Views/LogIn/LogIn"
import Books from "./Views/Books/books"
import Success from './Components/Success/Success'
import Register from './Views/Register/Register'
import Users from './Components/Admin dashboard/Users/Users'
import CartList from './Components/Cart/CartList/CartList'
import UserDetail from './Components/Admin dashboard/Detail/UserDetail'
import Store from './Views/Store/Store';
import Footer from './Components/Footer/Footer';
import NotFound from './Views/NotFound/NotFound';
import NoPermissions from './Views/NotFound/NoPermissions';
import Address from './Components/Address Form/Address';
import UpdateBook from './Components/Admin dashboard/UpdateBook/UpdateBook';
import BookActivation from './Components/Admin dashboard/UpdateBook/BookActivation';
import NewProducts from './Components/Admin dashboard/Products/NewProducts';
import Orders from './Components/Admin dashboard/Orders/Orders';
import GenreCardList from './Components/GenreCardList/GenreCardList';
import ReviewForm from './Components/ReviewForm/ReviewForm'
import './App.css'

function App() {
  const { user, userData,isAuthenticated } = useUser();
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <CartProvider>
        <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product-page/:id' element={<Detail />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/user/:id' element={<UserProfile />} /> */}
          <Route path='/books' element={<Books />} />
          <Route path='/order-approved' element={<Success />} />
          <Route path={'/admin/create'} element = {userData.isSuperAdmin || userData.isAdmin ? <AddBook/> : <NoPermissions/>}/>
          <Route path={'/admin/users'} element={userData.isSuperAdmin || userData.isAdmin ? <Users /> : <NoPermissions/>} />
          <Route path={'/admin/users/:id'} element={userData.isSuperAdmin || userData.isAdmin ? <UserDetail /> : <NoPermissions/>} />
          <Route path={'/admin/update-book'} element={userData.isSuperAdmin || userData.isAdmin ? <UpdateBook /> : <NoPermissions/>} />
          <Route path={'/admin/activate-book'} element={userData.isSuperAdmin || userData.isAdmin ? <BookActivation /> : <NoPermissions/>} />
          <Route path='/admin/orders' element={userData.isSuperAdmin || userData.isAdmin ? <Orders /> : <NoPermissions/>} />
          <Route path='/admin/products' element={userData.isSuperAdmin || userData.isAdmin ? <NewProducts /> : <NoPermissions/>}/>
          <Route path='/cart' element={<CartList />} />
          <Route path='/store' element={<Store />} />
          <Route path='/address' element={<Address />} />
          {isAuthenticated() ? (
            <>
              <Route path='/review' element={<ReviewForm/>}/>
              <Route path='/user/profile' element={<Profile />} />
            </>
          ) : null}
          <Route path="/*" element={<NotFound />} />
          <Route path='/genre/:genre' element={<GenreCardList />}/>
          {/* RUTAS USER PROFILE */}

        </Routes>
        <Footer />
      </CartProvider>
    </div>
  )
}

export default App
