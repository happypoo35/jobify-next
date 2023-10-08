import Link from "next/link";
import JobifyLogo from "@/assets/logo.svg";

const Logo = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      href="/"
      aria-label="Jobify logo/ link to main page"
      style={{ fontSize: "3.125rem" }}
      {...props}
    >
      <JobifyLogo />
    </Link>
  );
};

export default Logo;
