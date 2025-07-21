import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Github,
  Home,
  Bookmark,
  Users,
  Bell,
  Tv,
  Film,
  Gamepad2,
  Settings,
  LogOut,
  ChevronRight,
  X,
  ArrowLeft,
  User,
  Shield,
  HelpCircle,
  Linkedin,
  Signature,
} from "lucide-react";

// --- DATA STRUCTURES ---
// We add a 'submenu' array to items that have a drill-down menu.
const menuItems = [
  {
    section: "MENU",
    items: [
      {
        name: "Browse",
        icon: Home,
        hasArrow: true,
        submenu: [
          { name: "Home", icon: Home },
          { name: "New & Popular", icon: Bell },
          { name: "My List", icon: Bookmark },
        ],
      },
      { name: "Watchlist", icon: Bookmark },
      { name: "Friends", icon: Users },
      { name: "Notifications", icon: Bell, notification: 2 },
    ],
  },
  {
    section: "CATEGORY",
    items: [
      { name: "TV-Shows", icon: Tv },
      { name: "Movies", icon: Film },
      { name: "Games", icon: Gamepad2, tag: "New" },
    ],
  },
  {
    section: "GENERAL",
    items: [
      { name: "Settings", icon: Settings },
      { name: "Log Out", icon: LogOut },
    ],
  },
];

// Separate data for the profile submenu
const profileMenu = {
  name: "Kailash",
  items: [
    { name: "Manage Profiles", icon: Users },
    { name: "Account", icon: User },
    { name: "Privacy & Security", icon: Shield },
    { name: "Help Center", icon: HelpCircle },
  ],
};

// --- ANIMATION VARIANTS ---
const mainMenuVariants = {
  initial: { x: 0 },
  exit: { x: "-100%", transition: { duration: 0.3, ease: "easeInOut" } },
};

const submenuVariants = {
  initial: { x: "100%" },
  animate: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  exit: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
};

const SOCIAL_LINKS = {
  github: "https://github.com/NotAbdullah87",
  linkedin: "https://pk.linkedin.com/in/abdullah-shakir-107583217",
  portfolio: "https://abdullah-shakir.vercel.app/",
};

export const SidebarVariant1 = ({ isOpen, setIsOpen }) => {
  const [activeItem, setActiveItem] = useState("Browse");
  const [activeSubItem, setActiveSubItem] = useState("Home"); // For submenu items
  const [openSubmenu, setOpenSubmenu] = useState(null); // Track which submenu is open

  // Determine which submenu data to show
  const getSubmenuData = () => {
    if (!openSubmenu) return null;
    if (openSubmenu === "Profile") return profileMenu;
    const menuItem = menuItems
      .flatMap((g) => g.items)
      .find((i) => i.name === openSubmenu);
    return menuItem ? { name: menuItem.name, items: menuItem.submenu } : null;
  };

  const currentSubmenu = getSubmenuData();

  const handleMenuClick = (item) => {
    setActiveItem(item.name);
    if (item.submenu) {
      setOpenSubmenu(item.name);
    } else {
      setOpenSubmenu(null); // Close submenu if item has no submenu
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div /* Backdrop */
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />

          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 left-0 h-full w-72 bg-gray-950/70 backdrop-blur-xl border-r border-white/5 flex flex-col z-50 md:h-[calc(100vh-4rem)] md:left-8 md:top-8 md:rounded-2xl overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {currentSubmenu ? (
                // --- SUBMENU VIEW ---
                <motion.div
                  key="submenu"
                  variants={submenuVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="flex items-center gap-4 p-4 border-b border-white/5">
                    <button
                      onClick={() => setOpenSubmenu(null)}
                      className="p-1 rounded-full hover:bg-white/10"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <h2 className="font-semibold text-lg">
                      {currentSubmenu.name}
                    </h2>
                  </div>
                  <ul className="p-3.5 space-y-1">
                    {currentSubmenu.items.map((item) => {
                      const isSubActive = activeSubItem === item.name;
                      return (
                        <li key={item.name}>
                          <a
                            href="#"
                            onClick={() => setActiveSubItem(item.name)}
                            className={`flex items-center gap-4 p-2.5 rounded-lg transition-colors duration-200 group ${
                              isSubActive ? "bg-white/10" : "hover:bg-white/5"
                            }`}
                          >
                            <item.icon
                              size={20}
                              className={`min-w-5 transition-colors ${
                                isSubActive
                                  ? "text-white"
                                  : "text-gray-400 group-hover:text-white"
                              }`}
                            />
                            <span
                              className={`transition-colors ${
                                isSubActive
                                  ? "text-white font-medium"
                                  : "text-gray-300 group-hover:text-white"
                              }`}
                            >
                              {item.name}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ) : (
                // --- MAIN MENU VIEW ---
                <motion.div
                  key="main-menu"
                  variants={mainMenuVariants}
                  exit="exit"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      </div>
                      <h1 className="text-lg font-semibold tracking-widest text-white">
                        LOGO
                      </h1>
                    </div>
                    <LayoutGrid size={20} className="text-gray-400" />
                  </div>

                  {/* Menu Items */}
                  <div className="flex-grow p-3.5 overflow-y-auto">
                    {menuItems.map((group) => (
                      <div key={group.section} className="mb-6">
                        <h2 className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3 ml-2">
                          {group.section}
                        </h2>
                        <ul className="space-y-1">
                          {group.items.map((item) => {
                            const isActive = activeItem === item.name;
                            return (
                              <li key={item.name} className="relative">
                                <a
                                  href="#"
                                  onClick={() => handleMenuClick(item)}
                                  className={`flex items-center gap-4 p-2.5 rounded-lg transition-colors duration-200 group ${
                                    isActive
                                      ? "bg-white/10"
                                      : "hover:bg-white/5"
                                  }`}
                                >
                                  {isActive && (
                                    <motion.div
                                      layoutId="active-pill"
                                      className="absolute left-0 w-1.5 h-7 bg-red-500 rounded-full"
                                      style={{
                                        boxShadow: "0 0 10px 1px #ef4444",
                                      }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 30,
                                      }}
                                    />
                                  )}
                                  <item.icon
                                    size={20}
                                    className={`min-w-5 ml-2 transition-colors ${
                                      isActive
                                        ? "text-white"
                                        : "text-gray-400 group-hover:text-white"
                                    }`}
                                  />
                                  <span
                                    className={`transition-colors ${
                                      isActive
                                        ? "text-white font-medium"
                                        : "text-gray-300 group-hover:text-white"
                                    }`}
                                  >
                                    {item.name}
                                  </span>
                                  {item.notification && (
                                    <span className="ml-auto text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                      {item.notification}
                                    </span>
                                  )}
                                  {item.tag && (
                                    <span className="ml-auto text-xs bg-teal-400/20 text-teal-300 px-2 py-0.5 rounded-full font-medium">
                                      {item.tag}
                                    </span>
                                  )}
                                  {item.hasArrow && (
                                    <ChevronRight
                                      size={16}
                                      className="ml-auto text-gray-500"
                                    />
                                  )}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* User Profile */}
                  <div className="p-4 mt-auto border-t border-white/5">
                    <a
                      href="#"
                      onClick={() => setOpenSubmenu("Profile")}
                      className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-white/5"
                    >
                      <img
                        src="https://avatars.githubusercontent.com/u/115102771"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-white">
                          NotAbdullah87
                        </p>
                        <p className="text-xs text-gray-400">
                          Restricted Account
                        </p>
                      </div>
                      <ChevronRight
                        size={16}
                        className="ml-auto text-gray-500"
                      />
                    </a>
                  </div>

                  {/* Footer with social links */}
                  <div className="p-4 px-12 border-t border-white/5 mt-auto">
                    <div className="flex items-center justify-between">
                      <a
                        href={SOCIAL_LINKS.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href={SOCIAL_LINKS.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition"
                      >
                       <Linkedin />
                      </a>
                      <a
                        href={SOCIAL_LINKS.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition"
                      >
                        <Signature />
                      </a>
                    </div>
                  </div>
  {/* Footer with copyright */}
  <div className="p-4 border-t border-white/5 mt-auto text-center">
                    <p className="text-xs text-gray-500">
                      &copy; {new Date().getFullYear()} Abdullah Shakir.
                    </p>
                  </div>
                  
                </motion.div>
              )}

            
            </AnimatePresence>
          </motion.nav>

          
        </>
      )}
    </AnimatePresence>
  );
};
