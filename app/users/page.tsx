'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Shield, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function UsersPage() {
  const [users] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Admin',
      status: 'Actif',
      createdAt: '2024-01-15',
    },
  ]);

  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <Header title="Gestion des Utilisateurs" />

        <div className="p-8">
          {/* Top Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Utilisateurs</h2>
              <p className="text-muted-foreground mt-1">Gérez les accès et les rôles</p>
            </div>
            <Link href="/users/add">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Plus size={18} />
                Ajouter Utilisateur
              </Button>
            </Link>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Nom
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Email
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Rôle
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Statut
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Date d'ajout
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Shield size={18} className="text-primary" />
                            </div>
                            <span className="font-medium text-foreground">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-foreground">{user.email}</td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            <Shield size={12} />
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-primary/10 hover:text-primary"
                            >
                              <Edit2 size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
