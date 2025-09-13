'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import ScriptLoader from './ScriptLoader';
import SidebarManager from './SidebarManager';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Essential admin template scripts
  const adminScripts = [
    '/assets/vendor/libs/jquery/jquery.js',
    '/assets/vendor/libs/popper/popper.js',
    '/assets/vendor/libs/bootstrap/bootstrap.js',
    '/assets/vendor/libs/node-waves/node-waves.js',
    '/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js',
    '/assets/js/config.js',
    '/assets/js/main.js',
    '/assets/js/ui-menu.js',
    '/assets/js/ui-navbar.js'
  ];

  const handleScriptsLoad = () => {
    // Initialize admin template after scripts are loaded
    if (typeof window !== 'undefined') {
      window.isRtl = false;
      window.isDarkStyle = false;
      
      // Initialize Waves
      if (typeof window.Waves !== 'undefined') {
        window.Waves.init();
      }
      
      // Initialize menu
      if (typeof window.Helpers !== 'undefined') {
        window.Helpers.init();
      }
    }
  };

  useEffect(() => {
    // Check if user is admin and redirect if not
    if (!loading && user && user.role !== 'admin') {
      router.push('/dashboard');
    }
    // If user is admin and on root admin path, redirect to dashboard
    if (!loading && user && user.role === 'admin' && window.location.pathname === '/admin') {
      router.push('/admin-dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <ScriptLoader scripts={adminScripts} onLoad={handleScriptsLoad} />
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
        {/* Sidebar */}
        <SidebarManager />
        {/* / Sidebar */}

        {/* Layout container */}
        <div className="layout-page">
          {/* Navbar */}
          <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a className="nav-item nav-link px-0 me-xl-4" href="#">
                <i className="bx bx-menu bx-sm"></i>
              </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              {/* Search */}
              <div className="navbar-nav align-items-center">
                <div className="nav-item d-flex align-items-center">
                  <i className="bx bx-search fs-4 lh-0"></i>
                  <input type="text" className="form-control border-0 shadow-none" placeholder="Search..." aria-label="Search..." />
                </div>
              </div>
              {/* /Search */}

              <ul className="navbar-nav flex-row align-items-center ms-auto">
                {/* Place this tag where you want the button to render. */}
                <li className="nav-item lh-1 me-3">
                  <a className="github-button" href="#" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star themeselection/materio-bootstrap-html-admin-template-free on GitHub">Star</a>
                </li>

                {/* User */}
                <li className="nav-item navbar-dropdown dropdown-user">
                  <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
                    <div className="avatar avatar-online">
                      <img src="/assets/img/avatars/1.png" alt="" className="w-px-40 h-auto rounded-circle" />
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              <img src="/assets/img/avatars/1.png" alt="" className="w-px-40 h-auto rounded-circle" />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">{user?.name || 'Admin User'}</h6>
                            <small className="text-muted">{user?.email}</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a className="dropdown-item" href="/admin/profile">
                        <i className="bx bx-user me-2"></i>
                        <span className="align-middle">My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-cog me-2"></i>
                        <span className="align-middle">Settings</span>
                      </a>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        window.location.href = '/login';
                      }}>
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Log Out</span>
                      </a>
                    </li>
                  </ul>
                </li>
                {/*/ User */}
              </ul>
            </div>
          </nav>
          {/* / Navbar */}

          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
              {children}
            </div>
            {/* / Content */}

            {/* Footer */}
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div className="mb-2 mb-md-0">
                  © <script>document.write(new Date().getFullYear())</script>, made with ❤️ by <a href="#" target="_blank" className="footer-link fw-bolder">VivahSampan Team</a>
                </div>
                <div>
                  <a href="#" className="footer-link me-4" target="_blank">License</a>
                  <a href="#" target="_blank" className="footer-link me-4">Documentation</a>
                  <a href="#" target="_blank" className="footer-link d-none d-sm-inline-block">Support</a>
                </div>
              </div>
            </footer>
            {/* / Footer */}

            <div className="content-backdrop fade"></div>
          </div>
          {/* Content wrapper */}
        </div>
        {/* / Layout page */}
      </div>

      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
    </>
  );
}
