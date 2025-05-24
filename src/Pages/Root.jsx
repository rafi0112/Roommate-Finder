import React from 'react'
import Navabr from '../Components/Navabr'
import { Outlet } from 'react-router'
import Footer from '../Components/Footer'

const Root = () => {
    return (
        <div>
            <Navabr></Navabr>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}

export default Root