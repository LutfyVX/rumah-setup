import React, { useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/Productcard";
import ReactImageMagnify from "react-image-magnify";
import { Icon } from "@iconify/react/dist/iconify.js";
import {useCart} from "./Cartdetail"

const ProductPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const productResponse = await fetch(`http://localhost:5000/api/products/${id}`);
        const productData = await productResponse.json();
        setProduct(productData);

        const relatedResponse = await fetch('http://localhost:5000/api/products/');
        // Filter produk yang terkait (misalnya, produk dengan kategori yang sama)
        const allProducts = await relatedResponse.json();
        const related = allProducts
          .filter(item => item.id !== productData.id)
          .slice(0, 4); // Batasi hanya 4 produk terkait
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]); 

   const { addToCart } = useCart();   
    // <<< panggil hook di sini 
  const buyNow = () => {
    alert(`Proceeding to checkout with ${quantity} of ${product.title || product.name}!`);
  };

  // Gunakan komponen ProductCard untuk produk terkait
  const RelatedProductCard = ({ product }) => {
    return (
      <ProductCard product={product} />
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center min-h-screen">Product not found</div>;
  }

  const thumbnails = [
    product.image || product.imageUrl,
    // Tambahkan gambar lain jika ada
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 font-helvetica-light">
      {/* Breadcrumb */}
      <div className="py-4">
        <nav className="flex text-sm">
          <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link to="/products" className="text-gray-500 hover:text-black">Products</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-black truncate">{product.title || product.name}</span>
        </nav>
      </div>

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
              <div id="imageMagnifyer">
                {thumbnails[selectedImage] && (
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: product.title || product.name,
                        isFluidWidth: true,
                        src: thumbnails[selectedImage],
                      },
                      largeImage: {
                        src: thumbnails[selectedImage],
                        width: 1500,
                        height: 1800,
                      },
                      isHintEnabled: true,
                      shouldHideHintAfterFirstActivation: false,
                      hintTextMouse: "Hover to zoom",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right - Detail */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4 font-ag-futura">{product.title || product.name}</h1>
          <div className="mb-4">
            <span className="text-2xl font-bold">{product.price?.toLocaleString()} IDR</span>
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
               onClick={() => addToCart(product)}
            >
              Add to cart
            </button>
          </div>

          {/* Share */}
          <div className="mt-6">
            <button className="inline-flex items-center">
              <Icon icon="solar:share-bold" className="w-5 h-5 mr-2" />
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
          <p>Rating: {product.rating?.rate || '4.5'} out of 5 ({product.rating?.count || '10'} reviews)</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 pb-16">
        <h2 className="text-xl font-semibold my-4">Produk Terkait</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map(product => (
            <RelatedProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;