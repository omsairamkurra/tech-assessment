export interface User {
  id?: number | null;
  name: string;
  email: string;
  addresses: Address[];
}

export interface Address {
  userId?: number | null;
  id?: number | null;
  street: string;
  city: string;
  country: string;
}
