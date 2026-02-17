'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Eye, Trash2, Plus, Filter } from 'lucide-react';
import Link from 'next/link';

const contrats = [
  {
    id: 1,
    numero: 'CTR-2024-001',
    client: 'Entreprise ABC',
    type: 'Service',
    debut: '2024-01-15',
    fin: '2025-01-15',
    montant: '50,000 €',
    statut: 'Actif',
  },
  {
    id: 2,
    numero: 'CTR-2024-002',
    client: 'Société XYZ',
    type: 'Fourniture',
    debut: '2024-02-01',
    fin: '2024-12-31',
    montant: '75,000 €',
    statut: 'Actif',
  },
  {
    id: 3,
    numero: 'CTR-2024-003',
    client: 'Client DEF',
    type: 'Consultation',
    debut: '2023-06-01',
    fin: '2024-05-31',
    montant: '25,000 €',
    statut: 'Expiré',
  },
  {
    id: 4,
    numero: 'CTR-2024-004',
    client: 'Partenaire GHI',
    type: 'Service',
    debut: '2024-04-10',
    fin: '2024-10-10',
    montant: '60,000 €',
    statut: 'En Attente',
  },
  {
    id: 5,
    numero: 'CTR-2024-005',
    client: 'Client JKL',
    type: 'Maintenance',
    debut: '2024-03-15',
    fin: '2025-03-15',
    montant: '40,000 €',
    statut: 'Actif',
  },
];

const statutColors = {
  Actif: 'bg-secondary/10 text-secondary',
  Expiré: 'bg-destructive/10 text-destructive',
  'En Attente': 'bg-accent/10 text-accent',
};

export default function ContratsPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <Header title="Contrats" />

        <div className="p-8">
          {/* Top Section with Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex gap-3">
              <Input
                placeholder="Rechercher par numéro, client ou type..."
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Filter size={20} />
              </Button>
            </div>
            <Link href="/contrats/new">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full md:w-auto">
                <Plus size={18} className="mr-2" />
                Ajouter Contrat
              </Button>
            </Link>
          </div>

          {/* Contracts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des Contrats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Numéro
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Client
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Type
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Début
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Fin
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Montant
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Statut
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contrats.map((contrat) => (
                      <tr
                        key={contrat.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-4 px-4 font-medium text-foreground">
                          {contrat.numero}
                        </td>
                        <td className="py-4 px-4 text-foreground">{contrat.client}</td>
                        <td className="py-4 px-4 text-foreground">{contrat.type}</td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {new Date(contrat.debut).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {new Date(contrat.fin).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-4 px-4 font-medium text-foreground">
                          {contrat.montant}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              statutColors[
                                contrat.statut as keyof typeof statutColors
                              ] || 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {contrat.statut}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Link href={`/contrats/${contrat.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-primary/10 hover:text-primary"
                              >
                                <Eye size={16} />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-primary/10 hover:text-primary"
                            >
                              <Edit2 size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
