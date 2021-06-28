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
        image{
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
    <Image
    src={car.image.url}
    width={car.image.width}
    height={car.image.height}
    />
    <div className="wrapper">
      <h1>{car.name}</h1>
      <p>{car.description}</p>

    </div>

    <Footer/>
  </div>
);
