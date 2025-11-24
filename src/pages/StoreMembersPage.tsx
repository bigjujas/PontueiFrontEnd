import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import {UserPlus, Shield, Settings, Trash2 } from "lucide-react";

const mockMembers = [
  { id: 1, name: "João Silva", email: "joao@email.com", role: "Gerente", permissions: "Todas", status: "Ativo" },
  { id: 2, name: "Maria Santos", email: "maria@email.com", role: "Consultor", permissions: "Visualização", status: "Ativo" },
  { id: 3, name: "Pedro Costa", email: "pedro@email.com", role: "Vendedor", permissions: "Vendas", status: "Inativo" },
];

const roles = [
  { name: "Gerente", permissions: ["Todas as funcionalidades", "Gerenciar membros", "Relatórios financeiros"] },
  { name: "Consultor", permissions: ["Visualizar dados", "Atender clientes", "Ver relatórios básicos"] },
  { name: "Vendedor", permissions: ["Registrar vendas", "Gerenciar produtos", "Atender clientes"] },
];

export default function StoreMembersPage() {
  const [members, setMembers] = useState(mockMembers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setNewMember(prev => ({ ...prev, [field]: value }));
  };

  const handleAddMember = () => {
    const member = {
      id: members.length + 1,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      permissions: roles.find(r => r.name === newMember.role)?.permissions.join(", ") || "",
      status: "Ativo"
    };
    setMembers([...members, member]);
    setNewMember({ name: "", email: "", role: "" });
    setShowAddForm(false);
  };

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Gerente": return "bg-red-100 text-red-800";
      case "Consultor": return "bg-blue-100 text-blue-800";
      case "Vendedor": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gerenciar Membros</h1>
              <p className="text-muted-foreground">Gerencie a equipe da sua loja</p>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Adicionar Membro
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Níveis de Acesso
              </CardTitle>
              <CardDescription>Entenda as permissões de cada função</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <div key={role.name} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">{role.name}</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {role.permissions.map((permission, index) => (
                        <li key={index}>• {permission}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Novo Membro</CardTitle>
                <CardDescription>Convide alguém para sua equipe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input
                      value={newMember.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Nome do membro"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Função</Label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    value={newMember.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                  >
                    <option value="">Selecione uma função</option>
                    {roles.map((role) => (
                      <option key={role.name} value={role.name}>{role.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddMember}>Enviar Convite</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancelar</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Membros da Equipe</CardTitle>
              <CardDescription>Total: {members.length} membros</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                        <Badge className={getRoleColor(member.role)}>
                          {member.role}
                        </Badge>
                        <Badge variant={member.status === "Ativo" ? "default" : "secondary"}>
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
    </div>
  );
}