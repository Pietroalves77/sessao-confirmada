import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  TestTube, 
  Download, 
  AlertCircle,
  MessageSquare,
  Clock,
  User
} from "lucide-react";

const Configuracoes = () => {
  const [configuracoes, setConfiguracoes] = useState({
    nomePsicologo: "Dr. João Silva",
    mensagemPadrao: "Olá {nome}, aqui é {psicologo}. Confirma sua sessão marcada para {data} às {horario}? Responda Sim ou Não.",
    horarioEnvio: "09:00",
    lembreteUmaHora: true,
    whatsappConectado: false,
    apiKey: "",
    mensagemLembrete: "Olá {nome}, lembrando da sua sessão hoje às {horario}. Nos vemos lá!",
  });

  const variaveisDisponiveis = [
    "{nome} - Nome do paciente",
    "{psicologo} - Nome do psicólogo", 
    "{data} - Data da sessão",
    "{horario} - Horário da sessão",
    "{tipo} - Tipo da sessão"
  ];

  const handleSave = () => {
    // Aqui salvaria no Supabase
    console.log("Configurações salvas:", configuracoes);
  };

  const testarConexaoWhatsApp = () => {
    // Aqui testaria a conexão
    console.log("Testando conexão WhatsApp...");
  };

  const exportarDados = () => {
    // Aqui exportaria os dados em CSV
    console.log("Exportando dados...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">
          Personalize o sistema de acordo com suas necessidades
        </p>
      </div>

      {/* Informações do Psicólogo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações do Psicólogo
          </CardTitle>
          <CardDescription>
            Dados que serão utilizados nas mensagens automáticas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Psicólogo</Label>
            <Input
              id="nome"
              value={configuracoes.nomePsicologo}
              onChange={(e) => setConfiguracoes({
                ...configuracoes,
                nomePsicologo: e.target.value
              })}
              placeholder="Seu nome profissional"
            />
          </div>
        </CardContent>
      </Card>

      {/* Configurações do WhatsApp */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            WhatsApp Business API
          </CardTitle>
          <CardDescription>
            Configure a integração para envio automático de mensagens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Status da Conexão</h4>
              <p className="text-sm text-muted-foreground">
                {configuracoes.whatsappConectado 
                  ? "WhatsApp conectado e funcionando"
                  : "WhatsApp não conectado"
                }
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={configuracoes.whatsappConectado ? "default" : "destructive"}>
                {configuracoes.whatsappConectado ? "✅ Conectado" : "❌ Desconectado"}
              </Badge>
              <Button variant="outline" size="sm" onClick={testarConexaoWhatsApp}>
                <TestTube className="h-4 w-4 mr-1" />
                Testar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apikey">API Key do Serviço WhatsApp</Label>
            <Input
              id="apikey"
              type="password"
              value={configuracoes.apiKey}
              onChange={(e) => setConfiguracoes({
                ...configuracoes,
                apiKey: e.target.value
              })}
              placeholder="Cole aqui sua API Key (Twilio, Z-API, etc.)"
            />
            <p className="text-xs text-muted-foreground">
              ⚠️ Para funcionalidades completas, conecte ao Supabase primeiro
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Mensagens Automáticas */}
      <Card>
        <CardHeader>
          <CardTitle>Personalização das Mensagens</CardTitle>
          <CardDescription>
            Edite as mensagens que serão enviadas automaticamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem de Confirmação (24h antes)</Label>
            <Textarea
              id="mensagem"
              value={configuracoes.mensagemPadrao}
              onChange={(e) => setConfiguracoes({
                ...configuracoes,
                mensagemPadrao: e.target.value
              })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lembrete">Mensagem de Lembrete (1h antes)</Label>
            <Textarea
              id="lembrete"
              value={configuracoes.mensagemLembrete}
              onChange={(e) => setConfiguracoes({
                ...configuracoes,
                mensagemLembrete: e.target.value
              })}
              rows={2}
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Variáveis Disponíveis:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
              {variaveisDisponiveis.map((variavel, index) => (
                <div key={index} className="text-muted-foreground">
                  • {variavel}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Horários e Automação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Automação e Horários
          </CardTitle>
          <CardDescription>
            Configure quando as mensagens devem ser enviadas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="horario">Horário Padrão de Envio</Label>
            <Select 
              value={configuracoes.horarioEnvio} 
              onValueChange={(value) => setConfiguracoes({
                ...configuracoes,
                horarioEnvio: value
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="08:00">08:00</SelectItem>
                <SelectItem value="09:00">09:00</SelectItem>
                <SelectItem value="10:00">10:00</SelectItem>
                <SelectItem value="11:00">11:00</SelectItem>
                <SelectItem value="14:00">14:00</SelectItem>
                <SelectItem value="15:00">15:00</SelectItem>
                <SelectItem value="16:00">16:00</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Horário em que as mensagens de confirmação serão enviadas
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="lembrete-switch">Lembrete 1 hora antes</Label>
              <p className="text-sm text-muted-foreground">
                Enviar mensagem de lembrete uma hora antes da sessão
              </p>
            </div>
            <Switch
              id="lembrete-switch"
              checked={configuracoes.lembreteUmaHora}
              onCheckedChange={(checked) => setConfiguracoes({
                ...configuracoes,
                lembreteUmaHora: checked
              })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Backup e Dados */}
      <Card>
        <CardHeader>
          <CardTitle>Backup dos Dados</CardTitle>
          <CardDescription>
            Faça backup dos seus dados em formato CSV
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Exportar dados</p>
              <p className="text-sm text-muted-foreground">
                Download de pacientes, sessões e estatísticas
              </p>
            </div>
            <Button variant="outline" onClick={exportarDados}>
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>

      {/* Aviso sobre Supabase */}
      <Card className="border-warning bg-warning-light">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <h4 className="font-medium">Conecte ao Supabase para funcionalidades completas</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Para ativar o envio automático de mensagens, armazenamento de dados e backup,
                é necessário conectar ao Supabase através do botão verde no topo da interface.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Configuracoes;