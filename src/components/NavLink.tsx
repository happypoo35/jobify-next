"use client";

import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";

interface NavLinkProps
  extends LinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  exact?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  exact,
  children,
  ...props
}) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} data-active={isActive || undefined} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
