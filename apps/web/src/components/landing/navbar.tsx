"use client";
import { useCopy } from "@/i18n/use-copy";

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/Link";
import { usePathname } from "next/navigation";
import { reportCaughtError } from "@repo/core/diagnostics";
import { withoutLocale } from "@/i18n/routing";
import { useLocale } from "next-intl";

type NavLink = { label: string; href: string; hint?: string };
type NavGroup = { label: string; items: NavLink[] };
type NavEntry = NavLink | NavGroup;

const NAV: NavEntry[] = [
  {
    label: "Product",
    items: [
      { label: "Features", href: "/features", hint: "Everything the platform does" },
      { label: "Apps", href: "/apps", hint: "Ready-to-deploy templates" },
      { label: "Email", href: "/mail", hint: "Your own mail server, any domain" },
      { label: "Desktop app", href: "/download", hint: "Mac, Windows and Linux" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Migrate", href: "/migrate" },
  { label: "Docs", href: "/docs" },
  {
    label: "Resources",
    items: [
      { label: "Compare", href: "/compare", hint: "Find the right home for your stack" },
      { label: "Blog", href: "/blog", hint: "Guides and product news" },
      { label: "Changelog", href: "/changelog", hint: "What shipped, release by release" },
      { label: "Support", href: "/support", hint: "Talk to the ServerDeck team" },
    ],
  },
];

const isGroup = (entry: NavEntry): entry is NavGroup => "items" in entry;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className="h-3 w-3 transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : undefined }}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  );
}

/** Dropdown inside the pill. Opens on hover with a mouse, on click or Enter otherwise. */
function NavDropdown({
  group,
  dark,
  open,
  onOpen,
  onClose,
}: {
  group: NavGroup;
  dark: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const copy = useCopy();

  const pathname = withoutLocale(usePathname());
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const active = group.items.some((i) => pathname === i.href || pathname?.startsWith(i.href + "/"));
  const canHover = () => window.matchMedia("(hover: hover)").matches;

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (!canHover()) return;
        clearTimeout(closeTimer.current);
        onOpen();
      }}
      onMouseLeave={() => {
        if (canHover()) closeTimer.current = setTimeout(onClose, 120);
      }}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onClose();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={(e) => (canHover() && e.detail > 0 ? onOpen() : open ? onClose() : onOpen())}
        className={`nav-pill-item flex items-center gap-1 rounded-full py-2 pl-3 pr-2.5 text-[14px] font-medium transition-all ${
          active || open ? "bg-[var(--th-sf-04)]" : ""
        }`}
        style={{ color: dark ? "rgba(255,255,255,.55)" : "var(--th-text-secondary)" }}
      >
        {copy(group.label)}
        <Chevron open={open} />
      </button>
      <div
        className={`absolute start-[-8px] top-[calc(100%+14px)] grid min-w-[290px] gap-0.5 rounded-[18px] border border-[var(--th-bd-default)] bg-[var(--th-bg-page)] p-2 shadow-[0_12px_32px_rgba(0,0,0,.10),0_2px_6px_rgba(0,0,0,.04)] transition-all duration-150 before:absolute before:inset-x-0 before:-top-3.5 before:h-3.5 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        {group.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--th-sf-04)]"
          >
            <span className="block text-[14px] font-semibold text-[var(--th-text-title)]">
              {copy(item.label)}
            </span>
            {item.hint && (
              <span className="block text-[12.5px] text-[var(--th-text-secondary)]">
                {copy(item.hint)}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const copy = useCopy();
  const locale = useLocale();

  const pathname = withoutLocale(usePathname());
  const [dark, setDark] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [stars, setStars] = useState<number | null>(null);
  const githubLabel =
    stars === null
      ? null
      : new Intl.NumberFormat(locale, {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(stars);
  const githubDescription =
    stars === null
      ? copy("Star ServerDeck on GitHub")
      : copy("ServerDeck on GitHub — {count} stars", { count: stars.toLocaleString(locale) });

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github-stars", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!controller.signal.aborted && Number.isSafeInteger(data?.stars) && data.stars >= 0) {
          setStars(data.stars);
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) reportCaughtError(error, "web/landing/navbar.github-stars");
      });
    return () => controller.abort();
  }, []);

  const handleScroll = useCallback(() => {
    const navBottom = 80;
    const darkEls = document.querySelectorAll('[data-section="dark"]');
    let inDark = false;
    darkEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= navBottom && rect.bottom > 0) inDark = true;
    });
    setDark(inDark);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const linkColor = dark ? "rgba(255,255,255,.55)" : "var(--th-text-secondary)";

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="site-container site-nav-bar flex items-center justify-between py-4">
        {/* ── Logo ────────────────────────────────────────────── */}
        <Link href="/" className="relative z-10 flex items-center gap-2.5">
          <img
            src="/serverdeck-logo.jpg"
            alt="ServerDeck"
            className="h-[30px] w-[30px] shrink-0 rounded-lg object-cover"
          />
          <span
            className="text-[16px] font-semibold tracking-[-0.01em]"
            style={{
              color: dark ? "rgba(255,255,255,.95)" : "var(--th-text-heading)",
              transition: "color .3s",
            }}
          >
            ServerDeck
          </span>
        </Link>
      </div>
    </header>
  );
}
