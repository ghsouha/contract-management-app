'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const suggestedQuestions = [
  'Quels contrats expirent bientôt ?',
  'Montant total des contrats actifs',
  'Combien de contrats avons-nous ?',
  'Liste des clients premium',
  'Résumé du mois',
];

const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    text: 'Bienvenue ! Je suis votre Assistant IA pour la gestion des contrats. Comment puis-je vous aider ?',
  },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSendMessage = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: messageText,
    };
    setMessages([...messages, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        'Quels contrats expirent bientôt ?':
          'Basé sur nos données, 3 contrats expirent dans les 30 prochains jours : CTR-2024-001 (5 jours), CTR-2024-002 (10 jours), et CTR-2024-003 (15 jours).',
        'Montant total des contrats actifs':
          'Le montant total des contrats actifs est de 258,000 €. Cela comprend 8 contrats en cours répartis entre 5 clients.',
        'Combien de contrats avons-nous ?':
          'Vous avez actuellement 42 contrats au total : 33 actifs, 5 expirés et 4 en attente de signature.',
        'Liste des clients premium':
          'Vos clients avec les contrats les plus importants sont : Entreprise ABC (50,000 €), Société XYZ (75,000 €), et Partenaire GHI (60,000 €).',
        'Résumé du mois':
          'En ce moment, vous avez 33 contrats actifs et 3 renouvellements à prévoir. Aucun nouveau contrat n\'a été signé ce mois-ci.',
      };

      const response =
        botResponses[messageText] ||
        "C'est une excellente question. Je suis capable de vous aider avec les informations sur vos contrats, clients et statistiques. N'hésitez pas à me poser une autre question !";

      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: response,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 700);

    setInput('');
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <Header title="Assistant IA" />

        <div className="p-8 h-[calc(100vh-120px)] flex">
          <div className="w-full max-w-4xl mx-auto flex flex-col">
            {messages.length === 1 && !input ? (
              // Initial State with Suggestions
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <HelpCircle size={32} className="text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    Comment puis-je vous aider ?
                  </h2>
                  <p className="text-muted-foreground">
                    Posez-moi des questions sur vos contrats, clients ou
                    statistiques
                  </p>
                </div>

                {/* Suggested Questions */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      className="p-4 text-left rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors group"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-primary">
                        {question}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Chat View
              <div className="flex-1 overflow-y-auto mb-6">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === 'user'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-2xl px-6 py-3 rounded-2xl text-sm ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-muted text-foreground rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Input
                    placeholder="Tapez votre question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && handleSendMessage()
                    }
                    className="text-base"
                  />
                  <Button
                    size="icon"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
                    onClick={() => handleSendMessage()}
                  >
                    <Send size={18} />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Cet assistant IA peut vous aider avec des informations sur vos
                  contrats et clients.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
