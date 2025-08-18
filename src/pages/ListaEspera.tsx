import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Clock, 
  ArrowUp, 
  ArrowDown, 
  Phone,
  MessageSquare,
  Trash2
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PacienteEspera {
  id: number;
  pacienteId: number;
  pacienteNome: string;
  telefone: string;
  tipoSessao: string;
  prioridade: "alta" | "media" | "baixa";
  dataInclusao: string;
  observacoes?: string;
}

const ListaEspera = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data - será substituído por dados reais do Supabase
  const [pacientesEspera, setPacientesEspera] = useState<PacienteEspera[]>([
    {
      id: 1,
      pacienteId: 5,
      pacienteNome: "Pedro Silva",
      telefone: "(11) 99999-5555",
      tipoSessao: "Psicoterapia",
      prioridade: "alta",
      dataInclusao: "2024-01-15",
      observacoes: "Urgente - ansiedade severa"
    },
    {
      id: 2,
      pacienteId: 6,
      pacienteNome: "Lucia Santos",
      telefone: "(11) 99999-6666",
      tipoSessao: "Retorno",
      prioridade: "media",
      dataInclusao: "2024-01-16"
    },
    {
      id: 3,
      pacienteId: 7,
      pacienteNome: "Roberto Costa",
      telefone: "(11) 99999-7777",
      tipoSessao: "Avaliação",
      prioridade: "baixa",
      dataInclusao: "2024-01-17",
      observacoes: "Flexível com horários"
    }
  ]);

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return <Badge variant="destructive">🔴 Alta</Badge>;
      case "media":
        return <Badge className="bg-warning text-warning-foreground">🟡 Média</Badge>;
      case "baixa":
        return <Badge variant="secondary">🟢 Baixa</Badge>;
      default:
        return <Badge variant="outline">{prioridade}</Badge>;
    }
  };

  const moverPrioridade = (id: number, direcao: "cima" | "baixo") => {
    const index = pacientesEspera.findIndex(p => p.id === id);
    if (
      (direcao === "cima" && index > 0) ||
      (direcao === "baixo" && index < pacientesEspera.length - 1)
    ) {
      const newList = [...pacientesEspera];
      const targetIndex = direcao === "cima" ? index - 1 : index + 1;
      [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
      setPacientesEspera(newList);
    }
  };

  const removerDaLista = (id: number) => {
    setPacientesEspera(pacientesEspera.filter(p => p.id !== id));
  };

  const notificarProximoNaLista = () => {
    if (pacientesEspera.length > 0) {
      const primeiro = pacientesEspera[0];
      console.log(`Notificando ${primeiro.pacienteNome} sobre vaga disponível`);
      // Aqui enviaria WhatsApp para o primeiro da lista
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lista de Espera</h1>
          <p className="text-muted-foreground">
            Gerencie pacientes aguardando vagas disponíveis
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={notificarProximoNaLista}
            disabled={pacientesEspera.length === 0}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Notificar Próximo
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Adicionar à Lista
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adicionar Paciente à Lista de Espera</DialogTitle>
                <DialogDescription>
                  Inclua um paciente na lista de espera por vagas
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="paciente">Paciente *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Maria Silva</SelectItem>
                      <SelectItem value="2">João Santos</SelectItem>
                      <SelectItem value="3">Ana Costa</SelectItem>
                      <SelectItem value="4">Carlos Oliveira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Sessão Desejada *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="psicoterapia">Psicoterapia</SelectItem>
                      <SelectItem value="avaliacao">Avaliação</SelectItem>
                      <SelectItem value="retorno">Retorno</SelectItem>
                      <SelectItem value="casal">Terapia de Casal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prioridade">Prioridade *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">🔴 Alta - Urgente</SelectItem>
                      <SelectItem value="media">🟡 Média - Normal</SelectItem>
                      <SelectItem value="baixa">🟢 Baixa - Flexível</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações (opcional)</Label>
                  <Input 
                    id="observacoes" 
                    placeholder="Informações adicionais sobre disponibilidade"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    Adicionar à Lista
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total na Lista</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pacientesEspera.length}</div>
            <p className="text-xs text-muted-foreground">pacientes aguardando</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Prioridade Alta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {pacientesEspera.filter(p => p.prioridade === "alta").length}
            </div>
            <p className="text-xs text-muted-foreground">casos urgentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 dias</div>
            <p className="text-xs text-muted-foreground">na lista de espera</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de espera */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pacientes na Lista de Espera
          </CardTitle>
          <CardDescription>
            Ordem de prioridade - primeiro da lista será notificado quando houver vaga
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pacientesEspera.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum paciente na lista de espera
            </div>
          ) : (
            <div className="space-y-3">
              {pacientesEspera.map((paciente, index) => (
                <div 
                  key={paciente.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-card"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      <span className="font-medium">{paciente.pacienteNome}</span>
                      {getPrioridadeBadge(paciente.prioridade)}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {paciente.telefone}
                      </div>
                      <div>Tipo: {paciente.tipoSessao}</div>
                      <div>
                        Desde: {new Date(paciente.dataInclusao).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    
                    {paciente.observacoes && (
                      <div className="text-sm text-muted-foreground mt-1 bg-muted p-2 rounded">
                        {paciente.observacoes}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => moverPrioridade(paciente.id, "cima")}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => moverPrioridade(paciente.id, "baixo")}
                      disabled={index === pacientesEspera.length - 1}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removerDaLista(paciente.id)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instruções */}
      <Card className="bg-accent">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Como funciona a Lista de Espera:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Quando um paciente cancelar uma sessão, o primeiro da lista será notificado automaticamente</li>
            <li>• Use as setas para reordenar a prioridade conforme necessário</li>
            <li>• Pacientes com prioridade "Alta" devem ficar no topo da lista</li>
            <li>• O botão "Notificar Próximo" envia WhatsApp para o primeiro da lista sobre vaga disponível</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListaEspera;