
"use client";
import Ourproducts from "./Home/Ourproducts";
import Categories from "./Home/Categories";
import Thismonth from "./Home/Thismonth";
import Services from "./Home/Services";
import Featured from "./Home/Featured";
import Todays from "./Home/Todays";
import Navbar from "./Navbar";
import Navbanner from "./Home/Navbanner";

export default function Home() {
  return (
    <div>
      <Navbar />
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
