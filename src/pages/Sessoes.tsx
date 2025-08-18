import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Filter,
  RefreshCw
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Sessao {
  id: number;
  pacienteId: number;
  pacienteNome: string;
  data: string;
  horario: string;
  tipo: string;
  status: "confirmado" | "pendente" | "sem_resposta" | "cancelado";
  observacoes?: string;
  mensagemEnviada?: boolean;
}

const Sessoes = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroData, setFiltroData] = useState("");

  // Mock data - será substituído por dados reais do Supabase
  const [sessoes] = useState<Sessao[]>([
    {
      id: 1,
      pacienteId: 1,
      pacienteNome: "Maria Silva",
      data: "2024-01-18",
      horario: "14:00",
      tipo: "Psicoterapia",
      status: "confirmado",
      observacoes: "Sessão de acompanhamento",
      mensagemEnviada: true
    },
    {
      id: 2,
      pacienteId: 2,
      pacienteNome: "João Santos",
      data: "2024-01-18",
      horario: "15:30",
      tipo: "Avaliação",
      status: "pendente",
      mensagemEnviada: true
    },
    {
      id: 3,
      pacienteId: 3,
      pacienteNome: "Ana Costa",
      data: "2024-01-18",
      horario: "16:00",
      tipo: "Retorno",
      status: "sem_resposta",
      mensagemEnviada: true
    },
    {
      id: 4,
      pacienteId: 4,
      pacienteNome: "Carlos Oliveira",
      data: "2024-01-19",
      horario: "10:00",
      tipo: "Psicoterapia",
      status: "pendente",
      mensagemEnviada: false
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmado":
        return <Badge className="bg-success text-success-foreground">✅ Confirmado</Badge>;
      case "pendente":
        return <Badge className="bg-warning text-warning-foreground">⏳ Pendente</Badge>;
      case "sem_resposta":
        return <Badge variant="outline">❓ Sem Resposta</Badge>;
      case "cancelado":
        return <Badge variant="destructive">❌ Cancelado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredSessoes = sessoes.filter(sessao => {
    const statusMatch = filtroStatus === "todos" || sessao.status === filtroStatus;
    const dataMatch = !filtroData || sessao.data === filtroData;
    return statusMatch && dataMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sessões</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe suas consultas agendadas
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Sessão
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Agendar Nova Sessão</DialogTitle>
              <DialogDescription>
                Cadastre uma nova sessão para um paciente
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
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data">Data *</Label>
                  <Input 
                    id="data" 
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horario">Horário *</Label>
                  <Input 
                    id="horario" 
                    type="time"
                    step="1800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Sessão *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="psicoterapia">Psicoterapia</SelectItem>
                    <SelectItem value="avaliacao">Avaliação</SelectItem>
                    <SelectItem value="retorno">Retorno</SelectItem>
                    <SelectItem value="casal">Terapia de Casal</SelectItem>
                    <SelectItem value="grupo">Terapia em Grupo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações (opcional)</Label>
                <Textarea 
                  id="observacoes" 
                  placeholder="Informações adicionais sobre a sessão"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  Agendar Sessão
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="sem_resposta">Sem Resposta</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Data</Label>
              <Input 
                type="date" 
                value={filtroData}
                onChange={(e) => setFiltroData(e.target.value)}
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setFiltroStatus("todos");
                  setFiltroData("");
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de sessões */}
      <div className="space-y-4">
        {filteredSessoes.map((sessao) => (
          <Card key={sessao.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {new Date(sessao.data).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{sessao.horario}</span>
                    </div>
                    <Badge variant="outline">{sessao.tipo}</Badge>
                  </div>
                  
                  <div className="text-lg font-semibold">{sessao.pacienteNome}</div>
                  
                  {sessao.observacoes && (
                    <div className="text-sm text-muted-foreground">
                      {sessao.observacoes}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {getStatusBadge(sessao.status)}
                  
                  <div className="flex flex-col gap-1">
                    <Button variant="outline" size="sm" className="gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {sessao.mensagemEnviada ? "Reenviar" : "Enviar"}
                    </Button>
                    
                    {sessao.status === "sem_resposta" && (
                      <Button variant="outline" size="sm" className="gap-1 text-warning">
                        <RefreshCw className="h-3 w-3" />
                        Lembrete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSessoes.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Nenhuma sessão encontrada com os filtros aplicados
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Sessoes;