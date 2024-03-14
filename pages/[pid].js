import { Fragment } from "react";
import path from 'path';
import fs from 'fs/promises'

// dynamic data is not pregenerated

function ProductDetailPage(props) {

    const { loadedProduct } = props;

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath); 
  const data = JSON.parse(jsonData);

  // filter data for the desired id
  const product = data.products.find(product => product.id === productId); 

  return {
    props: {
        loadedProduct: product
    }
  }
}

// for getting rid of the error Error: getStaticPaths is required for dynamic SSG pages and is missing for '/[pid]'.
// tells the NEx.t to pregenerate the following values. 
export async function getStaticPaths(){
    return {
        paths: [
            { params: { pid: 'p1' } },
            { params: { pid: 'p2' } },
            { params: { pid: 'p3' } },
        ],
        fallback: false
    };
}

export default ProductDetailPage;
