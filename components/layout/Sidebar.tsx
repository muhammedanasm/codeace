"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  ChevronLeft,
  X,
  Menu,
} from "lucide-react";
import "./sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  console.log("currentpath", pathname);

  const navItems = [
    {
      icon: <LayoutDashboard size={22} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    { icon: <ShoppingBag size={22} />, label: "Products", path: "/products" },
    { icon: <Users size={22} />, label: "Customers", path: "/customers" },
  ];

  return (
    <>
      <button
        className="mobile-trigger lg-hidden"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu size={24} />
      </button>

      {isMobileOpen && (
        <div
          className="sidebar-overlay lg-hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      <div
        className={`sidebar-container ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"} ${isMobileOpen ? "mobile-show" : "mobile-hide"}`}
      >
        <div className="sidebar-header">
          {!isCollapsed && (
            <div className="logo-section">
              <div className="logo-box">B</div>
              <span className="logo-text">BIGDAY</span>
            </div>
          )}
          <button
            onClick={() =>
              isMobileOpen
                ? setIsMobileOpen(false)
                : setIsCollapsed(!isCollapsed)
            }
            className="toggle-btn"
          >
            {isMobileOpen ? (
              <X size={20} />
            ) : isCollapsed ? (
              <Menu size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        <nav className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsMobileOpen(false)}
            >
              <NavItem
                icon={item.icon}
                label={item.label}
                active={pathname === item.path}
                collapsed={isCollapsed}
              />
            </Link>
          ))}
        </nav>

        <div className="bottom-section">
          <Link href="/settings">
            <NavItem
              icon={<Settings size={22} />}
              label="Settings"
              active={pathname === "/settings"}
              collapsed={isCollapsed}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ icon, label, active, collapsed }: any) => (
  <div
    className={`nav-item-new ${active ? "active-new" : ""} ${collapsed ? "centered-item" : ""}`}
    title={collapsed ? label : ""}
  >
    <div className={`icon-wrapper ${active ? "text-white" : "text-muted"}`}>
      {icon}
    </div>
    {!collapsed && <span className="nav-label">{label}</span>}
  </div>
);

export default Sidebar;
