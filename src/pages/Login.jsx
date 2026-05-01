import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { login as loginApi } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await loginApi(formData);
      // Assuming API returns token in response.data.token
      login(response.data.token || response.data); 
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="Username" required className="p-2 border rounded"
                 onChange={e => setFormData({...formData, username: e.target.value})} />
          <input type="password" placeholder="Password" required className="p-2 border rounded"
                 onChange={e => setFormData({...formData, password: e.target.value})} />
          <button disabled={loading} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {loading ? <Spinner /> : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          New user? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;