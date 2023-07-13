export interface ITerminal {
  ticket_number: number;
  language: string;
  juraServices: IServices[];
  physicServices: IServices[];
}

export interface IServices {
  id: number;
  name: string;
  client_type: string;
  service_type: string;
  branch: number;
}
