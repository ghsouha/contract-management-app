'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Contrat {
  id: number;
  numero: string;
  client: string;
  type: string;
  debut: string;
  fin: string;
  montant: string;
  statut: string;
  titre?: string;
  description?: string;
}

interface ContratsContextType {
  contrats: Contrat[];
  addContrat: (contrat: Omit<Contrat, 'id' | 'numero' | 'statut'>) => void;
  updateContrat: (id: number, contrat: Partial<Contrat>) => void;
  deleteContrat: (id: number) => void;
  getContratById: (id: number) => Contrat | undefined;
}

const ContratsContext = createContext<ContratsContextType | undefined>(undefined);

const initialContrats: Contrat[] = [
  {
    id: 1,
    numero: 'CTR-2024-001',
    client: 'Entreprise ABC',
    type: 'Service',
    debut: '2024-01-15',
    fin: '2025-01-15',
    montant: '50,000 €',
    statut: 'Actif',
    titre: 'Contrat de Services Informatiques',
    description: 'Contrat de fourniture de services informatiques incluant maintenance, support technique et mise à jour des systèmes.',
  },
  {
    id: 2,
    numero: 'CTR-2024-002',
    client: 'Techno Solutions',
    type: 'Fourniture',
    debut: '2024-02-01',
    fin: '2024-12-31',
    montant: '35,000 €',
    statut: 'Actif',
    titre: 'Fourniture de Matériel Informatique',
  },
  {
    id: 3,
    numero: 'CTR-2024-003',
    client: 'Digital Consulting',
    type: 'Consultation',
    debut: '2023-06-15',
    fin: '2024-06-15',
    montant: '25,000 €',
    statut: 'Expiré',
    titre: 'Services de Consultation',
  },
  {
    id: 4,
    numero: 'CTR-2024-004',
    client: 'CloudFirst Pro',
    type: 'Maintenance',
    debut: '2024-03-01',
    fin: '2025-03-01',
    montant: '18,000 €',
    statut: 'En Attente',
    titre: 'Contrat de Maintenance',
  },
];

export const ContratsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contrats, setContrats] = useState<Contrat[]>(initialContrats);
  const [nextId, setNextId] = useState(5);

  const addContrat = useCallback(
    (newContrat: Omit<Contrat, 'id' | 'numero' | 'statut'>) => {
      const id = nextId;
      const numero = `CTR-${new Date().getFullYear()}-${String(id).padStart(3, '0')}`;
      
      const contrat: Contrat = {
        ...newContrat,
        id,
        numero,
        statut: 'Actif',
      };

      setContrats((prev) => [...prev, contrat]);
      setNextId((prev) => prev + 1);
    },
    [nextId]
  );

  const updateContrat = useCallback((id: number, updatedData: Partial<Contrat>) => {
    setContrats((prev) =>
      prev.map((contrat) =>
        contrat.id === id ? { ...contrat, ...updatedData } : contrat
      )
    );
  }, []);

  const deleteContrat = useCallback((id: number) => {
    setContrats((prev) => prev.filter((contrat) => contrat.id !== id));
  }, []);

  const getContratById = useCallback(
    (id: number) => contrats.find((c) => c.id === id),
    [contrats]
  );

  const value: ContratsContextType = {
    contrats,
    addContrat,
    updateContrat,
    deleteContrat,
    getContratById,
  };

  return (
    <ContratsContext.Provider value={value}>
      {children}
    </ContratsContext.Provider>
  );
};

export const useContrats = () => {
  const context = useContext(ContratsContext);
  if (context === undefined) {
    throw new Error('useContrats must be used within a ContratsProvider');
  }
  return context;
};
