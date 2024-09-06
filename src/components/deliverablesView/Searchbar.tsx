
// const [searchTerm, setSearchTerm] = useState<string>("");
// const filteredDeliverables = deliverableData?.filter((deliverable: { deliverableName: string; }) =>
//   deliverable.deliverableName.toLowerCase().includes(searchTerm.toLowerCase())
// );

// <div>
// <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />


// </div>
//    {/* {filteredDeliverables && filteredDeliverables.length > 0 ? (
//                   filteredDeliverables
//                   .sort(
//                           (a: any, b: any) =>
//                             b.deliverableIsFolder - a.deliverableIsFolder
//                         )
//                         .map((deliverable: any) => ( */}
import { useAuth } from '@/context/AuthContext';
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const { deliverableData } = useAuth();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDeliverables = deliverableData?.filter((deliverable: { deliverableName: string; }) =>
    deliverable.deliverableName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex mt-5 items-center">

      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8 bg-slate-300 h-12 px-1 rounded-l-2xl"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>


      <div>
        <input
          className="bg-slate-300 w-40 font-sans text-xs md:text-lg h-12 md:w-96 outline-none placeholder-secundary px-3"
          type="text"
          placeholder="Buscar por nombre de archivo"
          aria-label="Buscar por nombre de archivo"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>


      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-11 h-12 bg-slate-300 px-2 rounded-r-2xl"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
      </div>

    </div>
  );
};

export default SearchBar;
