import React from 'react'
import { Route, Routes } from "react-router-dom";
import Signup from './Signup'
import Signin from './Signin'
import Home from './Home';

export default function AllRoutes() {
  return (
<>

<Routes>
<Route path='/' element={<Home />} />
<Route path='/signup' element={<Signup />} />
<Route path='/signin' element={<Signin />} />
</Routes>

</>
  )
}
