import { UserRole, ReportStatus, Report, User } from './types';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  ShieldCheck, 
  BarChart3 
} from 'lucide-react';

export const APP_NAME = "SNRH - La Voie Internationale";

// Mock Users for Dev/Demo Switching
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Apôtre Paul (IT)',
    email: 'admin@lavoie.org',
    role: UserRole.SUPER_ADMIN,
    entityName: 'Direction Nationale',
    avatarUrl: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: 'u2',
    name: 'Pasteur Pierre',
    email: 'section.kin@lavoie.org',
    role: UserRole.SECTION_ADMIN,
    entityName: 'Section Kinshasa',
    avatarUrl: 'https://picsum.photos/100/100?random=2'
  },
  {
    id: 'u3',
    name: 'Frère Jacques',
    email: 'coord.paix@lavoie.org',
    role: UserRole.COMMUNION_COORD,
    entityName: 'Communion Maison de Paix',
    avatarUrl: 'https://picsum.photos/100/100?random=3'
  }
];

// Mock Reports
export const MOCK_REPORTS: Report[] = [
  {
    id: 'r1',
    entityName: 'Communion Maison de Paix',
    period: 'Semaine 40 - 2024',
    authorId: 'u3',
    status: ReportStatus.CONFIRMED,
    submissionDate: '2024-10-02T10:30:00Z',
    attendance: { men: 45, women: 60, children: 25, visitors: 5 },
    financials: { francCongolais: 150000, dollars: 50 },
    notes: 'Réunion puissante, 2 nouveaux convertis.',
    history: [{ date: '2024-10-02T10:30:00Z', action: 'Création', user: 'Frère Jacques' }]
  },
  {
    id: 'r2',
    entityName: 'Communion Grâce',
    period: 'Semaine 40 - 2024',
    authorId: 'u4',
    status: ReportStatus.TRANSMITTED,
    submissionDate: '2024-10-03T09:15:00Z',
    attendance: { men: 30, women: 40, children: 15, visitors: 2 },
    financials: { francCongolais: 85000, dollars: 20 },
    notes: 'Rien à signaler.',
    history: []
  },
  {
    id: 'r3',
    entityName: 'Communion Maison de Paix',
    period: 'Semaine 41 - 2024',
    authorId: 'u3',
    status: ReportStatus.DRAFT,
    submissionDate: '2024-10-09T08:00:00Z',
    attendance: { men: 42, women: 58, children: 20, visitors: 0 },
    financials: { francCongolais: 120000, dollars: 40 },
    notes: 'Brouillon en cours de saisie.',
    history: []
  }
];

export const NAV_ITEMS = [
  { label: 'Tableau de bord', view: 'dashboard', icon: LayoutDashboard, roles: [UserRole.SUPER_ADMIN, UserRole.SECTION_ADMIN, UserRole.SECTEUR_ADMIN, UserRole.RAMEAU_ADMIN, UserRole.COMMUNION_COORD] },
  { label: 'Rapports', view: 'reports', icon: FileText, roles: [UserRole.SUPER_ADMIN, UserRole.SECTION_ADMIN, UserRole.SECTEUR_ADMIN, UserRole.RAMEAU_ADMIN, UserRole.COMMUNION_COORD] },
  { label: 'Statistiques', view: 'stats', icon: BarChart3, roles: [UserRole.SUPER_ADMIN, UserRole.SECTION_ADMIN, UserRole.SECTEUR_ADMIN] },
  { label: 'Utilisateurs', view: 'users', icon: Users, roles: [UserRole.SUPER_ADMIN, UserRole.SECTION_ADMIN] },
  { label: 'Gouvernance', view: 'audit', icon: ShieldCheck, roles: [UserRole.SUPER_ADMIN] },
  { label: 'Paramètres', view: 'settings', icon: Settings, roles: [UserRole.SUPER_ADMIN, UserRole.COMMUNION_COORD] },
];