'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, AlertCircle, TrendingUp, Clock } from 'lucide-react';

const alertes = [
  { id: 1, contrat: 'Contrat A-2024-001', client: 'Client ABC', expiration: '5 jours', priorite: 'haute' },
  { id: 2, contrat: 'Contrat B-2024-002', client: 'Client XYZ', expiration: '10 jours', priorite: 'moyenne' },
  { id: 3, contrat: 'Contrat C-2024-003', client: 'Client DEF', expiration: '15 jours', priorite: 'basse' },
];

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <Header title="Dashboard" />
        
        <div className="p-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20 hover:border-primary/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">Total Contrats</CardTitle>
                <div className="p-2 bg-primary/20 rounded-lg">
                  <FileText className="text-primary" size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">42</div>
                <p className="text-xs text-muted-foreground mt-1">Tous les contrats</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-secondary/20 hover:border-secondary/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">Contrats Actifs</CardTitle>
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <TrendingUp className="text-secondary" size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">33</div>
                <p className="text-xs text-muted-foreground mt-1">En cours</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-destructive/20 hover:border-destructive/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">Contrats Expirés</CardTitle>
                <div className="p-2 bg-destructive/20 rounded-lg">
                  <AlertCircle className="text-destructive" size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">5</div>
                <p className="text-xs text-muted-foreground mt-1">À renouveler</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-accent/20 hover:border-accent/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">En Attente</CardTitle>
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Clock className="text-accent" size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">4</div>
                <p className="text-xs text-muted-foreground mt-1">Signature</p>
              </CardContent>
            </Card>
          </div>

          {/* Alerts Section */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-destructive/20 rounded-lg">
                  <AlertCircle size={20} className="text-destructive" />
                </div>
                Contrats Proches d&apos;Expiration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertes.map((alerte) => (
                  <div
                    key={alerte.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 border border-border/50 hover:border-border transition-all duration-200"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{alerte.contrat}</p>
                      <p className="text-sm text-muted-foreground">{alerte.client}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-destructive">
                        Expire dans {alerte.expiration}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          alerte.priorite === 'haute'
                            ? 'bg-destructive/10 text-destructive'
                            : alerte.priorite === 'moyenne'
                            ? 'bg-accent/10 text-accent'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {alerte.priorite}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
