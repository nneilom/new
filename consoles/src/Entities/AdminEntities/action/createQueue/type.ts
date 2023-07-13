export interface ICreateQueue {
  start_of_day: string;
  end_of_day: string;
  description: string;
  branch: number;
}

export interface ITicketForGetIdBranch {
  address: string;
  contact_number: string;
  description: string;
  email: string;
  id: number;
  name: string;
}
