"use client";

import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire sur WhatsApp"
      className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <MessageCircle size={28} fill="white" className="text-[#25D366]" />
    </a>
  );
}
