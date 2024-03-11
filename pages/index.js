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
        <li key={product.id}>{product.title}</li>
      })}
    </ul>
  )
}

// for fethcing data 

export async function getStaticProps(){ // data is passed to the rest of the project through props
  return {
    props: {
      products: [{ id: 'p1', title: 'Product 1' }],
  },
}; 
}

export default HomePage;