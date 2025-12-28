'use client';

import { useAuth } from '@/hooks/useAuth';

export default function AdminVendors() {
  const { user } = useAuth();

  return (
    <div>
      {/* Content Header */}
      <div className="content-header">
        <div>
          <h2 className="content-header-title float-start mb-0">Vendors Management</h2>
          <div className="breadcrumb-wrapper">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/admin-dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active">Vendors</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="content-body">
        {/* Vendors Grid */}
        <div className="row mb-4">
          <div className="col-lg-3 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="card-info">
                    <p className="card-text">Total Vendors</p>
                    <div className="d-flex align-items-end mb-2">
                      <h4 className="card-title mb-0 me-2">2,345</h4>
                      <small className="text-success text-small">
                        <i className="bx bx-trending-up"></i> +12.5%
                      </small>
                    </div>
                  </div>
                  <div className="card-icon">
                    <span className="badge bg-label-primary rounded p-2">
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
                    <p className="card-text">Active Vendors</p>
                    <div className="d-flex align-items-end mb-2">
                      <h4 className="card-title mb-0 me-2">1,890</h4>
                      <small className="text-success text-small">
                        <i className="bx bx-trending-up"></i> +8.2%
                      </small>
                    </div>
                  </div>
                  <div className="card-icon">
                    <span className="badge bg-label-success rounded p-2">
                      <i className="bx bx-check-circle bx-sm"></i>
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
                    <p className="card-text">Pending Approval</p>
                    <div className="d-flex align-items-end mb-2">
                      <h4 className="card-title mb-0 me-2">45</h4>
                      <small className="text-warning text-small">
                        <i className="bx bx-time-five"></i> Pending
                      </small>
                    </div>
                  </div>
                  <div className="card-icon">
                    <span className="badge bg-label-warning rounded p-2">
                      <i className="bx bx-hourglass bx-sm"></i>
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
                      <h4 className="card-title mb-0 me-2">₹2.4M</h4>
                      <small className="text-success text-small">
                        <i className="bx bx-trending-up"></i> +22.1%
                      </small>
                    </div>
                  </div>
                  <div className="card-icon">
                    <span className="badge bg-label-info rounded p-2">
                      <i className="bx bx-dollar bx-sm"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vendors Table */}
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">All Vendors</h5>
            <button className="btn btn-primary">
              <i className="bx bx-plus me-2"></i>Add New Vendor
            </button>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Rating</th>
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
                          <span className="avatar-initial rounded bg-label-primary">WD</span>
                        </div>
                        <div>
                          <h6 className="mb-0">Wedding Dreams</h6>
                          <small className="text-muted">Photography & Videography</small>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge bg-label-info">Photography</span></td>
                    <td>Mumbai, Maharashtra</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="text-warning">★★★★★</span>
                        <small className="text-muted ms-1">(4.9)</small>
                      </div>
                    </td>
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
                          <li><a className="dropdown-item" href="#">Suspend</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-sm me-3">
                          <span className="avatar-initial rounded bg-label-warning">GF</span>
                        </div>
                        <div>
                          <h6 className="mb-0">Grand Feast</h6>
                          <small className="text-muted">Catering Services</small>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge bg-label-warning">Catering</span></td>
                    <td>Delhi, NCR</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="text-warning">★★★★☆</span>
                        <small className="text-muted ms-1">(4.7)</small>
                      </div>
                    </td>
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
                          <li><a className="dropdown-item" href="#">Suspend</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-sm me-3">
                          <span className="avatar-initial rounded bg-label-success">DS</span>
                        </div>
                        <div>
                          <h6 className="mb-0">Decor Studio</h6>
                          <small className="text-muted">Wedding Decoration</small>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge bg-label-success">Decoration</span></td>
                    <td>Bangalore, Karnataka</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="text-warning">★★★★★</span>
                        <small className="text-muted ms-1">(4.8)</small>
                      </div>
                    </td>
                    <td><span className="badge bg-label-warning">Pending</span></td>
                    <td>2024-01-25</td>
                    <td>
                      <div className="dropdown">
                        <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          Actions
                        </button>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">View</a></li>
                          <li><a className="dropdown-item" href="#">Approve</a></li>
                          <li><a className="dropdown-item" href="#">Reject</a></li>
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
