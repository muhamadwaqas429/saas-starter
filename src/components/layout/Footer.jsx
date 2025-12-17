import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white shadow px-6 py-4 text-center text-gray-500">
      &copy; {new Date().getFullYear()} SaaS Starter. All rights reserved.
    </footer>
  );
}
