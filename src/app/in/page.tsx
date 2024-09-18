import React, { lazy } from "react";
const DeliverableWidget = (lazy(()=>import('@/components/deliverableWidget/DeliverableWidget')));
const InvoiceWidget = (lazy(()=>import('@/components/invoiceWidget/InvoiceWidget')));
import Notifications from "@/components/notificationsWidget/Notifications";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 px-14 lg:px-5 mt-5">
        <DeliverableWidget />
        <InvoiceWidget />
      </div>
      <Notifications />
    </>
  );
};

export default Dashboard;
