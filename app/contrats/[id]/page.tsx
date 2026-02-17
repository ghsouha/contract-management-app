'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Download,
  Edit,
  Trash2,
  Send,
  Calendar,
  DollarSign,
  User,
  FileText,
} from 'lucide-react';
import { useState } from 'react';

const contratDetails = {
  id: 1,
  numero: 'CTR-2024-001',
  titre: 'Contrat de Services Informatiques',
  client: 'Entreprise ABC',
  type: 'Service',
  debut: '2024-01-15',
  fin: '2025-01-15',
  montant: '50,000 €',
  statut: 'Actif',
  description:
    'Contrat de fourniture de services informatiques incluant maintenance, support technique et mise à jour des systèmes.',
  pdfUrl: '#',
};

const chatMessages = [
  { id: 1, sender: 'bot', text: 'Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider avec ce contrat ?' },
  { id: 2, sender: 'user', text: 'Quand expire ce contrat ?' },
  { id: 3, sender: 'bot', text: 'Ce contrat expire le 15 janvier 2025. Il reste environ 11 mois avant son expiration.' },
];

export default function ContractDetailPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { id: messages.length + 1, sender: 'user', text: input };
    setMessages([...messages, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text: 'Merci pour votre question. Je suis en train de traiter votre demande.',
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <Header title="Détail Contrat" />

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contract Details - Left Column */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {contratDetails.titre}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {contratDetails.numero}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        contratDetails.statut === 'Actif'
                          ? 'bg-secondary/10 text-secondary'
                          : 'bg-destructive/10 text-destructive'
                      }`}
                    >
                      {contratDetails.statut}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Client
                      </label>
                      <p className="text-lg font-semibold text-foreground mt-1">
                        {contratDetails.client}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Type
                      </label>
                      <p className="text-lg font-semibold text-foreground mt-1">
                        {contratDetails.type}
                      </p>
                    </div>
                  </div>

                  {/* Dates and Amount */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Calendar size={16} />
                        <span className="text-sm font-medium">Début</span>
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        {new Date(contratDetails.debut).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Calendar size={16} />
                        <span className="text-sm font-medium">Fin</span>
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        {new Date(contratDetails.fin).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <DollarSign size={16} />
                        <span className="text-sm font-medium">Montant</span>
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        {contratDetails.montant}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Description
                    </label>
                    <p className="text-foreground mt-2 leading-relaxed">
                      {contratDetails.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1">
                      <Edit size={18} className="mr-2" />
                      Modifier
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download size={18} className="mr-2" />
                      Télécharger PDF
                    </Button>
                    <Button variant="outline" className="text-destructive hover:text-destructive">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chatbot - Right Column */}
            <div className="lg:col-span-1">
              <Card className="h-full flex flex-col">
                <CardHeader className="border-b border-border">
                  <CardTitle className="text-lg">Assistant IA</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Posez vos questions sur ce contrat
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                            msg.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Votre question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === 'Enter' && handleSendMessage()
                        }
                        className="text-sm"
                      />
                      <Button
                        size="icon"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={handleSendMessage}
                      >
                        <Send size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
