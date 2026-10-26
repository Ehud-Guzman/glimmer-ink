import { forwardRef } from "react";
import { Link as RouterLink, NavLink as RouterNavLink } from "react-router-dom";

// Netlify serves every page as <route>/index.html and 301s the bare form
// (/about) to /about/. Links that render the bare form make Google follow a
// redirect on every crawl ("Page with redirect" in Search Console), so internal
// links always point at the trailing-slash URL that answers 200. See pageUrl.js.
const withSlash = (to) => {
  if (typeof to === "string") {
    if (!to.startsWith("/")) return to;
    const [path, ...rest] = to.split(/(?=[?#])/);
    return `${path.endsWith("/") ? path : `${path}/`}${rest.join("")}`;
  }
  if (to && typeof to.pathname === "string") {
    return { ...to, pathname: withSlash(to.pathname) };
  }
  return to;
};

export const Link = forwardRef(({ to, ...props }, ref) => <RouterLink ref={ref} to={withSlash(to)} {...props} />);
Link.displayName = "Link";

export const NavLink = forwardRef(({ to, ...props }, ref) => <RouterNavLink ref={ref} to={withSlash(to)} {...props} />);
NavLink.displayName = "NavLink";
