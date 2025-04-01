import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    if (data && data.products) setProducts(data.products);
  };

  const selectPageHandler = (ind) => {
    setPage(ind);
  };

  const selectPrevHandler = (ind) => {
    if (ind > 0) setPage(ind);
  };

  const selectNextHandler = (ind) => {
    if (ind <= products.length / 10) setPage(ind);
  };

  console.log(products);
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((p) => {
            return (
              <span className="product__single" key={p.id}>
                <img src={p.thumbnail} alt={p.title} />
                <span>{p.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => selectPrevHandler(page - 1)}
          >
            ◀️
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page == i + 1 ? "highlight" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < products.length / 10 ? "" : "pagination__disable"}
            onClick={() => selectNextHandler(page + 1)}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}
