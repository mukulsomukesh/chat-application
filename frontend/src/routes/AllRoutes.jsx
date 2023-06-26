import React from 'react'
import { Route, Routes } from "react-router-dom";
import Signup from './Signup'
import Signin from './Signin'
import Home from './Home';
import PrivateRoute from '../components/PrivateRoute';

export default function AllRoutes() {
  return (
<>

<Routes>
<Route path='/' element={ <PrivateRoute> <Home /> </PrivateRoute> } />
<Route path='/signup' element={<Signup />} />
<Route path='/signin' element={<Signin />} />
</Routes>

</>
  )
}
