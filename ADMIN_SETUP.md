# Admin Template Integration

This document describes the admin template integration for the VivahSampan frontend project.

## Overview

The admin template has been successfully integrated into the Next.js project with role-based access control. Users with the `admin` role will be automatically redirected to the admin dashboard.

## Features Implemented

### 1. Role-Based Routing
- **Admin Users**: Automatically redirected to `/admin` dashboard
- **Regular Users**: Stay on the regular `/dashboard` 
- **Unauthenticated Users**: Redirected to `/login`

### 2. Admin Template Assets
The admin template assets are located in `/public/assets/` and include:
- CSS files for styling
- JavaScript libraries for functionality
- Icons and fonts
- Vendor libraries (Bootstrap, jQuery, etc.)

### 3. Admin Layout Structure
- **Sidebar Navigation**: Menu with dashboard, users, vendors, media, reports, and settings
- **Top Navigation**: Search bar and user profile dropdown
- **Content Area**: Main content area for admin pages
- **Footer**: Admin template footer

### 4. Admin Pages Created
- `/admin` - Main dashboard with statistics and charts
- `/admin/users` - User management page
- `/admin/vendors` - Vendor management page

## File Structure

```
src/
├── app/
│   ├── (admin)/                 # Admin route group
│   │   ├── layout.tsx          # Admin layout wrapper
│   │   ├── page.tsx            # Admin dashboard
│   │   ├── users/
│   │   │   └── page.tsx        # Users management
│   │   └── vendors/
│   │       └── page.tsx        # Vendors management
│   └── (app)/                  # Regular app routes
│       ├── layout.tsx          # Updated with role checking
│       └── dashboard/
│           └── page.tsx        # Updated with role checking
├── components/
│   └── admin/
│       ├── AdminLayout.tsx     # Main admin layout component
│       └── ScriptLoader.tsx    # Script loading utility
└── hooks/
    └── useAdminTemplate.ts     # Admin template hook (optional)
```

## Key Components

### AdminLayout.tsx
- Main layout component for admin pages
- Includes sidebar, navbar, and content areas
- Handles role-based access control
- Loads admin template scripts

### ScriptLoader.tsx
- Utility component for loading admin template JavaScript files
- Ensures proper script loading order
- Handles cleanup on unmount

## Role-Based Access Control

The system automatically checks user roles and redirects accordingly:

1. **Login Process**: User logs in and role is stored in the user object
2. **Route Protection**: Each layout checks the user role
3. **Automatic Redirect**: Admin users are redirected to `/admin`
4. **Access Control**: Admin layout only renders for users with `admin` role

## Admin Template Features

### Dashboard
- Statistics cards showing total users, vendors, events, and revenue
- Charts and analytics (ready for data integration)
- Recent activity feed
- Quick action buttons

### User Management
- Table view of all users
- User status and role management
- Action buttons for user operations

### Vendor Management
- Statistics for vendor metrics
- Vendor listing with categories and ratings
- Approval workflow for new vendors

## Customization

### Adding New Admin Pages
1. Create a new folder in `/src/app/(admin)/`
2. Add a `page.tsx` file with your admin page content
3. The page will automatically use the admin layout

### Modifying Navigation
Edit the sidebar navigation in `AdminLayout.tsx`:
```tsx
<li className="menu-item">
  <a href="/admin/your-page" className="menu-link">
    <i className="menu-icon tf-icons bx bx-your-icon"></i>
    <div data-i18n="Your Page">Your Page</div>
  </a>
</li>
```

### Adding Scripts
Add new JavaScript files to the `adminScripts` array in `AdminLayout.tsx`:
```tsx
const adminScripts = [
  // ... existing scripts
  '/assets/js/your-custom-script.js'
];
```

## Assets Location

All admin template assets are located in `/public/assets/`:
- `/public/assets/css/` - Custom CSS files
- `/public/assets/js/` - JavaScript files
- `/public/assets/vendor/` - Third-party libraries
- `/public/assets/img/` - Images and icons

## Usage

1. **For Admin Users**: Login and you'll be automatically redirected to `/admin`
2. **For Regular Users**: Login and you'll stay on the regular `/dashboard`
3. **Development**: Run `npm run dev` and navigate to `/admin` to test

## Notes

- The admin template uses Bootstrap 5 and jQuery
- All admin pages are wrapped with the admin layout automatically
- Scripts are loaded asynchronously to avoid blocking the UI
- The layout is responsive and includes mobile navigation
- Role checking happens at the layout level for security

## Future Enhancements

- Add more admin pages (reports, settings, etc.)
- Implement data tables with sorting and filtering
- Add charts and analytics integration
- Implement bulk operations for users/vendors
- Add notification system
- Implement dark/light theme toggle
