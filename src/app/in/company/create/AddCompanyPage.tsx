import BackButton from "@/components/Buttons/BackButton";
import AddCompanyComponent from "@/components/company/AddCompanyComponent";

const AddCompanyPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center m-6">
        <BackButton />
      </div>
      <AddCompanyComponent />
    </div>
  );
};

export default AddCompanyPage;
