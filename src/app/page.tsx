import SideBar from "./components/SideBar";

export default function Page() {
  return (
    <>
    <SideBar>
      <div>
      <div className="lg:hidden py-16 text-center">
        <button
          type="button"
          className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-2xs align-middle hover:bg-gray-950 focus:outline-hidden focus:bg-gray-900"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-sidebar-header"
          aria-label="Toggle navigation"
          data-hs-overlay="#hs-sidebar-header"
        >
          Open
        </button>
      </div>
      </div>
    </SideBar>
    </>
  );
}
