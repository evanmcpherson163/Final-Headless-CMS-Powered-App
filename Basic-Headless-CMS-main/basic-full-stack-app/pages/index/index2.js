import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Layout from '../../components/layout';
import Link from "next/link";
import { getSortedList } from "@/library/data2";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// define a getStaticProps() function - this name is defined by next.js
export async function getStaticProps() {
  const allData = await getSortedList(); 
  return {
    props: { allData }
  };
}
// export our gome page component Home
export default function Home( {allData} ) {
  return(
    <Layout home>
      <div className="list-group">
        {allData.map(
            ({id, name}) => (
              <Link key={id} href={`${id}`} className="list-group-item list-group-item-action">
                {name}
              </Link>
            )
          )
        }
      </div>
    </Layout>
  );
}
