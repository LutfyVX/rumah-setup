import Navbar from './Navbar';
import ProductList from './Productcard';


export default function LandingPage() {
  const categories = [
    { id: 1, name: 'Mouse', image: './categories-icon/mouse.png' },
    { id: 2, name: 'Keyboard', image: './categories-icon/keyboard.png' },
    { id: 3, name: 'Gamepad', image: './categories-icon/gamepad.png' },
    { id: 4, name: 'Deskmat', image: './categories-icon/deskmat.png' },
    { id: 5, name: 'Accessories', image: './categories-icon/acc.png' },
  ];

  const exclusiveDeals = [
    { 
      id: 1, 
      name: 'Cooler Master CK721 65% Layout Wireless Gaming Mechanical', 
      price: 799000,
      image: '/api/placeholder/240/120'
    },
    { 
      id: 2, 
      name: 'Cooler Master CK721 65% Layout Wireless Gaming Mechanical', 
      price: 799000,
      image: '/api/placeholder/240/120'
    },
  ];


return (
    <div>
        <Navbar />

        <div className="bg-white">
            {/* Hero Banner - Top - Full Width */}
            <div className="w-full h-180 bg-gray-400 flex items-center justify-center">
                <h2 className="text-4xl font-bold">This Is Image</h2>
            </div>

            {/* Hero Banner - Secondary - Full Width */}
            <div className="w-full h-180 bg-gradient-to-r from-black to-red-600 flex items-center justify-center relative">
                <h2 className="text-4xl font-bold text-white">This Is Image</h2>
                <div className="absolute left-8 bottom-4">
                    <button className="bg-white text-black text-sm py-2 px-4 rounded-md">
                        See Details
                    </button>
                </div>
            </div>

            <div className="max-w-[1100px] lg-md mx-auto">
            

            {/* Categories */}
                <div className="justify-start mt-8">
                <h3 className="font-bold font-ag-futura font text-4xl mb-20">Categories</h3>
                <div className="flex gap-40 pb-4 justify-center w- font-helvetica-light">
                    {categories.map((category) => (
                        <div key={category.id} className="flex flex-col items-center justify-center scale-180">
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
            <div className="justify-start mt-15">
                <h3 className=" font-bold mb-6 font-ag-futura text-3xl">EXCLUSIVE-DEALS!</h3>
                <div className="grid grid-cols-2 gap-4">
                    {exclusiveDeals.map((deal) => (
                        <div key={deal.id} className="border border-gray-200 rounded-md p-4">
                            <img 
                                src={deal.image} 
                                alt={deal.name}
                                className="w-full h-auto mb-2" 
                            />
                            <p className="text-sm">{deal.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <h3 className="font-bold font-ag-futura font text-4xl mb-20 mt-20">NEWEST PRODUCTS</h3>
            <ProductList className="gap-3"/>
            </div>
        </div>
        </div>
);
}