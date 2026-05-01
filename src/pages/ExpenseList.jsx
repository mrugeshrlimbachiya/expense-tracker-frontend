import { useState, useEffect } from 'react';
import { getExpenses } from '../services/expenseService';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 0, totalPages: 0 });
  const [sort, setSort] = useState('date'); // Default sort
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, [pagination.page, sort]); // Refetch when page or sort changes

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await getExpenses(pagination.page, 5, sort, 'desc');
      const actualData = response.data;

      if (actualData && Array.isArray(actualData.data)) {
        setExpenses(actualData.data);
        setPagination(prev => ({ ...prev, totalPages: actualData.totalPages }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Expenses</h2>
        
        <select 
          value={sort} 
          onChange={(e) => { setSort(e.target.value); setPagination(p => ({...p, page: 0})); }}
          className="border p-2 rounded bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="expenseName">Sort by Name</option>
        </select>
      </div>

      {loading ? <Spinner /> : (
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <p className="text-center py-10 text-gray-500">No expenses found.</p>
          ) : (
            expenses.map(exp => (
              <div 
                key={exp.expenseId} 
                onClick={() => navigate(`/update-expense/${exp.expenseId}`)} // This opens the update page
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{exp.expenseName}</h3>
                  {/* Displaying the date here */}
                  <p className="text-sm text-gray-500">{exp.date}</p> 
                </div>
                <div className="text-lg font-bold text-blue-600">
                  ₹{exp.amount}
                </div>
              </div>
            ))
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8 pb-10">
            <button 
              disabled={pagination.page === 0}
              onClick={() => setPagination(p => ({...p, page: p.page - 1}))}
              className="px-4 py-2 bg-white border rounded shadow-sm disabled:opacity-50 hover:bg-gray-50 transition"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-gray-600">
              Page {pagination.page + 1} of {pagination.totalPages}
            </span>
            <button 
              disabled={pagination.page >= pagination.totalPages - 1}
              onClick={() => setPagination(p => ({...p, page: p.page + 1}))}
              className="px-4 py-2 bg-white border rounded shadow-sm disabled:opacity-50 hover:bg-gray-50 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default ExpenseList;