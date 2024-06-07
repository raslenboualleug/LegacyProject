
"use client";
import React, {useState} from "react";
import Ourproducts from "./Home/Ourproducts";
import Categories from "./Home/Categories";
import Thismonth from "./Home/Thismonth";
import Services from "./Services";
import Featured from "./Home/Featured";
import Todays from "./Home/Todays";
import Navbar from "./Navbar";
import Navbanner from "./Home/Navbanner";
import ScrollToTop from "./ScorllToTop";

export default function Home() {

  const [notif , setNotif] = useState<number>(0)


  
  return (
    <div>
      <Navbar   />
      <Navbanner /> 
      <Todays />
      <Categories />
      <Thismonth />
      <Ourproducts />
      <Featured />
      <Services />
      <ScrollToTop />
    </div>
  );
}
