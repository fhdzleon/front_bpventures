import React from "react";
import LinkDeliverablesProps from "@/interfaces/LinkDeliverablesProps";

const LinkDeliverable: React.FC<LinkDeliverablesProps> = ({ path }) => {
  return (
    <div>
      <a href={path} target="_blank" rel="noopener noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 mx-auto hover:text-accent hover:text-acent cursor-pointer"
        >
          <title>Abrir link</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          />
        </svg>
      </a>
    </div>
  );
};

export default LinkDeliverable;
