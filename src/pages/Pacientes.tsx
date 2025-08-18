import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Phone, 
  Mail,
  Calendar
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Paciente {
  id: number;
  nome: string;
  telefone: string;
  email?: string;
  observacoes?: string;
  proximaSessao?: string;
  ultimaSessao?: string;
}

const Pacientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null);

  // Mock data - será substituído por dados reais do Supabase
  const [pacientes] = useState<Paciente[]>([
    {
      id: 1,
      nome: "Maria Silva",
      telefone: "(11) 99999-1111",
      email: "maria@email.com",
      observacoes: "Ansiedade generalizada",
      proximaSessao: "Hoje 14:00",
      ultimaSessao: "15/01/2024"
    },
    {
      id: 2,
      nome: "João Santos",
      telefone: "(11) 99999-2222",
      email: "joao@email.com",
      observacoes: "Terapia de casal",
      proximaSessao: "Hoje 15:30",
      ultimaSessao: "10/01/2024"
    },
    {
      id: 3,
      nome: "Ana Costa",
      telefone: "(11) 99999-3333",
      observacoes: "Depressão pós-parto",
      proximaSessao: "Hoje 16:00",
      ultimaSessao: "12/01/2024"
    },
    {
      id: 4,
      nome: "Carlos Oliveira",
      telefone: "(11) 99999-4444",
      email: "carlos@email.com",
      ultimaSessao: "08/01/2024"
    }
  ]);

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.telefone.includes(searchTerm)
  );

  const openNewPacienteDialog = () => {
    setEditingPaciente(null);
    setIsDialogOpen(true);
  };

  const openEditPacienteDialog = (paciente: Paciente) => {
    setEditingPaciente(paciente);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pacientes</h1>
          <p className="text-muted-foreground">
            Gerencie o cadastro dos seus pacientes
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewPacienteDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingPaciente ? "Editar Paciente" : "Novo Paciente"}
              </DialogTitle>
              <DialogDescription>
                {editingPaciente 
                  ? "Edite as informações do paciente" 
                  : "Cadastre um novo paciente no sistema"
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input 
                  id="nome" 
                  placeholder="Digite o nome completo"
                  defaultValue={editingPaciente?.nome}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone (WhatsApp) *</Label>
                <Input 
                  id="telefone" 
                  placeholder="(11) 99999-9999"
                  defaultValue={editingPaciente?.telefone}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (opcional)</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="email@exemplo.com"
                  defaultValue={editingPaciente?.email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações (opcional)</Label>
                <Textarea 
                  id="observacoes" 
                  placeholder="Informações importantes sobre o paciente"
                  defaultValue={editingPaciente?.observacoes}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  {editingPaciente ? "Salvar Alterações" : "Cadastrar Paciente"}
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Busca */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Buscar Pacientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de pacientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPacientes.map((paciente) => (
          <Card key={paciente.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{paciente.nome}</CardTitle>
                  {paciente.proximaSessao && (
                    <Badge className="bg-primary text-primary-foreground mt-1">
                      {paciente.proximaSessao}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => openEditPacienteDialog(paciente)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{paciente.telefone}</span>
              </div>
              {paciente.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{paciente.email}</span>
                </div>
              )}
              {paciente.ultimaSessao && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Última: {paciente.ultimaSessao}</span>
                </div>
              )}
              {paciente.observacoes && (
                <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                  {paciente.observacoes}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPacientes.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              {searchTerm 
                ? "Nenhum paciente encontrado com este termo de busca"
                : "Nenhum paciente cadastrado ainda"
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Pacientes;