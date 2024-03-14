import { useEffect, useState } from "react";

function LastSalesPage() {
  // geting/ fetching data without prerender
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

export default LastSalesPage;
