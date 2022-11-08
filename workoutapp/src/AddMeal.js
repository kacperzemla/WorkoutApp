import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AddMeal() {
  const id = useParams().id;
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`http://localhost:1337/api/product/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      setProduct(data.product)
    };

    fetchDetails();
  }, []);

  return <div>add meal {product.productName}</div>;
}
