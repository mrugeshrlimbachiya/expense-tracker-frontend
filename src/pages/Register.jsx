import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import Spinner from '../components/Spinner';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    setError('');
    try {
      const { confirmPassword, ...apiData } = formData;
      await register(apiData);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
        
        {error && <div className="bg-red-100 text-red-600 p-3 mb-4 rounded text-sm">{error}</div>}
        {success && <div className="bg-green-100 text-green-600 p-3 mb-4 rounded text-sm">Registration successful! Redirecting...</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="fullName" placeholder="Full Name" required className="p-2 border rounded" onChange={handleChange} />
          <input type="text" name="username" placeholder="Username" required className="p-2 border rounded" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required className="p-2 border rounded" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required className="p-2 border rounded" onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required className="p-2 border rounded" onChange={handleChange} />
          
          <button disabled={loading || success} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {loading ? <Spinner /> : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;