type Customer = {
  phone: string;
  firstname: string;
  is_admin: boolean;
  date_registered: Date;
  premium: boolean;
  dashboard_secret: string;
  recent_code_refresh: Date;
};

type Goal = {
  id: string;
  value: string;
  frequency: string | null;
  phone: string;
  timestamp: Date;
};

type Request = {
  id: string;
  request_text: string;
  timestamp: Date;
  customer_phone: string;
};

export type { Customer, Goal, Request };
