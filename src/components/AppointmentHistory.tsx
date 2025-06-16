import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type Appointment = {
  id: string;
  caregiver_name: string;
  service_name: string;
  date: string;
  time: string;
  status: 'completed' | 'cancelled' | 'scheduled';
};

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error("Usuário não autenticado");
        }

        // Simulação de dados - substituir por chamada real ao Supabase
        const mockData: Appointment[] = [
          {
            id: "1",
            caregiver_name: "Maria Silva",
            service_name: "Acompanhamento Diário",
            date: "2025-06-15",
            time: "14:00",
            status: "completed"
          },
          {
            id: "2",
            caregiver_name: "João Santos",
            service_name: "Acompanhamento Noturno",
            date: "2025-06-20",
            time: "22:00",
            status: "scheduled"
          },
          {
            id: "3",
            caregiver_name: "Ana Oliveira",
            service_name: "Acompanhamento Médico",
            date: "2025-06-10",
            time: "09:00",
            status: "completed"
          }
        ];

        setAppointments(mockData);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar o histórico de agendamentos",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Concluído</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
      case 'scheduled':
        return <Badge variant="secondary">Agendado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return <div>Carregando histórico...</div>;
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cuidador</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Data
            </TableHead>
            <TableHead className="flex items-center">
              <Clock className="mr-2 h-4 w-4" /> Hora
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="flex items-center">
                <User className="mr-2 h-4 w-4" /> {appointment.caregiver_name}
              </TableCell>
              <TableCell>{appointment.service_name}</TableCell>
              <TableCell>
                {new Date(appointment.date).toLocaleDateString('pt-BR')}
              </TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{getStatusBadge(appointment.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}