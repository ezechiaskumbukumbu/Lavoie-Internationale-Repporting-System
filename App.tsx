import React, { useState } from 'react';
import { User, Report } from './types';
import { MOCK_REPORTS } from './constants';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ReportList } from './components/ReportList';
import { ReportForm } from './components/ReportForm';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);

  const handleLogin = (u: User) => {
    setUser(u);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSaveReport = (partialReport: Partial<Report>) => {
    const newReport: Report = {
      ...partialReport,
      id: Math.random().toString(36).substr(2, 9),
      period: `Semaine ${getWeekNumber(new Date())} - ${new Date().getFullYear()}`,
      history: [{
        date: new Date().toISOString(),
        action: 'Création',
        user: user?.name || 'Inconnu'
      }]
    } as Report;

    setReports([newReport, ...reports]);
    setCurrentView('reports');
  };

  // Helper for week number
  const getWeekNumber = (d: Date) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
    return weekNo;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      user={user} 
      currentView={currentView} 
      onChangeView={setCurrentView}
      onLogout={handleLogout}
    >
      {currentView === 'dashboard' && (
        <Dashboard user={user} reports={reports} />
      )}
      
      {currentView === 'reports' && (
        <ReportList 
          reports={reports} 
          userRole={user.role} 
          onCreateNew={() => setCurrentView('report-new')} 
        />
      )}

      {currentView === 'report-new' && (
        <ReportForm 
          user={user} 
          onSave={handleSaveReport}
          onCancel={() => setCurrentView('reports')}
        />
      )}

      {currentView === 'users' && (
        <div className="p-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
           <p className="text-slate-500">Module de gestion des utilisateurs (Admin Section & Super Admin uniquement).</p>
        </div>
      )}

      {currentView === 'audit' && (
        <div className="p-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
           <p className="text-slate-500">Module d'Audit Logs et Gouvernance (Super Admin uniquement).</p>
        </div>
      )}
    </Layout>
  );
}

export default App;