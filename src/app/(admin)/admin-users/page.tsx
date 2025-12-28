'use client';

import { useAuth } from '@/hooks/useAuth';

export default function AdminUsers() {
  const { user } = useAuth();

  return (
    <div>
      {/* Content Header */}
      <div className="content-header">
        <div>
          <h2 className="content-header-title float-start mb-0">Users Management</h2>
          <div className="breadcrumb-wrapper">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/admin-dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active">Users</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="content-body">
        {/* Users Table */}
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">All Users</h5>
            <button className="btn btn-primary">
              <i className="bx bx-plus me-2"></i>Add New User
            </button>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-sm me-3">
                          <span className="avatar-initial rounded bg-label-primary">JD</span>
                        </div>
                        <div>
                          <h6 className="mb-0">John Doe</h6>
                          <small className="text-muted">john.doe@example.com</small>
                        </div>
                      </div>
                    </td>
                    <td>john.doe@example.com</td>
                    <td><span className="badge bg-label-info">User</span></td>
                    <td><span className="badge bg-label-success">Active</span></td>
                    <td>2024-01-15</td>
                    <td>
                      <div className="dropdown">
                        <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          Actions
                        </button>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">View</a></li>
                          <li><a className="dropdown-item" href="#">Edit</a></li>
                          <li><a className="dropdown-item" href="#">Deactivate</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-sm me-3">
                          <span className="avatar-initial rounded bg-label-warning">JS</span>
                        </div>
                        <div>
                          <h6 className="mb-0">Jane Smith</h6>
                          <small className="text-muted">jane.smith@example.com</small>
                        </div>
                      </div>
                    </td>
                    <td>jane.smith@example.com</td>
                    <td><span className="badge bg-label-warning">Vendor</span></td>
                    <td><span className="badge bg-label-success">Active</span></td>
                    <td>2024-01-20</td>
                    <td>
                      <div className="dropdown">
                        <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          Actions
                        </button>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">View</a></li>
                          <li><a className="dropdown-item" href="#">Edit</a></li>
                          <li><a className="dropdown-item" href="#">Deactivate</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-sm me-3">
                          <span className="avatar-initial rounded bg-label-success">MJ</span>
                        </div>
                        <div>
                          <h6 className="mb-0">Mike Johnson</h6>
                          <small className="text-muted">mike.johnson@example.com</small>
                        </div>
                      </div>
                    </td>
                    <td>mike.johnson@example.com</td>
                    <td><span className="badge bg-label-danger">Admin</span></td>
                    <td><span className="badge bg-label-success">Active</span></td>
                    <td>2024-01-10</td>
                    <td>
                      <div className="dropdown">
                        <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          Actions
                        </button>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">View</a></li>
                          <li><a className="dropdown-item" href="#">Edit</a></li>
                          <li><a className="dropdown-item" href="#">Deactivate</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
