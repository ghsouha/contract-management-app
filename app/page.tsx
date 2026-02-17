'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FileText, AlertCircle, TrendingUp, Clock } from 'lucide-react';

const chartData = [
  { month: 'Jan', total: 24, actifs: 20, expirés: 2, en_attente: 2 },
  { month: 'Fév', total: 28, actifs: 23, expirés: 2, en_attente: 3 },
  { month: 'Mar', total: 32, actifs: 26, expirés: 3, en_attente: 3 },
  { month: 'Avr', total: 35, actifs: 28, expirés: 4, en_attente: 3 },
  { month: 'Mai', total: 38, actifs: 30, expirés: 5, en_attente: 3 },
  { month: 'Juin', total: 42, actifs: 33, expirés: 5, en_attente: 4 },
];

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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">Total Contrats</CardTitle>
                <FileText className="text-primary" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">42</div>
                <p className="text-xs text-muted-foreground mt-1">Tous les contrats</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">Contrats Actifs</CardTitle>
                <TrendingUp className="text-secondary" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">33</div>
                <p className="text-xs text-muted-foreground mt-1">En cours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">Contrats Expirés</CardTitle>
                <AlertCircle className="text-destructive" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5</div>
                <p className="text-xs text-muted-foreground mt-1">À renouveler</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">En Attente</CardTitle>
                <Clock className="text-accent" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <p className="text-xs text-muted-foreground mt-1">Signature</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Line Chart - Evolution */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Évolution des Contrats</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="var(--chart-1)" strokeWidth={2} />
                    <Line type="monotone" dataKey="actifs" stroke="var(--chart-2)" strokeWidth={2} />
                    <Line type="monotone" dataKey="expirés" stroke="var(--chart-3)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bar Chart - Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="actifs" fill="var(--chart-2)" />
                    <Bar dataKey="expirés" fill="var(--chart-3)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Alerts Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle size={20} className="text-destructive" />
                Contrats Proches d&apos;Expiration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertes.map((alerte) => (
                  <div
                    key={alerte.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
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
