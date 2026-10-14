import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL params

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/set-password', {
        password,
      }, { withCredentials: true }); // Include cookies in the request
      setSuccess(response.data.msg);
      setTimeout(() => navigate('/'), 3000); // Redirect to login after success
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[23vw] border py-8 px-5 rounded-lg shadow-lg shadow-zinc-900/50 bg-white">
        <h1 className="text-3xl font-medium">Set Password</h1>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <label>
            New Password:
            <input
              type="password"
              className="border rounded px-2 w-full outline-0 mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              className="border rounded px-2 w-full outline-0 mt-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white rounded bg-blue-600"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
