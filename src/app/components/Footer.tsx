export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-4 lg:px-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <p className="text-sm text-gray-500">
          Copyright © 2026 Securities and Futures Commission. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-1 text-sm text-[#1a56b0]">
          <a href="#" className="hover:underline">Maintenance Schedule</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:underline">Privacy Policy Statement</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:underline">Terms of use</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:underline">Contact us</a>
        </div>
      </div>
    </footer>
  );
}
