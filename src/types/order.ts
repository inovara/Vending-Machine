export type Order = {
  status?: string;
  confirmationDate?: string;
  deliveryDate?: string;
  deliveredDate?: string;
  confirmedAt?: string;
  deliveryAt?: string;
  district?: string;
  deliveredAt?: string;
  payment_status?: string;
  clientAddress?: {
    name?: string;
    street?: string;
    city?: string;
    country?: string;
    district?: string;
    zipCode?: string;
  };
  user?: {
    name?: string;
    phone?: string;
    email?: string;
  };
};

