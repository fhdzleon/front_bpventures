import Link from "next/link";

export const ButtonAdd = ({ children, hrefString }: { children: React.ReactNode; hrefString: string }) => {
  return (
    <Link href={hrefString} className="inline-flex">
      <button className="flex my-8 text-white font-futura p-2 rounded-full bg-[#2B4168] hover:bg-[#4a9c80] px-5 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white mr-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        {children}
      </button>
    </Link>
  );
};
