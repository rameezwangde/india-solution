import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.MODE === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md w-full text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-red-500/20 rounded-full">
                <AlertCircle size={48} className="text-red-500" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
              <p className="text-gray-400">
                An unexpected error occurred in the application. Please try reloading the page.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 bg-magenta hover:bg-magenta-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
            >
              <RefreshCw size={20} />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
