"use client"

import { Facebook, Instagram, Linkedin } from "@/components/ui/social-icons"


export default function Footer() {
  const contacts = [
    { name: "Sreyasi Mondal", phone: "9883177160" },
    { name: "Debangkita Saha", phone: "8777494652" },
    { name: "Debangshu Chatterjee", phone: "6290277345" },
  ]

  return (
    <footer id="contact" className={`bg-card/50 backdrop-blur-sm border-t border-border `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold tracking-wide mb-6 text-[#fffffe]">
          Contact Us
        </h2>

        {/* Click-to-call CTAs (smaller) */}
        <ul className="max-w-3xl mx-auto text-center space-y-3">
          {contacts.map((c) => (
            <li key={c.phone} className="text-sm sm:text-base">
              <a href={`tel:${c.phone}`} aria-label={`Call ${c.name}`} className="contactRow">
                <span className="name">{c.name}</span>
                <span className="dash">-</span>
                <span className="phoneChip">{c.phone}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom bar (smaller) */}
        <div
          className="mt-8 pt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid #7f1d1d66" }}
        >
          <p className="text-xs sm:text-sm text-[#fffffecc] text-center sm:text-left">
            © 2025 Code Voyage
          </p>

          <div className="flex items-center justify-center gap-4">
            <a href="https://www.instagram.com/iemhackoasis2.0?igsh=YmdoMGE2eWw5bmVj" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="iconLink">
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a href="https://www.linkedin.com/company/your_company" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="iconLink">
              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a href="https://www.facebook.com/share/1D1VUXVaWi/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="iconLink">
              <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contactRow {
          display: inline-flex;
          align-items: center;
          gap: 8px;                 /* tighter gap */
          padding: 6px 12px;        /* smaller padding */
          border-radius: 12px;      /* slightly smaller radius */
          color: #fffffe;
          text-decoration: none;
          background: linear-gradient(90deg, rgba(220, 38, 38,0.16), rgba(220, 38, 38,0.08));
          border: 1px solid rgba(248, 113, 113,0.3);
          transition: transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease, background 120ms ease;
        }
        .contactRow:hover {
          transform: translateY(-1px);
          background: linear-gradient(90deg, rgba(220, 38, 38,0.24), rgba(220, 38, 38,0.14));
          border-color: rgba(248, 113, 113,0.5);
          box-shadow: 0 8px 18px rgba(220, 38, 38,0.18);
        }
        .name { color: #fffffe; font-weight: 600; }
        .dash { color: #ffffff80; }
        .phoneChip {
          color: #fffffe;           /* strong contrast */
          font-weight: 800;
          letter-spacing: 0.25px;
          padding: 2px 8px;         /* slimmer chip */
          border-radius: 9px;
          background: linear-gradient(90deg, rgba(220, 38, 38,0.28), rgba(220, 38, 38,0.16));
          border: 1px solid rgba(248, 113, 113,0.5);
          text-shadow: 0 0 5px rgba(0,0,0,0.35);
        }
        .iconLink {
          color: #fffffecc;
          transition: color 180ms ease, filter 180ms ease, transform 180ms ease;
        }
        .iconLink:hover {
          color: #fffffe;
          filter: drop-shadow(0 0 6px rgba(220, 38, 38,0.55));
          transform: translateY(-1px);
        }
      `}</style>
    </footer>
  )
}
