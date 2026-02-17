'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { useContrats } from '@/contexts/contracts-context';
import { useRouter } from 'next/navigation';

export default function EditContractPage({ params }: { params: { id: string } }) {
  const { getContratById, updateContrat } = useContrats();
  const router = useRouter();
  const contractId = parseInt(params.id);
  const existingContrat = getContratById(contractId);

  const [formData, setFormData] = useState({
    titre: '',
    client: '',
    type: 'Service',
    debut: '',
    fin: '',
    montant: '',
    description: '',
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (existingContrat) {
      setFormData({
        titre: existingContrat.titre || '',
        client: existingContrat.client,
        type: existingContrat.type,
        debut: existingContrat.debut,
        fin: existingContrat.fin,
        montant: existingContrat.montant.replace(' €', ''),
        description: existingContrat.description || '',
      });
    }
  }, [existingContrat]);

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

    updateContrat(contractId, {
      titre: formData.titre,
      client: formData.client,
      type: formData.type,
      debut: formData.debut,
      fin: formData.fin,
      montant: `${formData.montant} €`,
      description: formData.description,
    });

    router.push('/contrats');
  };

  if (!existingContrat) {
    return (
      <>
        <Sidebar />
        <main className="flex-1 overflow-auto bg-background">
          <Header title="Modifier un Contrat" />
          <div className="p-8">
            <p className="text-muted-foreground">Contrat non trouvé</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <Header title="Modifier un Contrat" />

        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Modifier le Contrat</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Mettez à jour les informations du contrat
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
                      <Input
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        placeholder="Nom du client"
                        className="mt-2"
                        required
                      />
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

                  {/* Montant */}
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Montant (€)
                    </label>
                    <Input
                      type="number"
                      name="montant"
                      value={formData.montant}
                      onChange={handleChange}
                      placeholder="50000"
                      className="mt-2"
                      required
                    />
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
                      Enregistrer les Modifications
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
