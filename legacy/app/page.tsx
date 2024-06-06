 "use client"

import Image from "next/image";
import styles from "./page.module.css";

import Ourproducts from "./home/Ourproducts/page";
import Categories from "./home/Categories/page";
import Thismonth from "./home/Thismonth/page";
import Services from "./home/Services/page";
import Featured from "./home/Featured.tsx/page";
import Todays from "./home/Todays/page";
// import Oneproduct from "./Oneproduct/page";

export default function Home() {
  return (
    <main className={styles.main}>
   <Ourproducts/>
  <Categories/>
  <Thismonth/>
  <Featured/>
  <Todays/>
  <Services/>
  {/* <Oneproduct/> */}
    </main>
  );
}
