
"use client";
import Ourproducts from "./AddProduct";
import Categories from "./Home/Categories";
import Thismonth from "./Home/Thismonth";
import Services from "./Services";
import Featured from "./Home/Featured";
import Todays from "./Home/Todays";
import Navbar from "./Navbar";
import Navbanner from "./Home/Navbanner";
import ScrollToTop from "./ScorllToTop";


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
