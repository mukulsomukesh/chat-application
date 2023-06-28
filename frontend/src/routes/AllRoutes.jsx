import React from 'react'
import { Route, Routes } from "react-router-dom";
import Signup from './Signup'
import Signin from './Signin'
import Home from './Home';
import PrivateRoute from '../components/PrivateRoute';
import PageNotFound from './PageNotFound';

export default function AllRoutes() {
  return (
<>

<Routes>
<Route path='/' element={ <PrivateRoute> <Home /> </PrivateRoute> } />
<Route path='/signup' element={<Signup />} />
<Route path='/signin' element={<Signin />} />
<Route path="*" element={ <PageNotFound /> }></Route>
</Routes>

</>
  )
}
