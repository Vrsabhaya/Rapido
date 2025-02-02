import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, requireAdmin }) {
  const { currentUser } = useAuth();

  // Check if user is authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ message: 'Please sign in to access this page' }} />;
  }

  // Check for admin role if required
  if (requireAdmin && currentUser?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Access Denied
              </h2>
              <p className="text-gray-600 mb-6">
                You need administrator privileges to access this page.
              </p>
              <Navigate to="/" replace />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
} 