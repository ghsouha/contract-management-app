'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Edit2, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { useContrats } from '@/contexts/contracts-context';

export default function ClientsPage() {
  const { clients, deleteClient } = useContrats();

  const handleDeleteClient = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      deleteClient(id);
    }
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <Header title="Clients" />

        <div className="p-8">
          {/* Top Section */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Clients</h2>
            <Link href="/clients/add">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus size={18} className="mr-2" />
                Ajouter Client
              </Button>
            </Link>
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <Card key={client.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail size={16} />
                    <a href={`mailto:${client.email}`} className="text-primary hover:underline">
                      {client.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone size={16} />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-xs bg-muted px-2 py-1 rounded">SIRET: {client.siret}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-xs">Adresse: {client.address}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button variant="ghost" size="sm" className="flex-1 hover:bg-primary/10 hover:text-primary">
                      <Edit2 size={16} className="mr-2" />
                      Éditer
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDeleteClient(client.id)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <Card key={client.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{client.nom}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-muted-foreground" />
                      <a
                        href={`mailto:${client.email}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {client.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-muted-foreground" />
                      <a
                        href={`tel:${client.telephone}`}
                        className="text-sm text-foreground"
                      >
                        {client.telephone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {client.contrats} contrat{client.contrats > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border" />

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:bg-primary/10 hover:text-primary"
                    >
                      <Edit2 size={16} className="mr-2" />
                      Modifier
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive flex-1"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
