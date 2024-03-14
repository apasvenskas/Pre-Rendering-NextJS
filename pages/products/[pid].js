import { Fragment } from "react";
import path from "path";
import fs from "fs/promises";

// dynamic data is not pregenerated

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    // needed for a fallback
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
  
    return data;
  }  

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  // filter data for the desired id
  const product = data.products.find((product) => product.id === productId);
  if(!product){
    return { notFound: true }
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}


// for getting rid of the error Error: getStaticPaths is required for dynamic SSG pages and is missing for '/[pid]'.
// tells the NEx.t to pregenerate the following values.
export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map(product => product.id);
  const pathsWithParams = ids.map(id => ({ params: { pid: id } }));
  return {
    paths: pathsWithParams,
      //   { params: { pid: "p1" } },
      // { params: { pid: 'p2' } },
      // { params: { pid: 'p3' } },
      fallback: true, 
    // fallback: true, 
    // with fallback set to true dont need to wright paths for each product p1, p2, p3 ext..
    // will need to return a fallback state before the return
  };
}

export default ProductDetailPage;
