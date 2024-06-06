"use client"

import ClientsTable from "./clientsTable"
import OrdersTable from "./ordersTable"
import OneOrder from "./oneOrder"
import Dashboard from "./dashboard"
import SideBar from "./sideBar"

export default function Dashbord(){
    return (
        <div>
            <ClientsTable/>
            <OrdersTable/>
            <OneOrder/>
            <Dashboard/>
            <SideBar/>
        </div>
    )
}