import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Shop = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://www.localhost:1337/api/products?populate=*', {
        headers: {
          Authorization: `Bearer b6049c64ae079a994778078e6cb4e67b7daf5648a57ae367becdb4f7a5c26fbb835efeb9f74435ceec6ae78cd37b085fd57ef6d2e5aadbbddfed1b6cfe4d1faaa9b62c3fc90e340393e6ddf6883bdd051d5bf6880d55fc95f08ab06e587d6fca276cd2cb40dfced8774b8371aa0fa7d7e7d5a8f61cf5e99bd2b6f999e3dd9875`,
        },
      });
      setProducts(response.data.data || []);
      setFilteredProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 &&
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105"
              >
                <Slider>
                  {product.attributes.Image &&
                    product.attributes.Image.data &&
                    product.attributes.Image.data.map((image) => (
                      <div key={image.id}>
                        <img
                          src={`http://localhost:1337${image.attributes.url}`}
                          alt={image.attributes.name}
                          className="w-11/12 h-40 object-cover"
                        />
                      </div>
                    ))}
                </Slider>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{product.attributes.Title}</h2>
                  <p className="h-24 text-gray-600 mb-4 overflow-hidden">{product.attributes.Description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-800">Price: ${product.attributes.Price}</p>
                    <Link
                      to={`/product/${product.id}`}
                    state={{ productId: product.id }}
                      className="bg-rose-900 text-white px-4 py-2 rounded-lg hover:bg-rose-800 transition duration-300"
                    >
                      View Details
                    </Link>
                    <button onClick={() => handleAddToCart(product)}
                      className="bg-rose-900 text-white px-4 py-2 rounded-lg hover:bg-rose-800 transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Shop;