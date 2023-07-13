export interface IEmployAllGetInAdminPage {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
  position: string;
  access_level: string;
}
export interface IRegistrator {
  user_id: number;
  branch_id: number;
  is_available: boolean;
}

export interface ITicketForGetIdBranch {
  address: string;
  contact_number: string;
  description: string;
  email: string;
  id: number;
  name: string;
}

export interface IRegisterList {
  branch_id: number;
  user: {
    id: 1;
    last_name: string;
    first_name: string;
    email: string;
    position: string;
    window_number: string;
  };
  branch: {
    id: number;
    name: string;
    address: string;
    contact_number: string;
    email: string;
    description: string;
  };
  user_id: number;
  is_available: boolean;
}
