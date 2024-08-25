import React from "react";
import DeliverableWidget from "@/components/deliverableWidget/DeliverableWidget";
import InvoiceWidget from "@/components/invoiceWidget/InvoiceWidget";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 px-14 mt-20  ">
      <DeliverableWidget />
      <InvoiceWidget />
    </div>
  );
};

export default Dashboard;
