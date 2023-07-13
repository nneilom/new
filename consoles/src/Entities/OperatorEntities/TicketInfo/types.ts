export interface ServingTicket {
  servingTicket: ICurrentTicket;
}

export interface ICurrentTicket {
  id: number;
  service: IService;
  ticket_number: string;
}

interface IService {
  name: string;
}

export interface OperatorList {
  operatorList: IOperator[];
}

export interface IOperator {
  operator_id: number;
  name: string;
  is_available: boolean;
  ticket_status: string;
}
