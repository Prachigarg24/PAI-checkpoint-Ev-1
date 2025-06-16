import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropDown.jsx";
import Pagination from "./components/Pagination";
import "./styles/App.css";

const PRODUCTS_PER_PAGE = 6;

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const debounceRef = useRef(null);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => setProducts(res.data));
  }, []);

  const filtered = products.filter(product => {
    return (
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || product.category === category)
    );
  });

  const startIdx = (page - 1) * PRODUCTS_PER_PAGE;
  const paginated = filtered.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);

  const handleSearch = (value) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 300);
  };

  return (
    <div className="container">
      <h1> Product Explorer</h1>
      <SearchBar onSearch={handleSearch} />
      <FilterDropdown category={category} setCategory={setCategory} />
      <div className="grid">
        {paginated.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} total={totalPages} />
    </div>
  );
}

export default App;