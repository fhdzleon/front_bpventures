import Link from "next/link";

export const ButtonAdd = ({ children, hrefString }: { children: React.ReactNode; hrefString: string  }) => {
  return (
    <>
      <Link href={hrefString} className="inline-flex"> 
        <button className="flex my-8  text-white font-futura p-2 rounded-full bg-[#2B4168] hover:bg-acent px-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8 text-white mr-2 col-start-2 md:col-start-1 md:size-6 text-secundary cursor-pointer "
          >
            <title>Ver Detalles</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {children}
        </button>
      </Link>
    </>
  );
};
