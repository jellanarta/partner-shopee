"use client";

import { ResultProductState } from ".";

export default function Navigation({
  dataProduct,
  handleNavigations,
}: {
  dataProduct: ResultProductState;
  handleNavigations: (value: string) => void;
}) {

  const clickNextPrevData = (value:string)=>{
    if(!dataProduct.loading){
      handleNavigations(value)
    }
  }
  return (
    <div>
      <div id="hs-popover-to-destroy" className="flex justify-center gap-4">
        {/* Popover */}
        <div className="hs-tooltip [--trigger:click] [--placement:left] inline-block">
          <button
          onClick={()=>clickNextPrevData("prev")}
            type="button"
            className={`hs-tooltip-toggle ${
              dataProduct.data.currentPage === 1
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-50"
            } flex justify-center items-center size-10 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs  focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none`}
          >
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
        </div>
        {/* End Popover */}

        <div className="text-sm flex items-center text-gray-500 font-medium gap-1">
          <span className="text-gray-400">
            {dataProduct.data.currentPage}
          </span>{" "}
          <span>/</span> <span>{dataProduct.data.totalPages}</span>
        </div>

        {/* Popover */}
        <div className="hs-tooltip [--trigger:click] [--placement:right] inline-block">
          <button
          onClick={()=>clickNextPrevData("next")}
            type="button"
            className={`hs-tooltip-toggle ${
              dataProduct.data.currentPage === dataProduct.data.totalPages
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-50"
            } flex justify-center items-center size-10 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs  focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none`}
          >
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
        {/* End Popover */}
      </div>
    </div>
  );
}
