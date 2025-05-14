
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock login function (replace with actual API call)
const loginUser = async (email: string, password: string): Promise<{token: string}> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // This is just for demo purposes - in a real app, would verify credentials
  if (email === 'admin@example.com' && password === 'password') {
    return { token: 'mock-auth-token-admin' };
  } else if (email && password) {
    return { token: 'mock-auth-token-user' };
  } else {
    throw new Error('Invalid credentials');
  }
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';
  
  // If already logged in, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, redirectPath]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { token } = await loginUser(email, password);
      login(token);
      toast.success('Login successful');
      navigate(redirectPath);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isRedirected = !!searchParams.get('redirect');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md px-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-medium text-gray-900 mb-2">Sign in</h1>
              {isRedirected && (
                <p className="text-gray-500">Please sign in to continue</p>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-gray-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 text-white bg-black hover:bg-gray-800 rounded-xl transform transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
              
              <div className="text-center text-sm text-gray-500">
                <p>For demo: use admin@example.com / password</p>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-black font-medium hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
