import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register'; // (Implemented similarly to Login)
import Dashboard from './pages/Dashboard'; // (Simple Welcome text)
import AddExpense from './pages/AddExpense'; // (Form hitting createExpense API)
import ExpenseList from './pages/ExpenseList';
import UpdateExpense from './pages/UpdateExpense'; // (Form fetching by ID, hitting updateExpense API)

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add-expense" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
          <Route path="/expenses" element={<ProtectedRoute><ExpenseList /></ProtectedRoute>} />
          <Route path="/update-expense/:id" element={<ProtectedRoute><UpdateExpense /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;