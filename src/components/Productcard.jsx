import { Link } from "react-router-dom";
import {useCart} from "./Cartdetail"

const ProductCard = ({ product, className = "" }) => {
  const { addToCart } = useCart();    // <<< panggil hook di sini

  if (!product) {
    console.error("Product is undefined or null:", product);
    return null;
  }
  // Pastikan product memiliki _id atau id untuk navigas

  return (
    <div className={`bg-white rounded-lg overflow-hidden transition-shadow duration-300 ${className}`}>
      <a href={`/product/${product.id}`} className="block">
        <div className="relative h-48 w-full">
          <img 
            src={product.imageUrl || product.image} 
            alt={product.title || product.name} 
            className="object-contain p-2 w-full h-full" 
          />
          <div className="absolute top-2 right-2">
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-raleway text-black font-helvetica-nikka truncate">
            {product.name || product.title}
          </h2>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xl  text-black font-raleway">
              Rp. {product.price?.toLocaleString()} <span className="text-sm font-helvetica-light"></span>
            </span>
          </div>
        </div>
        <div className="px-3 pb-3">
          <button onClick={() => addToCart(product)}
          className="w-full bg-white outline-[0.6px] hover:bg-black hover:text-white transition-colors text-black py-2 px-4 rounded font-bold">
            Add
          </button>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;