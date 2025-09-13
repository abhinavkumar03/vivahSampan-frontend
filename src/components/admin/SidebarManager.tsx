'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export interface SidebarMenuItem {
  id: string;
  title: string;
  icon: string;
  href: string;
  badge?: string | number;
  children?: SidebarMenuItem[];
  permission?: string;
}

interface SidebarManagerProps {
  onMenuToggle?: (isOpen: boolean) => void;
}

export default function SidebarManager({ onMenuToggle }: SidebarManagerProps) {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');

  // Define menu items based on user role and permissions
  const getMenuItems = (): SidebarMenuItem[] => {
    const baseItems: SidebarMenuItem[] = [
      {
        id: 'dashboard',
        title: 'Dashboard',
        icon: 'bx bx-home-circle',
        href: '/admin-dashboard',
      },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        {
          id: 'users',
          title: 'User Management',
          icon: 'bx bx-user',
          href: '/admin-users',
          children: [
            {
              id: 'users-list',
              title: 'All Users',
              icon: 'bx bx-list-ul',
              href: '/admin-users',
            },
            {
              id: 'users-roles',
              title: 'User Roles',
              icon: 'bx bx-shield',
              href: '/admin-users/roles',
            },
          ],
        },
        {
          id: 'vendors',
          title: 'Vendor Management',
          icon: 'bx bx-store',
          href: '/admin-vendors',
          children: [
            {
              id: 'vendors-list',
              title: 'All Vendors',
              icon: 'bx bx-list-ul',
              href: '/admin-vendors',
            },
            {
              id: 'vendors-pending',
              title: 'Pending Approval',
              icon: 'bx bx-time-five',
              href: '/admin-vendors/pending',
              badge: '12', // This could be dynamic
            },
            {
              id: 'vendors-categories',
              title: 'Categories',
              icon: 'bx bx-category',
              href: '/admin-vendors/categories',
            },
          ],
        },
        {
          id: 'media',
          title: 'Media Management',
          icon: 'bx bx-photo-album',
          href: '/admin/media',
          children: [
            {
              id: 'media-gallery',
              title: 'Media Gallery',
              icon: 'bx bx-images',
              href: '/admin/media',
            },
            {
              id: 'media-upload',
              title: 'Upload Media',
              icon: 'bx bx-cloud-upload',
              href: '/admin/media/upload',
            },
          ],
        },
        {
          id: 'events',
          title: 'Events',
          icon: 'bx bx-calendar',
          href: '/admin/events',
          children: [
            {
              id: 'events-list',
              title: 'All Events',
              icon: 'bx bx-list-ul',
              href: '/admin/events',
            },
            {
              id: 'events-upcoming',
              title: 'Upcoming',
              icon: 'bx bx-time',
              href: '/admin/events/upcoming',
            },
          ],
        },
        {
          id: 'reports',
          title: 'Reports & Analytics',
          icon: 'bx bx-bar-chart-alt-2',
          href: '/admin/reports',
          children: [
            {
              id: 'reports-dashboard',
              title: 'Analytics',
              icon: 'bx bx-trending-up',
              href: '/admin/reports',
            },
            {
              id: 'reports-users',
              title: 'User Reports',
              icon: 'bx bx-user-check',
              href: '/admin/reports/users',
            },
            {
              id: 'reports-vendors',
              title: 'Vendor Reports',
              icon: 'bx bx-store-alt',
              href: '/admin/reports/vendors',
            },
          ],
        },
        {
          id: 'settings',
          title: 'Settings',
          icon: 'bx bx-cog',
          href: '/admin/settings',
          children: [
            {
              id: 'settings-general',
              title: 'General',
              icon: 'bx bx-cog',
              href: '/admin/settings',
            },
            {
              id: 'settings-notifications',
              title: 'Notifications',
              icon: 'bx bx-bell',
              href: '/admin/settings/notifications',
            },
            {
              id: 'settings-system',
              title: 'System',
              icon: 'bx bx-server',
              href: '/admin/settings/system',
            },
          ],
        },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  useEffect(() => {
    // Set active menu based on current path
    const path = window.location.pathname;
    const activeItem = menuItems.find(item => 
      item.href === path || 
      item.children?.some(child => child.href === path)
    );
    if (activeItem) {
      setActiveMenu(activeItem.id);
    }
  }, [menuItems]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onMenuToggle?.(!isCollapsed);
  };

  const renderMenuItem = (item: SidebarMenuItem) => {
    const isActive = activeMenu === item.id;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <li key={item.id} className={`menu-item ${isActive ? 'active' : ''} ${hasChildren ? 'menu-item-submenu' : ''}`}>
        <a 
          href={item.href} 
          className="menu-link"
          onClick={(e) => {
            if (!hasChildren) {
              setActiveMenu(item.id);
            }
          }}
        >
          <i className={`menu-icon tf-icons ${item.icon}`}></i>
          <div data-i18n={item.title}>{item.title}</div>
          {item.badge && (
            <span className="badge rounded-pill bg-label-primary ms-auto">
              {item.badge}
            </span>
          )}
        </a>
        
        {hasChildren && (
          <ul className="menu-sub">
            {item.children?.map(child => (
              <li key={child.id} className={`menu-item ${window.location.pathname === child.href ? 'active' : ''}`}>
                <a href={child.href} className="menu-link">
                  <i className={`menu-icon tf-icons ${child.icon}`}></i>
                  <div data-i18n={child.title}>{child.title}</div>
                  {child.badge && (
                    <span className="badge rounded-pill bg-label-primary ms-auto">
                      {child.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside 
      id="layout-menu" 
      className={`layout-menu menu-vertical menu bg-menu-theme ${isCollapsed ? 'menu-collapsed' : ''}`}
    >
      {/* App Brand */}
      <div className="app-brand demo">
        <a href="/admin-dashboard" className="app-brand-link">
          <span className="app-brand-logo demo">
            <svg width="25" viewBox="0 0 25 42" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2308145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0014999 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z" id="path-1"></path>
                <path d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z" id="path-3"></path>
                <path d="M7.50063644,21.2294429 L12.2034074,19.2142049 C12.6407892,19.0039812 12.8817571,18.4906097 12.6705334,18.053228 C12.4593097,17.6158462 11.9459382,17.3748783 11.5085565,17.586102 L6.80578553,19.6013401 C6.36840379,19.8115638 6.12743584,20.3249353 6.33865953,20.762317 C6.54988322,21.1996987 7.06325476,21.4406666 7.50063644,21.2294429 Z" id="path-4"></path>
                <path d="M7.50063644,21.2294429 L12.2034074,19.2142049 C12.6407892,19.0039812 12.8817571,18.4906097 12.6705334,18.053228 C12.4593097,17.6158462 11.9459382,17.3748783 11.5085565,17.586102 L6.80578553,19.6013401 C6.36840379,19.8115638 6.12743584,20.3249353 6.33865953,20.762317 C6.54988322,21.1996987 7.06325476,21.4406666 7.50063644,21.2294429 Z" id="path-5"></path>
              </defs>
              <g id="g-app-brand" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Brand-Logo" transform="translate(-27.000000, -15.000000)">
                  <g id="Icon" transform="translate(27.000000, 15.000000)">
                    <g id="Mask" transform="translate(0.000000, 8.000000)">
                      <mask id="mask-2" fill="white">
                        <use xlinkHref="#path-1"></use>
                      </mask>
                      <use fill="#696cff" xlinkHref="#path-1"></use>
                      <g id="Path-3" mask="url(#mask-2)">
                        <use fill="#696cff" xlinkHref="#path-3"></use>
                        <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-3"></use>
                      </g>
                      <g id="Path-4" mask="url(#mask-2)">
                        <use fill="#696cff" xlinkHref="#path-4"></use>
                        <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-4"></use>
                      </g>
                    </g>
                    <g id="Triangle" transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000)">
                      <use fill="#696cff" xlinkHref="#path-5"></use>
                      <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-5"></use>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </span>
          {!isCollapsed && <span className="app-brand-text demo menu-text fw-bolder ms-2">VivahSampan</span>}
        </a>
        <a href="#" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none" onClick={toggleCollapse}>
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>

      {/* Menu Items */}
      <ul className="menu-inner py-1">
        {menuItems.map(renderMenuItem)}
      </ul>

      {/* Collapse Toggle Button */}
      <div className="menu-toggle-btn">
        <button 
          className="btn btn-link menu-toggle" 
          onClick={toggleCollapse}
          title={isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
        >
          <i className={`bx ${isCollapsed ? 'bx-chevron-right' : 'bx-chevron-left'}`}></i>
        </button>
      </div>
    </aside>
  );
}
