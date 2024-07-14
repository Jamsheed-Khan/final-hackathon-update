import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import AllCourses from '../AllCourses/AllCpurses'
import AllTeachers from '../AllTeachers/AllTeachers'




const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminDashboard />
    },
    {
        path: "/AllCourses",
        element: <AllCourses />
    },
    {
        path: "/AllTeachers",
        element: <AllTeachers />
    },
   
   

])


export default function Navigation() {
  return (
    <RouterProvider router={router} />
  )
}