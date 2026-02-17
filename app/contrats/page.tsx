'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Eye, Trash2, Plus, Filter, X, Send } from 'lucide-react';
import Link from 'next/link';
import { useContrats } from '@/contexts/contracts-context';

const staticContrats = [
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

const sampleMessages = [
  { id: 1, role: 'user', content: 'Quelle est la date d\'expiration de ce contrat ?' },
  {
    id: 2,
    role: 'assistant',
    content:
      'La date d\'expiration de ce contrat est le 15 janvier 2025. Il vous reste environ 2 mois avant expiration.',
  },
  { id: 3, role: 'user', content: 'Quels sont les principaux termes du contrat ?' },
  {
    id: 4,
    role: 'assistant',
    content:
      'Les principaux termes incluent: Service fourni pour 50,000€, durée de 12 mois, renouvellement automatique avec clause de résiliation de 30 jours.',
  },
];

export default function ContratsPage() {
  const { contrats, deleteContrat } = useContrats();
  const [selectedContrat, setSelectedContrat] = useState<typeof contrats[0] | null>(null);
  const [messages, setMessages] = useState(sampleMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newUserMessage = {
        id: messages.length + 1,
        role: 'user',
        content: inputValue,
      };
      setMessages([...messages, newUserMessage]);

      setTimeout(() => {
        const newAssistantMessage = {
          id: messages.length + 2,
          role: 'assistant',
          content:
            'Je comprends votre question. Basé sur le contrat ' +
            selectedContrat?.numero +
            ', voici ma réponse: ...',
        };
        setMessages((prev) => [...prev, newAssistantMessage]);
      }, 500);

      setInputValue('');
    }
  };

  const handleDeleteContrat = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contrat ?')) {
      deleteContrat(id);
      setSelectedContrat(null);
    }
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden bg-background">
        <Header title="Contrats" />

        <div className="flex-1 overflow-hidden">
          {!selectedContrat ? (
            // List View
            <div className="p-8 overflow-auto h-full">
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
                            className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => setSelectedContrat(contrat)}
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
                            <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                              <div className="flex gap-2">
                                <Link href={`/contrats/${contrat.id}/edit`}>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-primary/10 hover:text-primary"
                                  >
                                    <Edit2 size={16} />
                                  </Button>
                                </Link>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="hover:bg-destructive/10 hover:text-destructive"
                                  onClick={() => handleDeleteContrat(contrat.id)}
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
          ) : (
            // Split View
            <div className="flex h-full gap-0">
              {/* Left Panel - Contract Details */}
              <div className="flex-1 overflow-auto p-8 border-r border-border">
                <div className="mb-6">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedContrat(null)}
                    className="mb-4"
                  >
                    ← Retour à la liste
                  </Button>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {selectedContrat.numero}
                  </h2>
                  <p className="text-muted-foreground">{selectedContrat.client}</p>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations Générales</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Type de Contrat</p>
                          <p className="text-lg font-semibold text-foreground">
                            {selectedContrat.type}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Montant</p>
                          <p className="text-lg font-semibold text-foreground">
                            {selectedContrat.montant}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date de Début</p>
                          <p className="text-lg font-semibold text-foreground">
                            {new Date(selectedContrat.debut).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date de Fin</p>
                          <p className="text-lg font-semibold text-foreground">
                            {new Date(selectedContrat.fin).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Statut</p>
                        <div className="mt-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              statutColors[
                                selectedContrat.statut as keyof typeof statutColors
                              ] || 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {selectedContrat.statut}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Conditions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li>• Durée: 12 mois renouvelables</li>
                        <li>• Clause de résiliation: 30 jours</li>
                        <li>• Mode de paiement: Mensuel</li>
                        <li>• Indexation: Possible</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Panel - Chatbot */}
              <div className="flex-1 flex flex-col bg-muted/30 border-l border-border">
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center justify-between bg-card">
                  <h3 className="font-semibold text-foreground">Assistant IA</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedContrat(null)}
                  >
                    <X size={18} />
                  </Button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-card border border-border text-foreground rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Posez une question sur le contrat..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === 'Enter' && handleSendMessage()
                      }
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
