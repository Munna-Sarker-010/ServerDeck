"use client";

import { Icon as UiIcon } from "@repo/ui/icons";

/**
 * The ⋮ help menu — support / report issue / feedback / docs / community.
 *
 * One definition, so every page header offers the same set of links in the same
 * order (it was previously inline in the project-detail page only). Drop it next
 * to a page's primary action.
 */

import DropdownMenu, { type MenuAction } from "@/components/ui/DropdownMenu";
import { useI18n } from "@/components/i18n-provider";
import { BRAND_LINKS } from "@repo/core";

/* Shared with the desktop app's NATIVE Help menu (apps/desktop/src/main/menu.ts),
   which cannot import from here. They were the same five URLs typed twice — which
   is how a docs link goes dead in one menu and stays fine in the other. */
const SUPPORT_URL = BRAND_LINKS.support;
const ISSUE_URL = BRAND_LINKS.issues;
const FEEDBACK_URL = BRAND_LINKS.contact;
const DOCS_URL = BRAND_LINKS.docs;
const COMMUNITY_URL = BRAND_LINKS.community;

const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

/** The actions themselves — exported so a page can append its own items. */
export function useHelpMenuActions(): MenuAction[] {
  return [];
}

export function HelpMenu({
  /** Extra page-specific items, prepended above the standard help links. */
  extraActions,
  className,
}: {
  extraActions?: MenuAction[];
  className?: string;
}) {
  if (!extraActions || extraActions.length === 0) {
    return null;
  }
  return (
    <DropdownMenu
      actions={extraActions}
      align="right"
      className={className}
      trigger={<UiIcon name="more-vertical" className="size-5 text-muted-foreground" />}
    />
  );
}
