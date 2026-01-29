import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='min-h-screen w-64 bg-black text-white p-4 flex flex-col gap-2 rounded-r-2xl fixed'>
            <NavLink to={'/products'} className={({ isActive }) => `${isActive ? 'text-black bg-white py-1 pl-1 rounded font-semibold' : 'text-white font-semibold'}`}>
                All Products
            </NavLink>

            <NavLink to={'/new-invoice'} className={({ isActive }) => `${isActive ? 'text-black bg-white py-1 pl-1 rounded font-semibold ' : 'text-white font-semibold'}`}>New Invoice</NavLink>
            <NavLink to={'/add-product'} className={({ isActive }) => `${isActive ? 'text-black bg-white py-1 pl-1 rounded font-semibold' : 'text-white font-semibold'}`}>Add Product</NavLink>
            <NavLink to={'/history'} className={({ isActive }) => `${isActive ? 'text-black bg-white py-1 pl-1 rounded font-semibold' : 'text-white font-semibold'}`}>History</NavLink>
        </div>
    )
}

export default Sidebar