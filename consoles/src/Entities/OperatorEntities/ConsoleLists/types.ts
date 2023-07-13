export interface Queues {
  tickets: ITicketWait[];
  ticketsInWaitingList: ITicketWait[];
}

export interface ITicketWait {
  id: number;
  service: ServiceType;
  status: string;
  ticket_number: string;
  priority: string;
}

type ServiceType = {
  id: number;
  name: string;
  client_type: string;
};
