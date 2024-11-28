export interface User {
    id: string;
    email: string;
  }
  
  export interface Query {
    users: User[];
  }