'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, FileText, Edit2, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

const clients = [
  {
    id: 1,
    nom: 'Entreprise ABC',
    email: 'contact@abc.fr',
    telephone: '+33 1 23 45 67 89',
    contrats: 5,
  },
  {
    id: 2,
    nom: 'Société XYZ',
    email: 'info@xyz.fr',
    telephone: '+33 1 98 76 54 32',
    contrats: 3,
  },
  {
    id: 3,
    nom: 'Client DEF',
    email: 'hello@def.fr',
    telephone: '+33 2 11 22 33 44',
    contrats: 2,
  },
  {
    id: 4,
    nom: 'Partenaire GHI',
    email: 'support@ghi.fr',
    telephone: '+33 2 55 66 77 88',
    contrats: 4,
  },
  {
    id: 5,
    nom: 'Client JKL',
    email: 'business@jkl.fr',
    telephone: '+33 3 99 88 77 66',
    contrats: 1,
  },
];

export default function ClientsPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <Header title="Clients" />

        <div className="p-8">
          {/* Top Section with Add Button */}
          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="Rechercher par nom ou email..."
              className="max-w-md"
            />
            <Link href="/clients/new">
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
