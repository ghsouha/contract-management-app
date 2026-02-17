'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User, Zap, Bell, Save } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    nom: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    entreprise: 'Mon Entreprise',
  });
  const [passwordData, setPasswordData] = useState({
    ancienMdp: '',
    nouveauMdp: '',
    confirmMdp: '',
  });
  const [aiSettings, setAiSettings] = useState({
    chatbotActif: true,
    suggestionsActives: true,
    notificationsIA: true,
  });

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAISetting = (key: keyof typeof aiSettings) => {
    setAiSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = () => {
    console.log('Profil sauvegardé:', profileData);
  };

  const handleChangePassword = () => {
    if (passwordData.nouveauMdp !== passwordData.confirmMdp) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    console.log('Mot de passe changé');
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <Header title="Paramètres" />

        <div className="p-8">
          <div className="max-w-2xl">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-border">
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-3 px-2 font-medium text-sm transition-colors ${
                  activeTab === 'profile'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <User className="inline mr-2" size={16} />
                Profil
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`pb-3 px-2 font-medium text-sm transition-colors ${
                  activeTab === 'password'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Lock className="inline mr-2" size={16} />
                Sécurité
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`pb-3 px-2 font-medium text-sm transition-colors ${
                  activeTab === 'ai'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Zap className="inline mr-2" size={16} />
                Assistant IA
              </button>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Informations Personnelles</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Mettez à jour vos informations de profil
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Nom Complet
                    </label>
                    <Input
                      name="nom"
                      value={profileData.nom}
                      onChange={handleProfileChange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Entreprise
                    </label>
                    <Input
                      name="entreprise"
                      value={profileData.entreprise}
                      onChange={handleProfileChange}
                      className="mt-2"
                    />
                  </div>

                  <div className="border-t border-border pt-6">
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Save size={16} className="mr-2" />
                      Enregistrer Profil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <Card>
                <CardHeader>
                  <CardTitle>Changer le Mot de Passe</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Assurez-vous d&apos;utiliser un mot de passe fort
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Ancien Mot de Passe
                    </label>
                    <Input
                      type="password"
                      name="ancienMdp"
                      value={passwordData.ancienMdp}
                      onChange={handlePasswordChange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Nouveau Mot de Passe
                    </label>
                    <Input
                      type="password"
                      name="nouveauMdp"
                      value={passwordData.nouveauMdp}
                      onChange={handlePasswordChange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Confirmer le Mot de Passe
                    </label>
                    <Input
                      type="password"
                      name="confirmMdp"
                      value={passwordData.confirmMdp}
                      onChange={handlePasswordChange}
                      className="mt-2"
                    />
                  </div>

                  <div className="border-t border-border pt-6">
                    <Button
                      onClick={handleChangePassword}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Lock size={16} className="mr-2" />
                      Changer le Mot de Passe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Settings Tab */}
            {activeTab === 'ai' && (
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de l&apos;Assistant IA</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Gérez les fonctionnalités de l&apos;assistant IA
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Chatbot Actif */}
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">
                        Activer le Chatbot
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Activez ou désactivez l&apos;assistant chatbot
                      </p>
                    </div>
                    <button
                      onClick={() => toggleAISetting('chatbotActif')}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        aiSettings.chatbotActif
                          ? 'bg-primary'
                          : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          aiSettings.chatbotActif
                            ? 'translate-x-7'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Suggestions */}
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">
                        Suggestions Intelligentes
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Afficher les questions suggérées
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        toggleAISetting('suggestionsActives')
                      }
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        aiSettings.suggestionsActives
                          ? 'bg-primary'
                          : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          aiSettings.suggestionsActives
                            ? 'translate-x-7'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Notifications IA */}
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">
                        Notifications IA
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Recevoir les alertes de l&apos;assistant IA
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        toggleAISetting('notificationsIA')
                      }
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        aiSettings.notificationsIA
                          ? 'bg-primary'
                          : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          aiSettings.notificationsIA
                            ? 'translate-x-7'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="border-t border-border pt-6">
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Save size={16} className="mr-2" />
                      Enregistrer les Paramètres
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
