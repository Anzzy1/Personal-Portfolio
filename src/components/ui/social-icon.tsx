import {
  DiscordLogoIcon,
  FacebookLogoIcon,
  GithubLogoIcon,
  GlobeSimpleIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  TiktokLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

const icons: Record<string, Icon> = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  facebook: FacebookLogoIcon,
  instagram: InstagramLogoIcon,
  tiktok: TiktokLogoIcon,
  discord: DiscordLogoIcon,
  x: XLogoIcon,
};

export function SocialIcon({ label, className }: { label: string; className?: string }) {
  const Icon = icons[label.toLowerCase()] ?? GlobeSimpleIcon;
  return <Icon className={className} weight="regular" />;
}
