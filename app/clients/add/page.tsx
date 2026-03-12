'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useContrats } from '@/contexts/contracts-context';
import { useRouter } from 'next/navigation';

export default function AddClientPage() {
  const { addClient } = useContrats();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    siret: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addClient({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      siret: formData.siret,
    });

    router.push('/clients');
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <Header title="Ajouter un Client" />

        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Créer un Nouveau Client</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Remplissez tous les champs pour ajouter un nouveau client
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom */}
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Nom du Client
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Amana Martin"
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Email et Téléphone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ex: amana@gmail.com"
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Téléphone
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ex: 0670020378"
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  {/* Adresse */}
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Adresse
                    </label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Ex: 45 Avenue des Fleurs"
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* SIRET */}
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      SIRET
                    </label>
                    <Input
                      name="siret"
                      value={formData.siret}
                      onChange={handleChange}
                      placeholder="Ex: 18765432100019"
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Boutons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                    >
                      Ajouter le Client
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push('/clients')}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
