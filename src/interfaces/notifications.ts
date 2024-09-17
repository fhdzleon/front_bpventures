export interface Notification {
  note?: string;
  notificationType: {
    name: string;
  };
  impactedUser?: {
    Names?: string | null;
    LastName?: string | null;
  } | null;
  triggerUser: {
    Names: string;
    LastName: string;
  };
  deliverable?: {
    name: string;
    path: string;
  } | null;
  invoice?: {
    number: string;
  } | null;
  createdAt: string;
}
