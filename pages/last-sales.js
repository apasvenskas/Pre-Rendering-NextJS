import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage() {
  // geting/ fetching data without prerender
    const [sales, setSales] = useState();
    const [isLoading, setIsLoading] = useState(false);

  // using SWR fetch method / hook, without prerender
//   const { data, error } = useSWR(
//     'https://nextjs-fetchingprerendering-default-rtdb.firebaseio.com/sales.json'
//   );
//   //UseEffect only for transfroming the data in this case
//   useEffect(() => {
//     if (data) { 
//       const transformedSales = [];

//       for (const key in data) {
//         transformedSales.push({
//           id: key,
//           username: data[key].username,
//           volume: data[key].volume,
//         });
//       }
//       setSales(transformedSales)
//     }
//   }, [data]);

  // regular use effect method for fetching data, my own cutom hook for fetching data
    useEffect(() => {
      fetch(
        "https://nextjs-fetchingprerendering-default-rtdb.firebaseio.com/sales.json")
        .then((response) => response.json())
        .then((data) => {
          // transform data to an array
          const transformedSales = [];
          for (const key in data) {
            transformedSales.push({
              id: key,
              username: data[key].username,
              volume: data[key].volume,
            });
          }
          setSales(transformedSales);
          setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
      }
    
      if(!sales){
        return <p>No data yet</p>
      }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

// for prerendering only a portion of the data
export async function getStaticProps() {
    return fetch(
        "https://nextjs-fetchingprerendering-default-rtdb.firebaseio.com/sales.json")
        .then((response) => response.json())
        .then((data) => {
          // transform data to an array
          const transformedSales = [];
          for (const key in data) {
            transformedSales.push({
              id: key,
              username: data[key].username,
              volume: data[key].volume,
            });
          }
          return {props: {sales: transformedSales }, revalidate: 10 };
        });
}

export default LastSalesPage;
