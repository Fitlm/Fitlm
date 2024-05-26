import React, { useState, useEffect, useCallback } from "react";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/CardItem";
import axiosInstance from "../../utils/axios";

const LandingPage = () => {
  const limit = 4;
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchProducts = useCallback(async ({
    skip,
    limit,
    loadMore = false,
    filters = {},
    searchTerm: searchTermParam = "",
  }) => {
    const params = {
      skip,
      limit,
      filters,
      searchTerm: searchTermParam,
    };

    try {
      const response = await axiosInstance.get("/products", { params });

      if (loadMore) {
        setProducts((prevProducts) => [...prevProducts, ...response.data.products]);
      } else {
        setProducts(response.data.products);
      }
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts({ skip, limit });
  }, [fetchProducts, skip]);

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      searchTerm,
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  const handleSearchTerm = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    const body = {
      skip: 0,
      limit,
      searchTerm: newSearchTerm,
    };
    fetchProducts(body);
  };

  return (
    <section className="max-w-4xl">
      {/* Search */}
      <div className="flex justify-end mb-3">
        <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
      </div>
      {/* Card */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products?.map((product) => (
          <CardItem product={product} key={product._id} />
        ))}
      </div>

      {/* LoadMore */}
      {hasMore && (
        <div className="flex justify-center mt-5">
          <button
            className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
            onClick={handleLoadMore}
          >
            더보기
          </button>
        </div>
      )}
    </section>
  );
};

export default LandingPage;