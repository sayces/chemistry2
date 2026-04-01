interface LinkProps {
  text: string;
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  download?: string;
}

const Link = ({ text, href, target, rel, download }: LinkProps) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      download={download}
      className="flex justify-center items-center"
    >
      <p className="text-[24px] font-medium text-white">{text}</p>
    </a>
  );
};

export default Link;
