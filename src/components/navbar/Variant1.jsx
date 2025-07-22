import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, TrendingUp, Plus, Bell, User, X } from "lucide-react";

// Notification Drawer Component remains unchanged
const NotificationDrawer = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.3 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute bottom-full mb-5 w-80 bg-slate-800/90 backdrop-blur-md rounded-2xl p-4 border border-slate-700"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-white text-lg">Notifications</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="text-center text-slate-400 py-8">
            <Bell size={40} className="mx-auto mb-2" />
            <p>No new notifications</p>
            <p className="text-xs text-slate-500">You're all caught up!</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "trending", icon: TrendingUp, label: "Trending" },
    { id: "add", icon: Plus, label: "Add" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "notifications") {
      setDrawerOpen((prev) => !prev);
    } else {
      setDrawerOpen(false);
    }
  };

  const handleMouseEnter = () => {
    if (isLargeScreen) {
      clearTimeout(closeTimeout);
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (isLargeScreen) {
      const timeout = setTimeout(() => {
        setIsExpanded(false);
      }, 500); // Delay of 1000ms (1 second)
      setCloseTimeout(timeout);
    }
  };

  const expanded = !isLargeScreen || isExpanded;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <NotificationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <motion.div
        className="relative bg-slate-900/80 backdrop-blur-sm rounded-[32px] p-2 shadow-2xl border-slate-700/50"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          paddingLeft: expanded ? 24 : 8,
          paddingRight: expanded ? 24 : 8,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      >
        <div className="flex items-center justify-center">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isVisible = expanded || item.id === activeTab;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                animate={{
                  width: isVisible ? 64 : 0,
                  opacity: isVisible ? 1 : 0,
                  scale: isVisible ? 1 : 0.5,
                  marginRight:
                    index === navItems.length - 1 ? 0 : isVisible ? 8 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                className={`relative h-16 rounded-full flex flex-col items-center justify-center text-slate-400 z-20 ${
                  isActive ? "text-white" : "hover:text-white"
                }`}
              >
                <Icon
                  size={isActive ? 28 : 24}
                  className={`transition-all duration-300 relative z-30 ${
                    isActive ? "translate-x-1 -translate-y-8" : ""
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {isActive && (
                  <div className="absolute -right-1.5 -top-10 w-[68px] h-[68px] pointer-events-none">
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-slate-900 rounded-full z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      style={{ zIndex: 10 }}
                    >
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-4 rounded-full blur-md" />
                    </motion.div>
                  </div>
                )}

                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.1 },
                      }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-2 text-xs font-bold text-white z-30"
                      style={{ transform: "translateY(24px)" }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default BottomNavbar;
