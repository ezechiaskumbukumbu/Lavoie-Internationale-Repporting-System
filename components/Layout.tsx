import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  LogOut, 
  ChevronDown,
  Shield,
  Church
} from 'lucide-react';
import { User, UserRole } from '../types';
import { NAV_ITEMS, APP_NAME } from '../constants';

interface LayoutProps {
  user: User;
  currentView: string;
  onChangeView: (view: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ 
  user, 
  currentView, 
  onChangeView, 
  onLogout,
  children 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredNavItems = NAV_ITEMS.filter(item => item.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-center h-16 bg-slate-950 px-6 border-b border-slate-800">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="bg-indigo-500 p-1.5 rounded-lg">
              <Church size={20} className="text-white" />
            </div>
            <span className="bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent">
              SNRH Admin
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-slate-800/50 rounded-lg p-3 mb-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <img 
                src={user.avatarUrl} 
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-indigo-500/30"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.entityName}</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => {
                    onChangeView(item.view);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-slate-900">
           <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 px-2">
              <Shield size={12} />
              <span>Google Secure Environment</span>
           </div>
           <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
           >
             <LogOut size={16} /> Déconnexion
           </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shadow-sm relative z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-sm font-medium text-slate-500 hidden sm:block">
              {APP_NAME} / <span className="text-slate-900">{filteredNavItems.find(i => i.view === currentView)?.label}</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="pl-9 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
            
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Main Scrollable Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};