"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { weddingData } from "@/data/weddingData";
import styles from "./Navbar.module.css";

const links = [
  { href: "/#story", label: "Our Story" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/#dresscode", label: "Dress Code" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#venue", label: "Venue" },
  { href: "/guestbook", label: "Guestbook" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // only the homepage hero is dark; everywhere else the bar sits on paper
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`${styles.header} ${scrolled || open ? styles.solid : ""} ${
        overHero ? styles.onHero : ""
      }`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Home">
          <img
            className={styles.logo}
            src="/images/brand/logo-gold.png"
            alt="Ziraje Chance & Confiance Elysee"
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Main">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
          <Link href="/rsvp" className={styles.rsvpLink}>
            RSVP
          </Link>
        </nav>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ""}`}>
        <nav className={styles.mobileNav} aria-label="Mobile">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              style={{ transitionDelay: open ? `${0.12 + i * 0.05}s` : "0s" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/rsvp"
            className={`btn btnGold ${styles.mobileRsvp}`}
            style={{ transitionDelay: open ? "0.45s" : "0s" }}
            onClick={() => setOpen(false)}
          >
            RSVP Now
          </Link>
        </nav>
        <p className={styles.mobileFootnote}>
          {weddingData.date.display} · {weddingData.venue.name}
        </p>
      </div>
    </header>
  );
}
