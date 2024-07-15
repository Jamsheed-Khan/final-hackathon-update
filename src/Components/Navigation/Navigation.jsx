import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import AllCourses from '../AllCourses/AllCpurses'
import AllTeachers from '../AllTeachers/AllTeachers'
import StudentReportGenerate from '../StudentReportGenerate/StudentReportGenerate'




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
    {
        path: "/StudentReportGenerate",
        element: <StudentReportGenerate />
    },
   
   

])


export default function Navigation() {
  return (
    <RouterProvider router={router} />
  )
}