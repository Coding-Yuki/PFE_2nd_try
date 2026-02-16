'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Users, Settings, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Fil', href: '/', icon: Home },
  { name: 'Profil', href: '/profile/me', icon: User },
  { name: 'Camarades', href: '/classmates', icon: Users },
  { name: 'Paramètres', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/register';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 h-fit sticky top-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-600">UniSocial</h1>
      </div>
      
      <nav>
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.name === 'Profil' && pathname.startsWith('/profile/'));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 text-base font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2.5 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}
