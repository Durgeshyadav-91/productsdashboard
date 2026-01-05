import React, { useEffect, useState } from "react";
import "./App.css";
import {
  getProducts,
  getCategories,
  getByCategory
} from "./services/api";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const productsRes = await getProducts();
      const categoriesRes = await getCategories();
      setProducts(productsRes.data);
      setFilteredProducts(productsRes.data);
      setCategories(categoriesRes.data);
      setLoading(false);
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    let result = products;
    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }
    setFilteredProducts(result);
  }, [search, category, products]);

  return (
    <>
      {!editProduct && !showAdd && (
        <ProductList
          data={filteredProducts}
          loading={loading}
          onEdit={setEditProduct}
          onAdd={() => setShowAdd(true)}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={categories}
        />
      )}

      {showAdd && (
        <AddProduct
          data={products}
          setData={setProducts}
          close={() => setShowAdd(false)}
        />
      )}

      {editProduct && (
        <EditProduct
          product={editProduct}
          data={products}
          setData={setProducts}
          close={() => setEditProduct(null)}
        />
      )}
    </>
  );
}

export default App;
