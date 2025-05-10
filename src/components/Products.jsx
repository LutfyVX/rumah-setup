import React, { useState, useEffect } from "react";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Assuming we're fetching a product with ID 1
        const productResponse = await fetch('http://localhost:5000/api/products/2');
        const productData = await productResponse.json();
        setProduct(productData);
        
        // Fetch related products
        const relatedResponse = await fetch('http://localhost:5000/api/products/');
        const relatedData = await relatedResponse.json();
        setRelatedProducts(relatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  const addToCart = () => {
    alert(`Added ${quantity} of ${product.title} to cart!`);
  };

  const buyNow = () => {
    alert(`Proceeding to checkout with ${quantity} of ${product.title}!`);
  };

  const RelatedProductCard = ({ product }) => {
    return (
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-48 object-contain p-2" 
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{product.title}</h3>
          <div className="mt-2 flex flex-col">
            <span className="text-gray-400 line-through text-sm">{(product.price * 1.2).toLocaleString('id-ID')}</span>
            <span className="font-bold">{product.price.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center min-h-screen">Product not found</div>;
  }

  const thumbnails = [
    product.image,
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
    "/api/placeholder/400/400"
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8 py-8">
        {/* Left - Images */}
        <div className="md:w-1/2">
          <div className="flex">
            <div className="flex flex-col gap-4 mr-4">
              {thumbnails.map((thumb, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border w-16 h-16 cursor-pointer ${selectedImage === index ? 'border-black' : 'border-gray-200'}`}
                >
                  <img src={thumb} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain p-1" />
                </div>
              ))}
            </div>

            <div className="flex-1 border border-gray-200">
              <img src={thumbnails[selectedImage]} alt={product.title} className="w-full h-auto object-contain p-4" />
            </div>
          </div>
        </div>

        {/* Right - Detail */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="mb-4">
            <span className="text-2xl font-bold">{product.price.toLocaleString('id-ID')} IDR</span>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">Stok: {product.stock || 'Available'}</p>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="mb-2">Quantity</p>
            <div className="flex items-center">
              <button 
                className="w-8 h-8 border border-gray-300 flex items-center justify-center"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >-</button>
              <span className="mx-4">{quantity}</span>
              <button 
                className="w-8 h-8 border border-gray-300 flex items-center justify-center"
                onClick={() => setQuantity(quantity + 1)}
              >+</button>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              className="w-full py-3 border border-black bg-white text-black font-medium rounded hover:bg-gray-100"
              onClick={buyNow}
            >
              Buy Now
            </button>
            <button 
              className="w-full py-3 bg-black text-white font-medium rounded hover:bg-gray-800"
              onClick={addToCart}
            >
              Add to cart
            </button>
          </div>

          {/* Share */}
          <div className="mt-6">
            <button className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 pb-8">
        <h2 className="text-xl font-semibold mb-4">Deskripsi</h2>
        <p className="text-gray-600">{product.description}</p>
      </div>

      <div className="border-t border-gray-200 pt-8 pb-16">
        <h2 className="text-xl font-semibold mb-4">Spesifikasi Produk</h2>
        <div className="text-gray-600">
          <p>Category: {product.category}</p>
          <p>Rating: {product.rating?.rate} out of 5 ({product.rating?.count} reviews)</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 pb-16">
        <h2 className="text-xl font-semibold my-4">Produk Terkait</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map(product => (
            <RelatedProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;