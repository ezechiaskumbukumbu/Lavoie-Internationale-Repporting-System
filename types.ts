import React from 'react';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN', // National IT / Gouvernance
  SECTION_ADMIN = 'SECTION_ADMIN',
  SECTEUR_ADMIN = 'SECTEUR_ADMIN',
  RAMEAU_ADMIN = 'RAMEAU_ADMIN',
  COMMUNION_COORD = 'COMMUNION_COORD' // Coordonnateur / Secrétaire
}

export enum ReportStatus {
  DRAFT = 'BROUILLON',
  CONFIRMED = 'CONFIRMÉ',
  TRANSMITTED = 'TRANSMIS',
  ARCHIVED = 'ARCHIVÉ'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  entityName: string; // e.g., "Communion Maison de Paix" or "Section Kinshasa"
  avatarUrl?: string;
}

export interface FinancialData {
  francCongolais: number;
  dollars: number;
}

export interface AttendanceData {
  men: number;
  women: number;
  children: number;
  visitors: number;
}

export interface Report {
  id: string;
  entityName: string;
  period: string; // e.g., "Semaine 42 - 2024"
  authorId: string;
  status: ReportStatus;
  submissionDate: string;
  attendance: AttendanceData;
  financials: FinancialData;
  notes: string;
  history: { date: string; action: string; user: string }[];
}

export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number; // percentage
  icon: React.ComponentType<any>;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

export interface NavigationItem {
  label: string;
  view: string;
  icon: React.ComponentType<any>;
  roles: UserRole[];
}