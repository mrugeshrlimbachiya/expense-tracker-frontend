import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExpenses } from '../services/expenseService';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses(0, 50); // Calling the API
      console.log("Full API Response:", response); 

      // Look at your console log: the array is in response.data.data
      const actualData = response.data; 

      if (actualData && Array.isArray(actualData.data)) {
        // This matches your log: actualData.data is the Array(1)
        setExpenses(actualData.data);
      } else if (Array.isArray(actualData)) {
        setExpenses(actualData);
      } else {
        console.error("Still couldn't find the array. Check structure:", actualData);
        setExpenses([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Expenses</h2>
      {loading ? <Spinner /> : error ? <div className="text-red-500">{error}</div> : (
        <div className="grid gap-4">
          {expenses.length === 0 ? (
            <p className="text-gray-500 text-center py-8 bg-white rounded-lg shadow-sm">No expenses found.</p>
          ) : (
            expenses.map((expense) => (
              <div key={expense.expenseId} onClick={() => navigate(`/update-expense/${expense.expenseId}`)}
                   className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer hover:shadow-md transition">
                <div>
                  <h3 className="font-semibold text-lg">{expense.expenseName}</h3>
                  <p className="text-sm text-gray-500">{expense.date}</p>
                </div>
                <div className="text-xl font-bold text-red-500">₹{expense.amount}</div>
              </div>
            ))
          )}
        </div>
      )}
    </Layout>
  );
};
export default ExpenseList;