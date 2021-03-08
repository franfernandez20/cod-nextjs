import Head from "next/head";
import Layout, { siteTitle } from "../components_old/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components_old/date";

import Hero from "../components/sections/Hero";
import CardList from "../components/elements/CardList";
import Testimonial from "../components/sections/Testimonial";
import Cta from "../components/sections/Cta";
import GenericSection from "../components/sections/GenericSection";

import { fetchAllTournaments } from "../firebase/client";
import TourTabs from "../components/elements/TourTabs";
import { useEffect, useState } from "react";

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export async function getServerSideProps(context) {
  const tournaments = await fetchAllTournaments()
  
  return {
    props: {
      tournaments
    }, // will be passed to the page component as props
  };
}

export default function Home({ tournaments }) {
  const [filterTours, setFilterTours] = useState([])
  const [format, setFormat] = useState('express')

  useEffect(() => {
    setFilterTours(tournaments.filter(tour => tour.format === format))
  },[tournaments, format])
  
  const handleSelectedTab = (id) => {
    setFormat(id)
  }

  return (
    <>
      <Hero className="illustration-section-01" />
      <GenericSection>
        <TourTabs format={format} onSelectedTab={handleSelectedTab}/>
      </GenericSection>
      <CardList list={filterTours} />
      {/* <Testimonial topDivider /> */}
    </>
  );
}
