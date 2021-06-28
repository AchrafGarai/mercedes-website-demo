import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { GraphQLClient, gql } from 'graphql-request';
import React from "react";

export default function Home({cars}) {

  React.useEffect(() => {
    import("lottie-interactive/dist/lottie-interactive.js");
  });
  return (
    <div>
      <Head>
        <title>Mercedes-Benz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <div className="hero-img">
        <div className="wrapper">
          <h1 className="gigantic">Mercedes <br/> Benz</h1>
          <div className="gr_38">
              <p>Demo by <br/> Achraf Garai</p>
          </div>
        </div>
      </div>

        <div>
            <h1 className="centered muted">Welcome to the future</h1>
                {cars.map((car) => (
                  <Link href={`/cars/${car.slug}`} className="cta2">
                  <a>
                      <div key={car.id} className="car-card">
                          <Image
                          src={car.image.url}
    //                      width={car.image.width}
    //                      height={car.image.height}
                          layout="fill" objectFit="cover"
                          />
                          <h2>{car.name}</h2>
                          <p className="muted">Read more</p>

                      </div>
                    </a>
                  </Link>

                ))}
              </div>
            </div>
          )
        }


export async function getStaticProps() {
  const graphcms = new GraphQLClient(
    'https://api-eu-central-1.graphcms.com/v2/ckq9gk2z9w8gk01z1gkgr97d9/master'
  );

  const { cars } = await graphcms.request(
    gql`
    {
      cars {
        id
        name
        description
        slug
        image {
          url
          fileName
          width
          height
        }
      }
    }
    `
  );

  return {
    props: {
      cars,
    },
  };
}