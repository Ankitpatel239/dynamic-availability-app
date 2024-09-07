"use client";

import React, { useEffect, useState } from 'react';

const AdminDashboardPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch('/api/dashboard/adminDashboard');
      const data = await response.json();
      console.log(data);
      if (data.userId && data.userRole) {
        setUserId(data.userId);
        setRole(data.userRole);
      } else {
        window.location.href = '/login';
      }
    };
    fetchUserInfo();
  }, []);

  if (role !== 'admin') {
    return <p>Access Denied</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-4">
        <p className="text-lg">Welcome, Admin</p>
        <p className="text-lg">User ID: {userId}</p>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
