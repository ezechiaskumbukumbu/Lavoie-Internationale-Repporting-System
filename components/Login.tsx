import React from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../constants';
import { Church, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-2xl shadow-lg mb-4">
          <Church size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">SNRH La Voie</h1>
        <p className="text-slate-500 mt-2">Système National de Reporting Hiérarchique</p>
      </div>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Connexion Sécurisée</h2>
            <p className="text-sm text-slate-500 mt-1">Utilisez votre compte Google officiel</p>
          </div>

          <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl transition-all mb-6 group">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Continuer avec Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-400 uppercase font-bold text-xs">Démo Rapide (Dev)</span>
            </div>
          </div>

          <div className="space-y-3">
             {MOCK_USERS.map(u => (
               <button
                key={u.id}
                onClick={() => onLogin(u)}
                className="w-full text-left px-4 py-3 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all flex items-center gap-3 group"
               >
                 <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 group-hover:bg-indigo-200 group-hover:text-indigo-700">
                   {u.role.charAt(0)}
                 </div>
                 <div>
                   <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-800">{u.name}</p>
                   <p className="text-xs text-slate-500">{u.role}</p>
                 </div>
               </button>
             ))}
          </div>
        </div>
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck size={14} />
          <span>Accès monitoré et audité • v1.0.4</span>
        </div>
      </div>
    </div>
  );
};