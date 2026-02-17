'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  Clock,
  CheckCircle,
  Info,
  Trash2,
  Filter,
} from 'lucide-react';
import { useState } from 'react';

const notifications = [
  {
    id: 1,
    type: 'expiration',
    titre: 'Contrat expire dans 5 jours',
    message: 'Le contrat CTR-2024-001 avec Entreprise ABC expire le 15 janvier 2025.',
    priorite: 'haute',
    date: '2024-11-10',
    lu: false,
  },
  {
    id: 2,
    type: 'expiration',
    titre: 'Contrat expire dans 10 jours',
    message: 'Le contrat CTR-2024-002 avec Société XYZ expire bientôt.',
    priorite: 'moyenne',
    date: '2024-11-09',
    lu: false,
  },
  {
    id: 3,
    type: 'renouvellement',
    titre: 'Contrat à renouveler',
    message: 'Le contrat CTR-2024-003 avec Client DEF doit être renouvelé.',
    priorite: 'moyenne',
    date: '2024-11-08',
    lu: true,
  },
  {
    id: 4,
    type: 'signature',
    titre: 'Nouvelle signature requise',
    message: 'Le contrat CTR-2024-004 avec Partenaire GHI attend une signature.',
    priorite: 'haute',
    date: '2024-11-07',
    lu: false,
  },
  {
    id: 5,
    type: 'succès',
    titre: 'Contrat activé',
    message: 'Le contrat CTR-2024-005 avec Client JKL a été activé avec succès.',
    priorite: 'basse',
    date: '2024-11-06',
    lu: true,
  },
  {
    id: 6,
    type: 'info',
    titre: 'Mise à jour système',
    message: 'Une nouvelle fonctionnalité de gestion des contrats est maintenant disponible.',
    priorite: 'basse',
    date: '2024-11-05',
    lu: true,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'expiration':
      return <AlertCircle className="text-destructive" size={20} />;
    case 'signature':
      return <Clock className="text-accent" size={20} />;
    case 'succès':
      return <CheckCircle className="text-secondary" size={20} />;
    default:
      return <Info className="text-primary" size={20} />;
  }
};

const getPriorityColor = (
  priorite: string
): 'bg-destructive/10 text-destructive' | 'bg-accent/10 text-accent' | 'bg-muted text-muted-foreground' => {
  switch (priorite) {
    case 'haute':
      return 'bg-destructive/10 text-destructive';
    case 'moyenne':
      return 'bg-accent/10 text-accent';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState('tous');
  const [notifs, setNotifs] = useState(notifications);

  const filteredNotifs = notifs.filter((notif) => {
    if (filter === 'non-lues') return !notif.lu;
    if (filter === 'expiration') return notif.type === 'expiration';
    return true;
  });

  const handleDelete = (id: number) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <Header title="Notifications" />

        <div className="p-8">
          {/* Filter Buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              variant={filter === 'tous' ? 'default' : 'outline'}
              onClick={() => setFilter('tous')}
              className={
                filter === 'tous'
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  : ''
              }
            >
              Tous
            </Button>
            <Button
              variant={filter === 'non-lues' ? 'default' : 'outline'}
              onClick={() => setFilter('non-lues')}
              className={
                filter === 'non-lues'
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  : ''
              }
            >
              Non lues ({notifs.filter((n) => !n.lu).length})
            </Button>
            <Button
              variant={filter === 'expiration' ? 'default' : 'outline'}
              onClick={() => setFilter('expiration')}
              className={
                filter === 'expiration'
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  : ''
              }
            >
              Expirations
            </Button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3 max-w-3xl">
            {filteredNotifs.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Info size={40} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-semibold text-foreground mb-2">
                    Aucune notification
                  </p>
                  <p className="text-muted-foreground">
                    Vous n&apos;avez aucune notification avec ce filtre
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifs.map((notif) => (
                <Card
                  key={notif.id}
                  className={`hover:shadow-md transition-all ${
                    !notif.lu ? 'bg-primary/5 border-primary/20' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="mt-1">{getIcon(notif.type)}</div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <h3
                            className={`text-sm font-semibold ${
                              !notif.lu
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {notif.titre}
                          </h3>
                          {!notif.lu && (
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                          )}
                        </div>
                        <p className="text-sm text-foreground mb-2">
                          {notif.message}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(
                              notif.priorite
                            )}`}
                          >
                            {notif.priorite}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(notif.date).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>

                      {/* Action */}
                      <button
                        onClick={() => handleDelete(notif.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
                      >
                        <Trash2
                          size={16}
                          className="text-muted-foreground hover:text-destructive"
                        />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
