export default function Enterbutton() {
    return (
<div className="flex justify-end mb-8">
<button
     type="submit"
     className="bg-white shadow-md px-5 py-3 rounded flex items-center justify-between w-32 hover:bg-gray-50 transition-colors hover:scale-95"
 >
     <span className="font-ag-futura">Enter</span>
     <Icon icon="uil:enter" width={24} height={30} />
 </button>
 </div>
    );
}