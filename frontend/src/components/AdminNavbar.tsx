
export function AdminNavbar() {
  return (
    <>
      <header className="flex justify-between items-center w-[calc(100%-16rem)] ml-64 px-8 py-4 sticky top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl z-40 shadow-sm dark:shadow-none">
<div className="flex items-center gap-6">
<div className="relative w-96">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
<input className="w-full bg-surface-container border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" placeholder="Global system search..." type="text"/>
</div>
</div>
<div className="flex items-center gap-4">
<button className="p-2 text-slate-500 hover:bg-blue-50/50 transition-all rounded-lg relative">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-slate-50"></span>
</button>
<button className="p-2 text-slate-500 hover:bg-blue-50/50 transition-all rounded-lg">
<span className="material-symbols-outlined" data-icon="sensors">sensors</span>
</button>
<div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
<div className="flex items-center gap-3">
<div className="text-right">
<p className="text-xs font-bold text-on-surface">Alex Thompson</p>
<p className="text-[10px] text-slate-500 font-medium">Lead Administrator</p>
</div>
<img alt="Administrator Profile" className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/10" data-alt="professional headshot of a confident administrator in a clean office environment with soft studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFo6U3xKL1typG1ww1CzcXRm-UUoDh6-n1SkFJW4fY1h8PFv4Gqe1bOBXKGoYkOruZ1PqU45V4ThNq_z2Ol50fs9061gf4DcGbZE7AuSPSELF2VaIDy9TGeuluxdAq9GEd_9BCvhhZ1ily9FFG9b8N2OhAG1MFOtAmmgFavEwyzq9X3JNNC-qQc4P-GaytTBr_yRex-KT3A3OMFjrMBzsFL0CNsEf4jNNBvQ53eko1i7RgqYOTmQ8lcLVpjg4KYDocUieQTVXIuo0"/>
</div>
</div>
</header>
    </>
  );
}
