import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { GraphQLClient, gql } from 'graphql-request';
import react from "react";

export default function Home({cars}) {

    react.useEffect(() => {
      import("lottie-interactive/dist/lottie-interactive.js");
    });
  return (
    <div>
     {/* We the head componenent take our meta data like page title, favicon .... */}
      <Head>
        <title>Mercedes-Benz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Main page content */}
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
      <div className="footer">
        <lottie-interactive path="/Part2.lottie.json" interaction="play-on-show" width="1100px"/>
        <p className="centered muted">Mercedes-Benz</p>
        <h1 className="centered">Discover Mercedes.</h1>
      </div>
      <div className="footer">
        <lottie-interactive path="/Part3.lottie.json" interaction="play-on-show"/>
        <p className="centered muted">The future is here</p>
        <h1 className="centered">Crafted to inspire. </h1>
      </div>

              {/* Looping through static props generating from GetStaticProps method */}
              {cars.map((car) => (
                <Link key={car.id} href={`/cars/${car.slug}`} className="cta2">
                <a>
                    <div  className="car-card">
                        <Image
                        src={car.image.url}
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
