import { Link } from "react-router-dom";
import {
  Users,
  Calculator,
  PieChart,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm border-white/20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                ExpenseTracker
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 font-medium text-gray-700 transition-colors rounded-lg hover:text-blue-600"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 font-semibold transition-all duration-200 transform rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:scale-105 !text-black"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 pt-20 pb-32 sm:px-6 lg:px-8">
        <div className="mx-auto text-center max-w-7xl">
          <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
            Split Expenses
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Effortlessly
            </span>
          </h1>
          <p className="max-w-3xl mx-auto mb-12 text-xl leading-relaxed text-gray-600 md:text-2xl">
            Track shared expenses, split bills fairly, and settle up with
            friends. Never worry about who owes what again.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="flex items-center px-8 py-4 space-x-2 text-lg font-semibold !text-black transition-all duration-200 transform shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl hover:shadow-2xl hover:scale-105"
            >
              <span>Start Tracking</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-200 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 rounded-xl hover:bg-white/50"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Why Choose ExpenseTracker?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Simplify your group expenses with our powerful yet intuitive
              features
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-8 transition-all duration-300 transform shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:scale-105">
              <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Smart Calculations
              </h3>
              <p className="leading-relaxed text-gray-600">
                Automatically calculate who owes what with our intelligent
                splitting algorithms. No more manual math or confusion.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 transition-all duration-300 transform shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:scale-105">
              <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Group Management
              </h3>
              <p className="leading-relaxed text-gray-600">
                Create and manage multiple groups for different occasions. Keep
                your trips, dinners, and events organized separately.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 transition-all duration-300 transform shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:scale-105">
              <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Easy to Use
              </h3>
              <p className="leading-relaxed text-gray-600">
                Intuitive interface that anyone can use. Add expenses, split
                bills, and settle up in just a few taps.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="col-start-2 p-8 transition-all duration-300 transform shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:scale-105">
              <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Real-time Sync
              </h3>
              <p className="leading-relaxed text-gray-600">
                Changes sync instantly across all devices. Everyone in your
                group stays updated in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-blue-100">
            Join thousands of users who have simplified their expense tracking.
            It's free to get started!
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 space-x-2 text-lg font-semibold text-blue-600 transition-all duration-200 transform bg-white shadow-xl hover:bg-gray-100 rounded-xl hover:shadow-2xl hover:scale-105"
          >
            <span>Create Your Account</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-white bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center mb-4 space-x-3 md:mb-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ExpenseTracker</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/login"
                className="text-gray-300 transition-colors hover:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-gray-300 transition-colors hover:text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <div className="pt-8 mt-8 text-center text-gray-400 border-t border-gray-800">
            <p>&copy; 2024 ExpenseTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
