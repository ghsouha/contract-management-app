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
import { FileText } from 'lucide-react';

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
  const { contrats, deleteContrat, getClientName } = useContrats();
  const [selectedContrat, setSelectedContrat] = useState<typeof contrats[0] | null>(null);
  const [messages, setMessages] = useState(sampleMessages);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'pdf'>('details');

  // Reset to details tab when contract is selected
  const handleSelectContrat = (contrat: typeof contrats[0]) => {
    setSelectedContrat(contrat);
    setActiveTab('details');
  };

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
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {contrats.map((contrat) => (
                          <tr
                            key={contrat.id}
                            className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => handleSelectContrat(contrat)}
                          >
                            <td className="py-4 px-4 font-medium text-foreground">
                              {contrat.numero}
                            </td>
                            <td className="py-4 px-4 text-foreground">{getClientName(contrat.clientId)}</td>
                            <td className="py-4 px-4 text-foreground">{contrat.type}</td>
                            <td className="py-4 px-4 text-muted-foreground">
                              {new Date(contrat.debut).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="py-4 px-4 text-muted-foreground">
                              {new Date(contrat.fin).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="py-4 px-4 font-medium text-foreground">
                              {contrat.montant} {contrat.currency || 'EUR'}
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
              {/* Left Panel - Chatbot */}
              <div className="flex-1 flex flex-col bg-muted/30 border-r border-border">
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

              {/* Right Panel - PDF Viewer */}
              <div className="flex-1 flex flex-col border-l border-border bg-background">
                {/* PDF Header */}
                <div className="p-4 border-b border-border flex items-center justify-between bg-card">
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedContrat.titre || selectedContrat.numero}</h3>
                    <p className="text-xs text-muted-foreground">{getClientName(selectedContrat.clientId)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedContrat(null)}
                  >
                    <X size={18} />
                  </Button>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
                  <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full space-y-4">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText size={40} className="text-primary" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground text-center">
                      {selectedContrat.file || 'exemple_contrat_client.pdf'}
                    </h2>
                    <p className="text-center text-muted-foreground">
                      Type: PDF | Taille: 2.4 MB
                    </p>
                    <div className="border-t border-border pt-6 mt-6 space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Numéro</p>
                          <p className="font-semibold text-foreground">{selectedContrat.numero}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-semibold text-foreground">{selectedContrat.type}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Montant</p>
                          <p className="font-semibold text-foreground">{selectedContrat.montant} {selectedContrat.currency || 'EUR'}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Validité</p>
                          <p className="font-semibold text-foreground">
                            {new Date(selectedContrat.debut).toLocaleDateString('fr-FR')} - {new Date(selectedContrat.fin).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6">
                      Télécharger PDF
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
