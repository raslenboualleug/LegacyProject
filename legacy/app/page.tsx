"use client";
import Ourproducts from "./home/Ourproducts";
import Categories from "./home/Categories";
import Thismonth from "./home/Thismonth";
import Services from "./home/Services";
import Featured from "./home/Featured";
import Todays from "./home/Todays";
import Navbar from "./Navbar";
import Navbanner from "./home/Navbanner";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Navbanner />
      <Ourproducts />
      <Categories />
      <Thismonth />
      <Featured />
      <Todays />
      <Services />
    </div>
  );
}
