import fs from 'fs'; // can only use it inside the props otherwise an error. 
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
      {products.map((products) => {
        <li key={products.id}>{products.title}</li>
      })}
    </ul>
  )
}

// for fethcing data 

export async function getStaticProps() { // data is passed to the rest of the project through props
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFileSync(filePath, 'utf8'); // Use fs.readFileSync instead
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
  };
}

export default HomePage;