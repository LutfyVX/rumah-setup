import React from 'react';

export default function Navbar({ user, usernameInput, passwordInput, setUsernameInput, setPasswordInput, handleLogin, handleLogout, setEditing }) {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold">MyApp</div>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <button 
              className="text-blue-500 hover:underline"
              onClick={() => setEditing(true)}
            >
              Profile ({user.username})
            </button>
            <button 
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Username"
              className="border p-1 rounded"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password"
              className="border p-1 rounded"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button 
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
