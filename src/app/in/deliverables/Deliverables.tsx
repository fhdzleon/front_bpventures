import React from "react";
import Searchbar from "@/components/deliverablesView/Searchbar";
import DeliverablesList from "@/components/deliverablesView/DeliverablesList";
import UploadDeliverable from "@/components/deliverablesActions/UploadDeliverable";
import FilterDeliverableForBussines from "@/components/filterDeliverableForBussines/FilterDeliverableForBussines";

const Deliverables = () => {
  return (
    <div className="container mx-auto py-6 w-4/5 font-futura">
      <h1 className="text-4xl font-futura  text-secundary">Mis Archivos</h1>
      {/* <Searchbar /> */}
      <UploadDeliverable />
      <FilterDeliverableForBussines />

      <DeliverablesList />
    </div>
  );
};

export default Deliverables;
