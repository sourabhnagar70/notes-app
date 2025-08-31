/*import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthService } from '../../services/authService';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

interface SignUpProps {
  onSwitchToSignIn: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSwitchToSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', { email, password, confirmPassword });
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const { data, error } = await AuthService.signUpWithEmail(email, password);
      
      console.log('Signup response:', { data, error });
      
      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (data.user) {
        if (data.session) {
          // User is signed up and authenticated immediately
          console.log('Signup successful with immediate authentication');
          setLoading(false);
        } else {
          // User created but needs email confirmation
          console.log('User created, email confirmation required');
          setError('Please check your email and confirm it');
          setLoading(false);
        }
      } else {
        console.log('Signup failed - no user data returned');
        setError('Signup failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    console.log('Google signup clicked');
    setLoading(true);
    setError('');

    try {
      const { error } = await AuthService.signInWithGoogle();
      
      if (error) {
        setError(error.message);
        setLoading(false);
      }
    } catch (err) {
      console.error('Google signup error:', err);
      setError('Failed to sign up with Google');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign up</h1>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        {error && <ErrorMessage message={error} className="mb-6" />}

        <form onSubmit={handleEmailSignUp} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Confirm your password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            {loading ? <LoadingSpinner className="text-white" /> : 'Sign up'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <button
            onClick={onSwitchToSignIn}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Sign in
          </button>
        </p
      </div>
    </div>
  );
}; */


import React, { useState } from 'react';
import { Calendar, Eye, EyeOff } from 'lucide-react';
import { supabase } from "../../config/supabase";
import topLogo from "../../assets/top.png";
import rightColumnImage from "../../assets/right-column.png";

interface SignUpProps {
  onSwitchToSignIn: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSwitchToSignIn }) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Send OTP
  const handleGetOTP = async () => {
    if (!name || !dateOfBirth || !email) return;
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true, // ensures new user creation
          emailRedirectTo: window.location.origin, // avoid magic link redirection
        }
      });
      if (error) throw error;

      setShowOtpField(true);
      setMessage({ type: "success", text: `OTP sent to ${email}` });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to send OTP" });
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleSignUp = async () => {
    if (!otp) return;
    setLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email", // ✅ numeric OTP verification
      });

      if (error) throw error;

      if (data?.user) {
        await supabase.from("profiles").insert({
          id: data.user.id,
          name,
          date_of_birth: dateOfBirth,
          email,
        });
      }

      setMessage({ type: "success", text: "Signup successful! Redirecting..." });

      setTimeout(() => {
        onSwitchToSignIn();
      }, 1500);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Invalid OTP" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="p-6 lg:p-8 flex justify-start lg:justify-start">
          <img src={topLogo} alt="Logo" className="h-12 object-contain" />
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 lg:px-16 pb-8">
          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Sign up</h1>
              <p className="text-gray-500 text-base">Sign up to enjoy the features of HD</p>
            </div>

            {message && (
              <div
                className={`mb-4 p-3 rounded-lg text-sm ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-gray-50"
                  placeholder="Jonas Kahnwald"
                  disabled={loading}
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-gray-50"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-blue-500 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-blue-500 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white"
                  placeholder="jonas_kahnwald@gmail.com"
                  disabled={loading}
                />
              </div>

              {/* OTP */}
              {showOtpField && (
                <div className="animate-fadeIn">
                  <label className="block text-sm text-gray-400 mb-2">OTP</label>
                  <div className="relative">
                    <input
                      type={showOtp ? "text" : "password"}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 pr-12 py-4 border-2 border-blue-500 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white"
                      placeholder="Enter OTP"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowOtp(!showOtp)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showOtp ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={showOtpField ? handleSignUp : handleGetOTP}
                disabled={
                  loading ||
                  (!showOtpField && (!name || !dateOfBirth || !email)) ||
                  (showOtpField && !otp)
                }
                className="w-full bg-blue-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {showOtpField ? 'Signing up...' : 'Sending OTP...'}
                  </div>
                ) : (
                  showOtpField ? 'Sign up' : 'Get OTP'
                )}
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={onSwitchToSignIn}
                  className="text-blue-500 hover:text-blue-600 font-medium transition-colors underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-white items-center justify-center">
        <img
          src={rightColumnImage}
          alt="Right Illustration"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};
