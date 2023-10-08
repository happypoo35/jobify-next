import { useEffect, useState } from "react";

const useMediaQuery = (device: "desktop" | "tablet" | "mobile") => {
  let query = "";

  switch (device) {
    case "desktop":
      query = "(min-width: 1024px)";
      break;
    case "tablet":
      query = "(max-width: 768px)";
      break;
    case "mobile":
      query = "(max-width: 576px)";
      break;
    default:
      break;
  }

  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    const listener = () => setMatches(!!matchMedia.matches);
    listener();

    matchMedia.addEventListener("change", listener);

    return () => matchMedia.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export default useMediaQuery;
