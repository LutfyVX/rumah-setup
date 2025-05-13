import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from 'react-router-dom';
import {useCart} from './Cartdetail'


export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {cartItems} = useCart();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = (
    <>
      <Link to="/" className="hover:underline">
      Home
    </Link>
      <a href="#nigga" className="hover:underline">
        Produk
      </a>
      <a href="#" className="hover:underline">
        FAQ
      </a>
      <a href="#" className="hover:underline">
        Garansi
      </a>
    </>
  );

  return (
    <div className="w-full">
      <div className="bg-black bg-opacity-90 text-white text-center text-sm font-semibold py-2">
        NEW LAUNCH: LOREM IPSUM | DOLOR SIT
      </div>

      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow relative">
        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="hidden md:flex gap-6">{navItems}</div>

          {/* Hamburger Button */}
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open Menu"
          >
            <Icon icon="mdi:menu" className="text-2xl" />
          </button>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-6 text-xl">
          {/* Search */}
          <div className="relative w-32 hidden md:block">
            <input
              type="text"
              className="w-full border rounded-full py-2 px-4 pl-10 text-sm"
              placeholder="Search..."
            />
            <Icon
              icon="mdi:magnify"
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </div>

          {/* Cart */}
          <div className="relative">
            <Link to="/Cart">
              <Icon icon="material-symbols-light:shopping-bag-outline" width={24} height={30} />
            </Link>
            <span className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
               {totalQuantity}
            </span>
          </div>

          {/* Wishlist */}
          <div className="relative">
            <Icon icon="weui:like-outlined" width="24" height="30" />
            <span className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              1
            </span>
          </div>

          {/* Avatar Placeholder */}
                <Link to="/Login" className="w-6 h-6 bg-gray-300 rounded-full" />
              </div>

              {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-4 border-b">
            <span className="font-bold text-lg">Menu</span>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close Menu"
            >
              <Icon icon="mdi:close" className="text-2xl" />
            </button>
          </div>
          <div className="flex flex-col gap-4 px-6 py-6 text-sm font-medium">
            {navItems}
          </div>
        </div>

        {/* Overlay when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
