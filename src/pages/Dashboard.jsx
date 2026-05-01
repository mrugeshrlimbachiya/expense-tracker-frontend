import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Layout>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center mt-10">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Expense Tracker</h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Track and manage your expenses efficiently. Use navigation links to add new expenses or view your expense history.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/add-expense" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Add New Expense
          </Link>
          <Link to="/expenses" className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition">
            View History
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;