import ProductCard from '../components/Productcard';
import { useEffect, useState} from 'react';

export default function LandingPage() {

  const ChangingImage = [
    { url:"./assets/EVA-COLLAB.png"},
    { url:"./assets/mksgmdpd.png"},
   
  ]
  const [currentImage, setCurrentImage] = useState(0);
  const [progress, setProgress] = useState(0);

  const imageduration = 5000; 
      useEffect(() => {
      // Timer for changing the image
      const imageTimer = setInterval(() => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % ChangingImage.length);
        setProgress(0);
      }, imageduration);

  
      return () => clearInterval(imageTimer); // Cleanup the interval
    }, [ChangingImage.length]);

  const categories = [
    { id: 1, name: 'Mouse', image: './categories-icon/mouse.png' },
    { id: 2, name: 'Keyboard', image: './categories-icon/keyboard.png' },
    { id: 3, name: 'Gamepad', image: './categories-icon/gamepad.png' },
    { id: 4, name: 'Deskmat', image: './categories-icon/deskmat.png' },
    { id: 5, name: 'Accessories', image: './categories-icon/acc.png' },
  ];

  const [dealsdata, setDealsData] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products?limit=2");
        const data = await res.json();
        setDealsData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDeals();
  }, []);


 const [newestProducts, setNewestProducts] = useState([]);

  useEffect(() => {
    const fetchNewest = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("Failed to load newest products");
        const data = await res.json();
        setNewestProducts(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    fetchNewest();
  }, []);

  return (
    <div>

      <div className="bg-white">
        {/* Hero Banner - Top - Full Width */}
        <div className="w-full h-180  flex items-center justify-center">
           <img 
          src={ChangingImage[currentImage].url} 
          className="w-full h-full object-cover"
        />
        </div>
    {/* Bar DUration */}
         <div className="w-full bg-black h-2">
        <div 
          className="bg-blue h-full transition-all duration-100 ease-linear z-index-10"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      

        {/* Secondary Image
          <img className='w-full h-full object-cover hover:opacity-85 transition-opacity duration-1600 hover:blur-xs'
            src="./public/assets/EVA-COLLAB.png"
            alt="Hero Banner"
          /> */}
            <div className="w-full h-full flex items-center justify-center relative hover:scale-105 transition-transform duration-300">
          <div className="absolute left-8 bottom-4">
            <button className="bg-white text-black text-sm py-2 px-4 rounded-md">
              See Details
            </button>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto">
                <div className="mt-20">
                <h3 className="font-bold font-ag-futura text-4xl mb-30">Quick Categories</h3>
                <div className="flex flex-wrap gap-10 pb-4 justify-center font-helvetica-light">
                  {categories.map((category) => (
                  <div key={category.id} className="flex flex-col items-center justify-center transform scale-100 md:scale-75 lg:scale-100">
                    <div className="w-16 h-16 mb-2">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-contain" 
                    />
                    </div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  ))}
                  <div className="flex items-center justify-center">
                  <button className="text-gray-600 bg-gray-100 rounded-full p-2">
                  </button>
                  </div>
                </div>
                </div>

                {/* Exclusive Deals */}
          <div className="mt-30">
            <h3 className="font-bold mb-6 font-ag-futura text-3xl">EXCLUSIVE-DEALS!</h3>
            <div className="grid grid-cols-2 gap-4">
              {dealsdata.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-md p-4">
                  <img 
                    src={product.image || product.imageUrl} 
                    alt={product.name || product.title}
                    className="w-[45px] h-auto mb-2" 
                  />
                   <p className="text-sm">{product.name || product.title}</p>
                </div>
              ))}
            </div>
          </div>
           <h3 className="font-bold font-ag-futura font text-4xl mb-20 mt-20">NEWEST PRODUCTS</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {newestProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}