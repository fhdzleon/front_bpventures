interface InvoiceInterface {
  id: number;
  number: string;
  amount: number;
  invoiceStatus?: { name: string, id: number };
  issueDate: string;
  dueDate: string;
  user?: { email: string };
  company?: { name: string };
  path?: string;

}
