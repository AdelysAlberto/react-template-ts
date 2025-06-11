import Announcement from "./svg/announcement.svg";
import Books from "./svg/books.svg";
import IconCheckCircle from "./svg/icon-check-circle.svg";
import IconDarkMode from "./svg/icon-dark-mode.svg";
import IconError from "./svg/icon-error.svg";
import IconEye from "./svg/icon-eye.svg";
import IconHome from "./svg/icon-home.svg";
import IconInfoToolTip from "./svg/icon-info-tooltip.svg";
import IconMessage from "./svg/icon-message.svg";
import IconNotifications from "./svg/icon-notification.svg";
import IconProfile from "./svg/icon-profile.svg";
import IconSearch from "./svg/icon-search.svg";
import IconFacebook from "./svg/icons-facebook.svg";
import IconGoogle from "./svg/icons-google.svg";
import IconInstagram from "./svg/icons-instagram.svg";
import IconLinkedin from "./svg/icons-linkedin.svg";
import IconTelegram from "./svg/icons-telegram.svg";
import IconTiktok from "./svg/icons-tiktok.svg";
import IconTwitter from "./svg/icons-twitter.svg";
import IconWhatsapp from "./svg/icons-whatsapp.svg";
import IconYoutube from "./svg/icons-youtube.svg";
import Lock from "./svg/lock.svg";
import LogoCompleteWhite from "./svg/logo-complete-white.svg";
import LogoSecondary from './svg/logo-secondary.svg';
import LogoWhite from "./svg/logo-white.svg";

const SvgImage = {
  default: "",
  "logo-white": LogoWhite,
  "logo-secondary": LogoSecondary,
  "logo-complete-white": LogoCompleteWhite,
  "icon-facebook": IconFacebook,
  "icon-instagram": IconInstagram,
  "icon-linkedin": IconLinkedin,
  "icon-twitter": IconTwitter,
  "icon-youtube": IconYoutube,
  "icon-telegram": IconTelegram,
  "icon-whatsapp": IconWhatsapp,
  "icon-tiktok": IconTiktok,
  "icon-profile": IconProfile,
  "icon-lock": Lock,
  "icon-announcement": Announcement,
  "icon-book": Books,
  "icon-error": IconError,
  "icon-eye": IconEye,
  "icon-info-tooltip": IconInfoToolTip,
  "icon-check-circle": IconCheckCircle,
  "icon-dark-mode": IconDarkMode,
  "icon-google": IconGoogle,
  "icon-home": IconHome,
  "icon-message": IconMessage,
  "icon-search": IconSearch,
  "icon-notifications": IconNotifications,
};
export type TIconKeys = keyof typeof SvgImage;

export default SvgImage;
