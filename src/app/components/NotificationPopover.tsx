'use client';
import { useState, useRef, useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

const NotificationPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Dados mockados para exemplo
  const notifications = [
    {
      id: 1,
      title: "Novo quiz criado",
      message: "Você criou um novo quiz de Matemática",
      time: "5 minutos atrás",
    },
    {
      id: 2,
      title: "Alunos entregaram",
      message: "5 alunos entregaram o quiz de História",
      time: "1 hora atrás",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center rounded-full p-2 text-gray-600 hover:bg-gray-100"
      >
        <BellIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-80 rounded-lg bg-white shadow-lg">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Notificações
            </h3>
            <div className="mt-4 space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="rounded-lg border border-gray-200 p-3"
                >
                  <h4 className="font-medium text-gray-800">
                    {notification.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    {notification.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopover;
