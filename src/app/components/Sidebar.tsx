"use client";

import { useState } from "react";
import {
  HomeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  PlusCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", icon: HomeIcon, href: "/" },
    { name: "Meus Quizzes", icon: DocumentTextIcon, href: "../pages/quizzes" },
    { name: "Estatísticas", icon: ChartBarIcon, href: "../pages/estatisticas" },
    { name: "Criar Quiz", icon: PlusCircleIcon, href: "../pages/criar-quiz" },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex h-full flex-col justify-between py-6">
        <div className="px-4">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h2 className="text-2xl font-bold text-gray-800">QuizConn</h2>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            >
              {isCollapsed ? (
                <ChevronRightIcon className="h-6 w-6" />
              ) : (
                <ChevronLeftIcon className="h-6 w-6" />
              )}
            </button>
          </div>
          <nav className="mt-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                  pathname === item.href ? "bg-gray-100" : ""
                }`}
              >
                <item.icon className="h-6 w-6" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
