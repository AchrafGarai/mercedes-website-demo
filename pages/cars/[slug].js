import { GraphQLClient } from 'graphql-request';
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/ckq9gk2z9w8gk01z1gkgr97d9/master'
);

export async function getStaticProps({ params }) {
  const { car } = await graphcms.request(
    `
    query cars($slug: String!) {
      car(where: { slug: $slug }) {
        name
       description
       price
       acceleration
       power
       slug
       image {
         url
         width
         height
       }
       secondaryPicture {
         url
         width
         height
       }
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      car
    },
  };
}

export async function getStaticPaths() {
  const { cars } = await graphcms.request(`
    {
      cars {
        slug
        name
      }
    }
  `);

  return {
    paths: cars.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}


export default({car}) =>(
  <div>
    <Navbar></Navbar>
    <div className="car-card" >
      <Image
      layout="fill"
      objectFit="cover"
      src={car.image.url}
      //width={car.image.width}
      //height={car.image.height}
      />
    </div>

    <div className="wrapper">
      <div className="flex-h">
          <div>
              <h1>{car.name}</h1>
              <p className="muted">{car.description}</p>
              <div className="mg-x-64">
                <p className="muted">Price</p>
                <h2>${car.price}</h2>

                <p className="muted">Acceleration, 0-60 mph</p>
                <h2>{car.acceleration} SEC</h2>

                <p className="muted">Power</p>
                <h2>{car.power} HP</h2>
              </div>

            </div>
          <div>
          <Image
            src={car.secondaryPicture.url}
            width={car.secondaryPicture.width}
            height={car.secondaryPicture.height}
            >
            </Image>
          </div>
      </div>

    </div>

    <Footer/>
  </div>
);
