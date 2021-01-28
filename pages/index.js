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

import { fetchAllTournaments } from "../firebase/client";

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
  console.log('tournaments', tournaments)
  
  return {
    props: {
      tournaments
    }, // will be passed to the page component as props
  };
}

export default function Home({ allPostsData, tournaments }) {
  return (
    <>
      <Hero className="illustration-section-01" />
      <CardList list={tournaments} />
      {/* <Testimonial topDivider /> */}
      {/* <Cta split /> */}
    </>
    // <Layout home>
    //   <Head>
    //     <title>{siteTitle}</title>
    //   </Head>
    //   <section className={utilStyles.headingMd}>
    //     <p>[Your Self Introduction]</p>
    //     <p>
    //       (This is a sample website - you’ll be building a site like this on{' '}
    //       <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
    //     </p>
    //   </section>
    //   <section className={utilStyles.headingMd}>…</section>
    //   <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
    //     <h2 className={utilStyles.headingLg}>Blog</h2>
    //     <ul className={utilStyles.list}>
    //       {allPostsData.map(({ id, date, title }) => (
    //         <li className={utilStyles.listItem} key={id}>
    //           <Link href={`/posts/${id}`}>
    //             <a>{title}</a>
    //           </Link>
    //           <br />
    //           <small className={utilStyles.lightText}>
    //             <Date dateString={date} />
    //           </small>
    //         </li>
    //       ))}
    //     </ul>
    //   </section>
    // </Layout>
  );
}
