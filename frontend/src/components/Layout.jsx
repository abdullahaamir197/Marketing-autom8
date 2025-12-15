import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Megaphone, Users, Zap, Settings, Command } from 'lucide-react';
import './Layout.css';

const Layout = () => {
    const location = useLocation();
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
        { icon: Users, label: 'Audiences', path: '/audiences' },
        { icon: Zap, label: 'Automations', path: '/automations' },
    ];

    const getTitle = () => {
        const current = navItems.find((item) => item.path === location.pathname);
        return current ? current.label : 'Dashboard';
    };

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-icon">
                        <Command size={18} />
                    </div>
                    <span className="logo-text">AutoM8</span>
                </div>

                <nav className="nav-menu">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-btn">
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <header className="topbar">
                    <h2 className="page-title">{getTitle()}</h2>
                    <div className="user-profile">
                        {/* Placeholder for user profile if needed */}
                    </div>
                </header>
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
