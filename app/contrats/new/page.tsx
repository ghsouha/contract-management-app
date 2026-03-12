'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useContrats } from '@/contexts/contracts-context';
import { useRouter } from 'next/navigation';

export default function AddContractPage() {
  const { addContrat, clients } = useContrats();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    titre: '',
    clientId: '',
    type: 'Service',
    debut: '',
    fin: '',
    montant: '',
    currency: 'EUR',
    description: '',
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientId) {
      alert('Veuillez sélectionner un client');
      return;
    }

    addContrat({
      clientId: parseInt(formData.clientId),
      type: formData.type,
      debut: formData.debut,
      fin: formData.fin,
      montant: formData.montant,
      currency: formData.currency,
      titre: formData.titre,
      description: formData.description,
      file: file?.name,
    });

    router.push('/contrats');
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <Header title="Ajouter un Contrat" />

        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Créer un Nouveau Contrat</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Remplissez tous les champs pour créer un nouveau contrat
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Titre */}
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Titre du Contrat
                    </label>
                    <Input
                      name="titre"
                      value={formData.titre}
                      onChange={handleChange}
                      placeholder="Ex: Contrat de Services Informatiques"
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Client et Type */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Client
                      </label>
                      <select
                        name="clientId"
                        value={formData.clientId}
                        onChange={handleChange}
                        className="mt-2 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
                        required
                      >
                        <option value="">Sélectionner un client</option>
                        {clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Type de Contrat
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-2 w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Service">Service</option>
                        <option value="Fourniture">Fourniture</option>
                        <option value="Consultation">Consultation</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Date de Début
                      </label>
                      <Input
                        type="date"
                        name="debut"
                        value={formData.debut}
                        onChange={handleChange}
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Date de Fin
                      </label>
                      <Input
                        type="date"
                        name="fin"
                        value={formData.fin}
                        onChange={handleChange}
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  {/* Montant et Devise */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Montant
                      </label>
                      <Input
                        name="montant"
                        value={formData.montant}
                        onChange={handleChange}
                        placeholder="Ex: 50000"
                        type="number"
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Devise
                      </label>
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="mt-2 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
                      >
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Décrivez les détails du contrat..."
                      rows={5}
                      className="mt-2 w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">
                      Télécharger le Fichier PDF
                    </label>
                    {!file ? (
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="mx-auto mb-3 text-muted-foreground" size={24} />
                        <p className="text-sm font-medium text-foreground mb-1">
                          Cliquez ou glissez un fichier
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF jusqu&apos;à 10MB
                        </p>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf"
                          className="hidden"
                          id="file-input"
                        />
                        <label htmlFor="file-input" className="cursor-pointer">
                          Sélectionner un fichier
                        </label>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <span className="text-sm font-medium text-foreground">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="p-1 hover:bg-border rounded"
                        >
                          <X size={18} className="text-muted-foreground" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-6">
                    <Button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Enregistrer le Contrat
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
