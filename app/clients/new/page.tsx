'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function AddClientPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    codePostal: '',
    ville: '',
    contact: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Client ajouté:', formData);
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
                      Nom de l&apos;Entreprise
                    </label>
                    <Input
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Ex: Entreprise ABC"
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
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="contact@example.com"
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Téléphone
                      </label>
                      <Input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="+33 1 23 45 67 89"
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Personne de Contact
                    </label>
                    <Input
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="Nom du contact principal"
                      className="mt-2"
                    />
                  </div>

                  {/* Adresse */}
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Adresse
                    </label>
                    <Input
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleChange}
                      placeholder="123 Rue de l&apos;Exemple"
                      className="mt-2"
                    />
                  </div>

                  {/* Code Postal et Ville */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Code Postal
                      </label>
                      <Input
                        name="codePostal"
                        value={formData.codePostal}
                        onChange={handleChange}
                        placeholder="75001"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Ville
                      </label>
                      <Input
                        name="ville"
                        value={formData.ville}
                        onChange={handleChange}
                        placeholder="Paris"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-6">
                    <Button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Ajouter le Client
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.history.back()}
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
