import React from 'react';
import { Report, ReportStatus, UserRole } from '../types';
import { Edit2, Eye, FileText, Download } from 'lucide-react';

interface ReportListProps {
  reports: Report[];
  userRole: UserRole;
  onCreateNew: () => void;
}

export const ReportList: React.FC<ReportListProps> = ({ reports, userRole, onCreateNew }) => {
  
  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.DRAFT: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case ReportStatus.CONFIRMED: return 'bg-blue-100 text-blue-800 border-blue-200';
      case ReportStatus.TRANSMITTED: return 'bg-purple-100 text-purple-800 border-purple-200';
      case ReportStatus.ARCHIVED: return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isCoordinator = userRole === UserRole.COMMUNION_COORD;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Rapports</h2>
          <p className="text-slate-500 text-sm">Gestion et historique des rapports ecclésiastiques</p>
        </div>
        {isCoordinator && (
          <button 
            onClick={onCreateNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Edit2 size={16} />
            Saisir un rapport
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Période</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Entité</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Présence Total</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Offrandes (FC)</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded text-slate-600">
                        <FileText size={18} />
                      </div>
                      <span className="font-medium text-slate-700">{report.period}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{report.entityName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {report.attendance.men + report.attendance.women + report.attendance.children + report.attendance.visitors}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                    {report.financials.francCongolais.toLocaleString()} FC
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded transition-colors" title="Voir">
                        <Eye size={18} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded transition-colors" title="Télécharger PDF">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {reports.length === 0 && (
          <div className="p-12 text-center text-slate-400 bg-slate-50/50">
            <FileText size={48} className="mx-auto mb-4 opacity-20" />
            <p>Aucun rapport trouvé pour cette période.</p>
          </div>
        )}
      </div>
    </div>
  );
};