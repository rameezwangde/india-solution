import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0A10] flex items-center justify-center p-4 font-sans text-gray-200">
          <div className="bg-[#12121A] border border-red-500/20 p-8 rounded-2xl max-w-lg w-full text-center shadow-xl">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-500/10 text-red-500 rounded-full">
                <AlertTriangle size={48} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
            <p className="text-gray-400 mb-8">
              The application encountered an unexpected error. Please try refreshing the page.
            </p>
            
            <button 
              onClick={() => window.location.reload()} 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-magenta to-orange px-6 py-3 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
            >
              <RefreshCw size={20} />
              Refresh Page
            </button>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 text-left bg-black/50 p-4 rounded-lg overflow-x-auto text-xs font-mono text-gray-400">
                <p className="text-red-400 mb-2 font-bold">{this.state.error.toString()}</p>
                <p className="whitespace-pre-wrap">{this.state.errorInfo?.componentStack}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
