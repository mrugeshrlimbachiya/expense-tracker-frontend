import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getExpenseById, updateExpense } from '../services/expenseService';
import Spinner from '../components/Spinner';

const UpdateExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    expenseName: '',
    amount: '',
    date: '',
    description: ''
  });
  
  const [initialLoading, setInitialLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch existing expense data on mount
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const { data } = await getExpenseById(id);
        setFormData({
          expenseName: data.expenseName || '',
          amount: data.amount || '',
          date: data.date || '',
          description: data.description || ''
        });
      } catch (err) {
        setError('Failed to load expense details.');
      } finally {
        setInitialLoading(false);
      }
    };
    fetchExpense();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');
    setSuccessMessage('');
    
    try {
      const payload = { ...formData, amount: parseFloat(formData.amount) };
      await updateExpense(id, payload);
      setSuccessMessage('Expense updated successfully!');
      setTimeout(() => navigate('/expenses'), 1500);
    } catch (err) {
      setError('Failed to update expense.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (initialLoading) {
    return <Layout><div className="mt-20"><Spinner /></div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100 mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Update Expense</h2>
          <button onClick={() => navigate('/expenses')} className="text-sm text-gray-500 hover:text-gray-800">Cancel</button>
        </div>
        
        {error && <div className="bg-red-100 text-red-600 p-3 mb-4 rounded text-sm">{error}</div>}
        {successMessage && <div className="bg-green-100 text-green-600 p-3 mb-4 rounded text-sm">{successMessage}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Expense Name (Read-only depending on your API, but editable here just in case) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expense Name</label>
            <input type="text" name="expenseName" value={formData.expenseName} required className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
            <input type="number" step="0.01" name="amount" value={formData.amount} required className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" name="date" value={formData.date} required className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" rows="3" value={formData.description} className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" onChange={handleChange}></textarea>
          </div>
          
          <button disabled={submitLoading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 mt-2">
            {submitLoading ? <Spinner /> : 'Update Expense'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateExpense;