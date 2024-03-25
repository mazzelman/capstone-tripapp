import { faIgloo as faIglooSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faUser as faUserSolid } from "@fortawesome/free-solid-svg-icons";
import { faCompass as faCompassSolid } from "@fortawesome/free-solid-svg-icons";

export const navigationLinks = [
  {
    id: "1",
    name: "Home",
    icon: faIglooSolid,
    href: "/",
    isHeader: true,
    isFooter: true,
  },
  {
    id: "2",
    name: "Favorites",
    href: "/favorites",
    icon: faHeartSolid,
    isHeader: true,
    isFooter: true,
  },
  {
    id: "3",
    name: "My Trips",
    href: "/places",
    icon: faCompassSolid,
    isHeader: true,
    isFooter: true,
  },
  {
    id: "4",
    name: "Profile",
    href: "/profile",
    icon: faUserSolid,
    isHeader: true,
    isFooter: true,
  },
];
