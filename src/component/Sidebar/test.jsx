import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  // Lock background scroll while the mobile drawer is open, and make sure
  // it never gets stuck locked if the component unmounts mid-open.
  useEffect(() => {
    if (open) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [open]);

  return (
    <>
      {/* زر الموبايل */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 left-3 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow md:hidden"
      >
        <Menu size={18} />
      </button>

      {/*
        Portal everything below straight into document.body.
        This is the actual fix: if any parent up the tree has a CSS
        `transform` (e.g. a framer-motion page-transition wrapper),
        `position: fixed` inside it becomes fixed to THAT element
        instead of the viewport — which is why the sidebar drifted
        and clipped while scrolling. Rendering outside the React tree
        via a portal guarantees it's fixed to the real viewport.
      */}
      {createPortal(
        <>
          {/* Overlay */}
          <div
            onClick={() => setOpen(false)}
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
              open ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          />

          {/* Sidebar */}
          <aside
            className={`
              fixed inset-y-0 left-0 z-50 w-72 h-dvh bg-white shadow-xl
              overflow-y-auto
              transform transition-transform duration-300
              ${open ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            {/* Header داخل السايدبار */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Menu</h2>

              {/* زر إغلاق (موبايل فقط) */}
              <button
                onClick={() => setOpen(false)}
                className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <nav className="p-4 space-y-2">
              <a className="block rounded-lg px-3 py-2 hover:bg-primary-light hover:text-primary">
                Dashboard
              </a>

              <a className="block rounded-lg px-3 py-2 hover:bg-primary-light hover:text-primary">
                Tasks
              </a>

              <a className="block rounded-lg px-3 py-2 hover:bg-primary-light hover:text-primary">
                Settings
              </a>
            </nav>
          </aside>
        </>,
        document.body
      )}
    </>
  );
};
