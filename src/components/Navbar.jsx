import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold text-blue-600"><Link to="/">ExpenseTracker</Link></h1>
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
        <Link to="/add-expense" className="text-gray-600 hover:text-blue-600">Add Expense</Link>
        <Link to="/expenses" className="text-gray-600 hover:text-blue-600">Expense List</Link>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Logout</button>
      </div>
    </nav>
  );
};
export default Navbar;