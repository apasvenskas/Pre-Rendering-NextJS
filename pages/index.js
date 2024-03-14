import fs from 'fs/promises'; // can only use it inside the props otherwise an error. 
import Link from 'next/link';
import path from 'path';

function HomePage(props){
  const { products } = props; 
  return(
    <ul>
      {/* <li>Product 1</li>
      <li>Product 2</li>
      <li>Product 3</li>
      <li>Product 4</li> */}
      {/* create a map for the product instead of hard code */}
      {products.map((product) => (
        <li key={products.id}>
          <Link href={`/${product.id}`}>
          {product.title}
        </Link>
        </li>
      ))}
    </ul>
  )
}

// for fethcing data 

export async function getStaticProps(context) { // data is passed to the rest of the project through props
  console.log('(Re-)Generate...')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath); // Use fs.readFileSync instead
  const data = JSON.parse(jsonData);

  if(!data){
    return {
      redirect: {
        destination: '/no-data',
      }
    }
  }

  if(data.products.length === 0){
    return { notFound: true }; 
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 10,
  };
}

export default HomePage;