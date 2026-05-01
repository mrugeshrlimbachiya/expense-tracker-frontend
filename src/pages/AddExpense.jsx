import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { createExpense } from '../services/expenseService';
import Spinner from '../components/Spinner';

const AddExpense = () => {
  const [formData, setFormData] = useState({
    expenseName: '',
    amount: '',
    date: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Ensure amount is a number before sending to API
      const payload = { ...formData, amount: parseFloat(formData.amount) };
      await createExpense(payload);
      navigate('/expenses'); // Redirect to list on success
    } catch (err) {
      setError('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100 mt-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Expense</h2>
        
        {error && <div className="bg-red-100 text-red-600 p-3 mb-4 rounded text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expense Name</label>
            <input type="text" name="expenseName" required className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
            <input type="number" step="0.01" name="amount" required className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" name="date" required className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" rows="3" className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" onChange={handleChange}></textarea>
          </div>
          
          <button disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 mt-2">
            {loading ? <Spinner /> : 'Save Expense'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddExpense;