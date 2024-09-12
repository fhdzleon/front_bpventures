interface InvoiceInterface {
  permissionTypes: any;
  invoiceType: string;
  invoicePath: any;
  invoiceCategory: any;
  invoiceName: any;
  permissions: any;
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
