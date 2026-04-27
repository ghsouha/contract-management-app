'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  siret: string;
}

export interface Contrat {
  id: number;
  numero: string;
  clientId: number;
  type: string;
  debut: string;
  fin: string;
  montant: string;
  titre?: string;
  description?: string;
  currency?: string;
  file?: string;
}

interface ContratsContextType {
  contrats: Contrat[];
  clients: Client[];
  addContrat: (contrat: Omit<Contrat, 'id' | 'numero'>) => void;
  updateContrat: (id: number, contrat: Partial<Contrat>) => void;
  deleteContrat: (id: number) => void;
  getContratById: (id: number) => Contrat | undefined;
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: number, client: Partial<Client>) => void;
  deleteClient: (id: number) => void;
  getClientName: (clientId: number) => string;
}

const ContratsContext = createContext<ContratsContextType | undefined>(undefined);

const initialClients: Client[] = [
  {
    id: 1,
    name: 'Entreprise ABC',
    email: 'contact@entrepriseabc.com',
    phone: '0123456789',
    address: '123 Rue de Paris',
    siret: '12345678901234',
  },
  {
    id: 2,
    name: 'Techno Solutions',
    email: 'contact@technos.com',
    phone: '0987654321',
    address: '456 Avenue du Tech',
    siret: '98765432109876',
  },
  {
    id: 3,
    name: 'Digital Consulting',
    email: 'contact@digitalconsult.com',
    phone: '0456789123',
    address: '789 Boulevard Digital',
    siret: '45678912345678',
  },
  {
    id: 4,
    name: 'CloudFirst Pro',
    email: 'contact@cloudfirst.com',
    phone: '0789123456',
    address: '321 Rue Cloud',
    siret: '78912345678901',
  },
];

const initialContrats: Contrat[] = [
  {
    id: 1,
    numero: 'CTR-2024-001',
    clientId: 1,
    type: 'Service',
    debut: '2024-01-15',
    fin: '2025-01-15',
    montant: '50000',
    currency: 'EUR',
    titre: 'Contrat de Services Informatiques',
    description: 'Contrat de fourniture de services informatiques incluant maintenance, support technique et mise à jour des systèmes.',
  },
  {
    id: 2,
    numero: 'CTR-2024-002',
    clientId: 2,
    type: 'Fourniture',
    debut: '2024-02-01',
    fin: '2024-12-31',
    montant: '35000',
    currency: 'EUR',
    titre: 'Fourniture de Matériel Informatique',
  },
  {
    id: 3,
    numero: 'CTR-2024-003',
    clientId: 3,
    type: 'Consultation',
    debut: '2023-06-15',
    fin: '2024-06-15',
    montant: '25000',
    currency: 'EUR',
    titre: 'Services de Consultation',
  },
  {
    id: 4,
    numero: 'CTR-2024-004',
    clientId: 4,
    type: 'Maintenance',
    debut: '2024-03-01',
    fin: '2025-03-01',
    montant: '18000',
    currency: 'EUR',
    titre: 'Contrat de Maintenance',
  },
];

export const ContratsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contrats, setContrats] = useState<Contrat[]>(initialContrats);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [nextContratId, setNextContratId] = useState(5);
  const [nextClientId, setNextClientId] = useState(5);

  const addContrat = useCallback(
    (newContrat: Omit<Contrat, 'id' | 'numero'>) => {
      const id = nextContratId;
      const numero = `CTR-${new Date().getFullYear()}-${String(id).padStart(3, '0')}`;
      
      const contrat: Contrat = {
        ...newContrat,
        id,
        numero,
      };

      setContrats((prev) => [...prev, contrat]);
      setNextContratId((prev) => prev + 1);
    },
    [nextContratId]
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

  const addClient = useCallback(
    (newClient: Omit<Client, 'id'>) => {
      const id = nextClientId;
      const client: Client = {
        ...newClient,
        id,
      };

      setClients((prev) => [...prev, client]);
      setNextClientId((prev) => prev + 1);
    },
    [nextClientId]
  );

  const updateClient = useCallback((id: number, updatedData: Partial<Client>) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id ? { ...client, ...updatedData } : client
      )
    );
  }, []);

  const deleteClient = useCallback((id: number) => {
    setClients((prev) => prev.filter((client) => client.id !== id));
  }, []);

  const getClientName = useCallback(
    (clientId: number) => {
      const client = clients.find((c) => c.id === clientId);
      return client ? client.name : 'Client inconnu';
    },
    [clients]
  );

  const value: ContratsContextType = {
    contrats,
    clients,
    addContrat,
    updateContrat,
    deleteContrat,
    getContratById,
    addClient,
    updateClient,
    deleteClient,
    getClientName,
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
