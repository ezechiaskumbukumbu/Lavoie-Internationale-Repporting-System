import React, { useState } from 'react';
import { Save, Send, AlertCircle, Calculator } from 'lucide-react';
import { Report, ReportStatus, User } from '../types';

interface ReportFormProps {
  user: User;
  onSave: (report: Partial<Report>) => void;
  onCancel: () => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    men: 0,
    women: 0,
    children: 0,
    visitors: 0,
    fc: 0,
    usd: 0,
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.men < 0) newErrors.men = "Valeur invalide";
    if (formData.women < 0) newErrors.women = "Valeur invalide";
    if (formData.fc < 0) newErrors.fc = "Ne peut être négatif";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (status: ReportStatus) => {
    if (!validate()) return;
    
    onSave({
      status,
      entityName: user.entityName,
      attendance: {
        men: formData.men,
        women: formData.women,
        children: formData.children,
        visitors: formData.visitors
      },
      financials: {
        francCongolais: formData.fc,
        dollars: formData.usd
      },
      notes: formData.notes,
      submissionDate: new Date().toISOString(),
      authorId: user.id
    });
  };

  const totalPeople = (formData.men || 0) + (formData.women || 0) + (formData.children || 0) + (formData.visitors || 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in max-w-4xl mx-auto">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Nouveau Rapport Hebdomadaire</h2>
          <p className="text-sm text-slate-500">{user.entityName}</p>
        </div>
        <div className="text-sm text-slate-500 font-mono bg-white px-2 py-1 rounded border">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Section Présence */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
            Statistiques de Présence
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hommes</label>
              <input 
                type="number" 
                min="0"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.men}
                onChange={(e) => setFormData({...formData, men: parseInt(e.target.value) || 0})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Femmes</label>
              <input 
                type="number" 
                min="0"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.women}
                onChange={(e) => setFormData({...formData, women: parseInt(e.target.value) || 0})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Enfants</label>
              <input 
                type="number" 
                min="0"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.children}
                onChange={(e) => setFormData({...formData, children: parseInt(e.target.value) || 0})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Visiteurs</label>
              <input 
                type="number" 
                min="0"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.visitors}
                onChange={(e) => setFormData({...formData, visitors: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>
          <div className="mt-2 bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium inline-flex items-center">
            <Calculator size={14} className="mr-2" /> Total Présence: {totalPeople}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Section Finances */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-green-600 rounded-full"></span>
            Finances (P.Ab)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">Franc Congolais (FC)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">FC</span>
                <input 
                  type="number" 
                  min="0"
                  className="w-full pl-10 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  value={formData.fc}
                  onChange={(e) => setFormData({...formData, fc: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">Dollars (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
                <input 
                  type="number" 
                  min="0"
                  className="w-full pl-10 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  value={formData.usd}
                  onChange={(e) => setFormData({...formData, usd: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Notes */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-purple-600 rounded-full"></span>
            Informations & Remarques
          </h3>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder="Événements marquants, témoignages, problèmes techniques..."
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          ></textarea>
          <p className="text-xs text-slate-400 mt-2 flex items-center">
            <AlertCircle size={12} className="mr-1" />
            Ces informations seront lues par l'administration du Rameau et de la Section.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col-reverse md:flex-row justify-between gap-4">
        <button 
          onClick={onCancel}
          className="px-4 py-2 text-slate-600 font-medium hover:text-slate-800 transition-colors"
        >
          Annuler
        </button>
        <div className="flex gap-3">
          <button 
            onClick={() => handleSave(ReportStatus.DRAFT)}
            className="flex-1 md:flex-none px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-white hover:shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Enregistrer Brouillon
          </button>
          <button 
            onClick={() => handleSave(ReportStatus.CONFIRMED)}
            className="flex-1 md:flex-none px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Confirmer & Transmettre
          </button>
        </div>
      </div>
    </div>
  );
};