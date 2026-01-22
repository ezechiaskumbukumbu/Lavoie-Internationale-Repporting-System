import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  Users, 
  DollarSign, 
  FileCheck, 
  Activity 
} from 'lucide-react';
import { User, UserRole, Report } from '../types';

interface DashboardProps {
  user: User;
  reports: Report[];
}

const dataAttendance = [
  { name: 'Sem 37', hommes: 40, femmes: 55, enfants: 20 },
  { name: 'Sem 38', hommes: 45, femmes: 58, enfants: 22 },
  { name: 'Sem 39', hommes: 38, femmes: 60, enfants: 25 },
  { name: 'Sem 40', hommes: 48, femmes: 65, enfants: 28 },
  { name: 'Sem 41', hommes: 50, femmes: 62, enfants: 30 },
];

const dataFinancials = [
  { name: 'Sem 37', fc: 120000, usd: 40 },
  { name: 'Sem 38', fc: 135000, usd: 45 },
  { name: 'Sem 39', fc: 110000, usd: 35 },
  { name: 'Sem 40', fc: 150000, usd: 50 },
  { name: 'Sem 41', fc: 160000, usd: 55 },
];

export const Dashboard: React.FC<DashboardProps> = ({ user, reports }) => {
  const isCommunion = user.role === UserRole.COMMUNION_COORD;
  
  // Quick calculations based on mock data
  const totalReports = reports.length;
  const confirmedReports = reports.filter(r => r.status !== 'BROUILLON').length;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isCommunion ? 'Tableau de bord local' : 'Supervision Nationale'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {user.entityName} • {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
            <FileCheck size={16} />
            Générer Rapport Global
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Fidèles (Moy)</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">142</h3>
            <span className="text-green-600 text-xs font-medium flex items-center mt-2">
              <Activity size={12} className="mr-1" /> +5.2% vs sem. dernière
            </span>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Users className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">P.Ab (Total USD)</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">$225</h3>
            <span className="text-green-600 text-xs font-medium flex items-center mt-2">
              <Activity size={12} className="mr-1" /> Stable
            </span>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <DollarSign className="text-green-600" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Rapports Soumis</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{confirmedReports} / {totalReports}</h3>
            <span className="text-orange-600 text-xs font-medium flex items-center mt-2">
              1 en attente
            </span>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <FileCheck className="text-orange-600" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Taux de Conformité</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">98%</h3>
            <span className="text-slate-400 text-xs mt-2 block">Délai respecté</span>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <Users className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Évolution des Présences</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataAttendance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                  cursor={{fill: '#f1f5f9'}}
                />
                <Legend iconType="circle" />
                <Bar dataKey="hommes" name="Hommes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="femmes" name="Femmes" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="enfants" name="Enfants" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Tendances Financières (FC vs USD)</h3>
           <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataFinancials}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="fc" name="Francs Congolais" stroke="#f59e0b" strokeWidth={2} dot={{r: 4}} />
                <Line yAxisId="right" type="monotone" dataKey="usd" name="Dollars USD" stroke="#10b981" strokeWidth={2} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};