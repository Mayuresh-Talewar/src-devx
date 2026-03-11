const App = () => {
  const [page, setPage] = useState('home');
  const [context, setContext] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const navigate = (target, data = null) => {
    setPage(target);
    setContext(data);
    window.scrollTo(0, 0);
  };

  const addToCart = (dish) => {
    setCart([...cart, dish]);
  };

  const removeFromCart = (dishId) => {
    setCart(cart.filter(dish => dish.id !== dishId));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <header className="p-4 border-b border-slate-700 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Palms Restaurant</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <nav className="flex justify-around p-4 bg-slate-800">
        <button onClick={() => navigate('home')} className="hover:underline">Home</button>
        <button onClick={() => navigate('menu')} className="hover:underline">Menu</button>
        <button onClick={() => navigate('reservations')} className="hover:underline">Reservations</button>
        <button onClick={() => navigate('cart')} className="hover:underline">Cart ({cart.length})</button>
      </nav>

      <main className="p-6">
        {page === 'home' && (
          <div className="text-center">
            <h2 className="text-4xl">Welcome to Palms!</h2>
            <p className="mt-4">Experience the exquisite flavors of our menu.</p>
          </div>
        )}

        {page === 'menu' && (
          <div>
            <h2 className="text-2xl mb-4">Our Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 1, name: 'Margherita Pizza', price: 12.99, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' },
                { id: 2, name: 'Cheeseburger', price: 10.99, img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400' },
                // Add more items...
              ].map(dish => (
                <div key={dish.id} className="p-4 border rounded-xl hover:shadow-xl transition-shadow">
                  <img src={dish.img} alt={dish.name} className="w-full h-40 object-cover rounded-xl" />
                  <div className="mt-2">
                    <h3 className="text-xl font-bold">{dish.name}</h3>
                    <p>${dish.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(dish)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'reservations' && (
          <div>
            <h2 className="text-2xl mb-4">Make a Reservation</h2>
            {/* Form for reservations */}
            <form className="space-y-4 max-w-md mx-auto">
              <input type="text" placeholder="Name" className="w-full p-2 border rounded-xl" />
              <input type="email" placeholder="Email" className="w-full p-2 border rounded-xl" />
              <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded-xl" />
              <input type="date" className="w-full p-2 border rounded-xl" />
              <button type="submit" className="w-full py-2 bg-green-500 text-white rounded-full hover:bg-green-600">Reserve</button>
            </form>
          </div>
        )}

        {page === 'cart' && (
          <div>
            <h2 className="text-2xl mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between items-center p-2 border-b">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  );
};