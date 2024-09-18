import React from "react";

import DeliverablesList from "@/components/deliverablesView/DeliverablesList";

const Deliverables = () => {
  return (
    <div className="container max-w-full">
      <div className="container mx-20 py-6 max-w-[1400px] font-futura">
        <h1 className="text-4xl font-futura  text-secundary">Mis Archivos</h1>
        <DeliverablesList />
      </div>
    </div>
  );
};

export default Deliverables;
