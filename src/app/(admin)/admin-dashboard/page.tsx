'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Dummy API function
const adminAPI = {
  getDashboardStats: async () => {
    console.log('[DEBUG] adminAPI.getDashboardStats called');
    // simulate network delay
    await new Promise(res => setTimeout(res, 500));
    return {
      totalUsers: 1000,
      totalVendors: 50,
      totalEvents: 200,
      totalRevenue: 5000000,
    };
  },
};

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalEvents: 0,
    totalRevenue: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
    console.log('[DEBUG] check');
  // Auth & role check
  useEffect(() => {
    console.log('[DEBUG] useEffect auth check', { user, loading });

    if (!loading) {
      if (!user) {
        console.log('[DEBUG] User not logged in -> redirect to /login');
        router.push('/login');
      } else {
        console.log('[DEBUG] User logged in', user);
        // Comment out dashboard redirect for now
        // if (user.role !== 'ADMIN') {
        //   console.log('[DEBUG] Non-admin -> redirect to /dashboard');
        //   router.push('/dashboard');
        // }
      }
    }
  }, [user, loading, router]);

  // Load dashboard stats
  useEffect(() => {
    const loadDashboardData = async () => {
      console.log('[DEBUG] loadDashboardData called with user:', user);
      try {
        if (user?.role === 'ADMIN') {
          const dashboardStats = await adminAPI.getDashboardStats();
          console.log('[DEBUG] Dashboard stats fetched:', dashboardStats);
          setStats(dashboardStats);
        } else {
          console.log('[DEBUG] User not admin, skipping stats load');
        }
      } catch (error) {
        console.error('[DEBUG] Error loading dashboard stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    loadDashboardData();
  }, [user]);

  // Initialize dashboard scripts
  useEffect(() => {
    console.log('[DEBUG] Initializing dashboard scripts');
    const initDashboard = () => {
      if (typeof window !== 'undefined' && window.dashboardsAnalytics) {
        console.log('[DEBUG] dashboardsAnalytics.init() called');
        window.dashboardsAnalytics.init();
      } else {
        console.log('[DEBUG] dashboardsAnalytics not available');
      }
    };
    setTimeout(initDashboard, 1000);
  }, []);

  // Show loading spinner
  if (loading || loadingStats) {
    console.log('[DEBUG] Showing loading spinner', { loading, loadingStats });
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  console.log('[DEBUG] Rendering dashboard', { user, stats });

  // Block render if user is not admin
  if (!user || user.role !== 'ADMIN') {
    console.log('[DEBUG] User not admin, render nothing');
    return null;
  }

  return (
    <div>
      {/* Content Header */}
      <div className="content-header">
        <div>
          <h2 className="content-header-title float-start mb-0">Dashboard</h2>
          <div className="breadcrumb-wrapper">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/admin-dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="content-body">
        {/* Statistics Cards */}
        <div className="row">
          <div className="col-lg-3 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="card-info">
                    <p className="card-text">Total Users</p>
                    <div className="d-flex align-items-end mb-2">
                      <h4 className="card-title mb-0 me-2">{stats.totalUsers.toLocaleString()}</h4>
                      <small className="text-success text-small">
                        <i className="bx bx-trending-up"></i> +12.5%
                      </small>
                    </div>
                    <small>Total registered users</small>
                  </div>
                  <div className="card-icon">
                    <span className="badge bg-label-primary rounded p-2">
                      <i className="bx bx-user bx-sm"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="card-info">
                    <p className="card-text">Active Vendors</p>
                    <div className="d-flex align-items-end mb-2">
                      <h4 className="card-title mb-0 me-2">{stats.totalVendors.toLocaleString()}</h4>
                      <small className="text-success text-small">
                        <i className="bx bx-trending-up"></i> +8.2%
                      </small>
                    </div>
                    <small>Currently active vendors</small>
                  </div>
                  <div className="card-icon">
                    <span className="badge bg-label-info rounded p-2">
                      <i className="bx bx-store bx-sm"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="card-info">
                    <p className="card-text">Total Events</p>
                    <div className="d-flex align-items-end mb-2">
                      <h4 className="card-title mb-0 me-2">{stats.totalEvents.toLocaleString()}</h4>
                      <small className="text-success text-small">
                        <i className="bx bx-trending-up"></i> +15.3%
                      </small>
                    </div>
                    <small>Wedding events created</small>
                  </div>
                  <div className="card-icon">
                    <span className="badge bg-label-warning rounded p-2">
                      <i className="bx bx-calendar bx-sm"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="card-info">
                    <p className="card-text">Revenue</p>
                    <div className="d-flex align-items-end mb-2">
                      <h4 className="card-title mb-0 me-2">₹{(stats.totalRevenue / 1000000).toFixed(1)}M</h4>
                      <small className="text-success text-small">
                        <i className="bx bx-trending-up"></i> +22.1%
                      </small>
                    </div>
                    <small>Total revenue generated</small>
                  </div>
                  <div className="card-icon">
                    <span className="badge bg-label-success rounded p-2">
                      <i className="bx bx-dollar bx-sm"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="d-flex align-items-end row">
                <div className="col-sm-7">
                  <div className="card-body text-nowrap">
                    <h5 className="card-title mb-0">Welcome back, {user?.name || 'Admin'}! 🎉</h5>
                    <p className="mb-2 pb-1">Here's what's happening with your platform today</p>
                    <a href="/admin-users" className="btn btn-sm btn-outline-primary">Manage Users</a>
                  </div>
                </div>
                <div className="col-sm-5 text-center text-sm-left">
                  <div className="card-body pb-0 px-0 px-md-4">
                    <img 
                      src="/assets/img/illustrations/prize-light.png" 
                      height="140" 
                      alt="Admin Dashboard" 
                      data-app-dark-img="illustrations/prize-dark.png" 
                      data-app-light-img="illustrations/prize-light.png" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="row">
          <div className="col-md-6 col-lg-4 col-xl-4 order-0 order-md-1">
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between pb-0">
                <div className="card-title mb-0">
                  <h5 className="m-0 me-2">Quick Actions</h5>
                </div>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <a href="/admin-users" className="btn btn-primary">
                    <i className="bx bx-user me-2"></i>Manage Users
                  </a>
                  <a href="/admin-vendors" className="btn btn-outline-primary">
                    <i className="bx bx-store me-2"></i>Manage Vendors
                  </a>
                  <a href="/admin/reports" className="btn btn-outline-secondary">
                    <i className="bx bx-bar-chart me-2"></i>View Reports
                  </a>
                  <a href="/admin/settings" className="btn btn-outline-info">
                    <i className="bx bx-cog me-2"></i>System Settings
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="col-md-6 col-lg-4 col-xl-4 order-1 order-lg-0">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">System Status</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar me-3">
                      <span className="avatar-initial rounded bg-label-success">
                        <i className="bx bx-check"></i>
                      </span>
                    </div>
                    <div>
                      <h6 className="mb-0">System Online</h6>
                      <small className="text-muted">All services running</small>
                    </div>
                  </div>
                  <div className="user-progress d-flex align-items-center gap-1">
                    <span className="badge bg-label-success">99.9%</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar me-3">
                      <span className="avatar-initial rounded bg-label-info">
                        <i className="bx bx-server"></i>
                      </span>
                    </div>
                    <div>
                      <h6 className="mb-0">API Response</h6>
                      <small className="text-muted">Average response time</small>
                    </div>
                  </div>
                  <div className="user-progress d-flex align-items-center gap-1">
                    <span className="badge bg-label-info">120ms</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="avatar me-3">
                      <span className="avatar-initial rounded bg-label-warning">
                        <i className="bx bx-time"></i>
                      </span>
                    </div>
                    <div>
                      <h6 className="mb-0">Last Backup</h6>
                      <small className="text-muted">2 hours ago</small>
                    </div>
                  </div>
                  <div className="user-progress d-flex align-items-center gap-1">
                    <span className="badge bg-label-warning">Auto</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-md-6 col-lg-4 col-xl-4 order-2">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Recent Activity</h5>
              </div>
              <div className="card-body">
                <ul className="p-0 m-0">
                  <li className="d-flex mb-4 pb-1">
                    <div className="avatar flex-shrink-0 me-3">
                      <span className="avatar-initial rounded bg-label-primary">
                        <i className="bx bx-user"></i>
                      </span>
                    </div>
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="me-2">
                        <h6 className="mb-0">New user registered</h6>
                        <small className="text-muted">John Doe joined the platform</small>
                      </div>
                      <div className="user-progress d-flex align-items-center gap-1">
                        <small className="text-muted">2 min ago</small>
                      </div>
                    </div>
                  </li>
                  <li className="d-flex mb-4 pb-1">
                    <div className="avatar flex-shrink-0 me-3">
                      <span className="avatar-initial rounded bg-label-success">
                        <i className="bx bx-store"></i>
                      </span>
                    </div>
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="me-2">
                        <h6 className="mb-0">New vendor added</h6>
                        <small className="text-muted">Wedding Palace joined</small>
                      </div>
                      <div className="user-progress d-flex align-items-center gap-1">
                        <small className="text-muted">15 min ago</small>
                      </div>
                    </div>
                  </li>
                  <li className="d-flex mb-4 pb-1">
                    <div className="avatar flex-shrink-0 me-3">
                      <span className="avatar-initial rounded bg-label-info">
                        <i className="bx bx-calendar"></i>
                      </span>
                    </div>
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="me-2">
                        <h6 className="mb-0">New event created</h6>
                        <small className="text-muted">Wedding event scheduled</small>
                      </div>
                      <div className="user-progress d-flex align-items-center gap-1">
                        <small className="text-muted">1 hour ago</small>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
