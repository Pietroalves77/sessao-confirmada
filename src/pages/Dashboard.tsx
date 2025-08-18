import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarCheck, 
  CalendarX, 
  Clock, 
  Users,
  TrendingUp,
  Bell
} from "lucide-react";

const Dashboard = () => {
  // Mock data - será substituído por dados reais do Supabase
  const stats = {
    sessõesHoje: 5,
    confirmadas: 3,
    pendentes: 2,
    canceladas: 0,
    totalPacientes: 25,
    taxaConfirmacao: 85
  };

  const próximasSessões = [
    {
      id: 1,
      paciente: "Maria Silva",
      horario: "14:00",
      tipo: "Psicoterapia",
      status: "confirmado"
    },
    {
      id: 2,
      paciente: "João Santos",
      horario: "15:30",
      tipo: "Avaliação",
      status: "pendente"
    },
    {
      id: 3,
      paciente: "Ana Costa",
      horario: "16:00",
      tipo: "Retorno",
      status: "sem_resposta"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmado":
        return <Badge className="bg-success text-success-foreground">✅ Confirmado</Badge>;
      case "pendente":
        return <Badge className="bg-warning text-warning-foreground">⏳ Pendente</Badge>;
      case "sem_resposta":
        return <Badge variant="outline">❓ Sem Resposta</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral das suas sessões e confirmações
        </p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessões Hoje</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sessõesHoje}</div>
            <p className="text-xs text-muted-foreground">
              agendadas para hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
            <Badge className="bg-success text-success-foreground">✅</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmadas}</div>
            <p className="text-xs text-muted-foreground">
              pacientes confirmaram
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendentes}</div>
            <p className="text-xs text-muted-foreground">
              aguardando resposta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Confirmação</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.taxaConfirmacao}%</div>
            <p className="text-xs text-muted-foreground">
              nos últimos 30 dias
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Próximas sessões */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Próximas Sessões - Hoje
          </CardTitle>
          <CardDescription>
            Acompanhe o status de confirmação das suas consultas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {próximasSessões.map((sessao) => (
              <div 
                key={sessao.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{sessao.horario}</div>
                    <div className="text-sm text-muted-foreground">
                      {sessao.paciente}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {sessao.tipo}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(sessao.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-warning">⚠️ Alertas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            • 2 pacientes ainda não responderam para hoje<br/>
            • 1 paciente na lista de espera aguardando vaga
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;