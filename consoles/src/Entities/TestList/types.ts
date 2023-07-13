export interface TicketState {
  ticketsInServe: ITicket[];
  ticketsInQueue: ITicket[];
  isLoading: boolean;
  error: string;
}

export interface ITicket {
  id: number;
  number: string;
  created_at: string;
  actual_waiting_time: string;
  status: string;
  operator: IOperator;
  is_veteran: boolean;
}
type IOperator = {
  id: number;
  name: number;
  is_available: boolean;
  email: string;
  window_number: string;
  position: string;
};
