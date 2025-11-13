export const Ic = {
  Logo: (p: any) => (
    <svg width="140" height="28" viewBox="0 0 180 40" {...p}>
      <text x="38" y="24" fontFamily="Inter, Arial" fontSize="18" fontWeight="800" fill="#0F172A">ALQUILA</text>
      <text x="118" y="24" fontFamily="Inter, Arial" fontSize="18" fontWeight="800" fill="#34D5C6">360</text>
      <path d="M20 6 l8 6 v8 l-8 6 l-8 -6 v-8 z" fill="none" stroke="#34D5C6" strokeWidth="2"/>
      <circle cx="20" cy="20" r="4" fill="#34D5C6"/>
    </svg>
  ),
  Burger: (p:any)=>(<svg viewBox="0 0 24 24" width="26" height="26" {...p}><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  User: (p:any)=>(<svg viewBox="0 0 24 24" width="26" height="26" {...p}><circle cx="12" cy="8" r="4" stroke="currentColor" fill="none" strokeWidth="2"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" fill="none" strokeWidth="2"/></svg>),
  Gear: (p:any)=>(<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path d="M10 2h4l1 3 3 1v4l-3 1-1 3h-4l-1-3-3-1V6l3-1 1-3z" stroke="currentColor" fill="none" strokeWidth="2"/><circle cx="12" cy="12" r="3"/></svg>),
  Logout:(p:any)=>(<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M13 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8" stroke="currentColor" strokeWidth="2" fill="none"/></svg>),
  Chart:(p:any)=>(<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path d="M4 20V4M4 20H20M8 16v-5M12 20V8M16 20v-7" stroke="currentColor" strokeWidth="2" fill="none"/></svg>),
  File:(p:any)=>(<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12V8z" stroke="currentColor" fill="none" strokeWidth="2"/><path d="M14 2v6h6"/></svg>),
  Dollar:(p:any)=>(<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path d="M12 1v22M17 6a4 4 0 0 0-4-3H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H7a4 4 0 0 1-4-4" stroke="currentColor" fill="none" strokeWidth="2"/></svg>),
  Ticket:(p:any)=>(<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path d="M4 8h16v8H4z" stroke="currentColor" fill="none" strokeWidth="2"/><path d="M8 8v8M16 8v8" stroke="currentColor" strokeWidth="2"/></svg>),
  Report:(p:any)=>(<svg viewBox="0 0 24 24" width="18" height="18" {...p}><rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" fill="none" strokeWidth="2"/><path d="M8 10h8M8 14h8M8 6h5" stroke="currentColor" strokeWidth="2"/></svg>),
  Users:(p:any)=>(<svg viewBox="0 0 24 24" width="18" height="18" {...p}><circle cx="8" cy="8" r="3" stroke="currentColor" fill="none" strokeWidth="2"/><circle cx="16" cy="11" r="3" stroke="currentColor" fill="none" strokeWidth="2"/><path d="M2 21c0-3.5 3.5-5 6-5M12 21c0-3 3-4 5-4" stroke="currentColor" strokeWidth="2" fill="none"/></svg>)
};
