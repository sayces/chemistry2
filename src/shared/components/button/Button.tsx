interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  img?: string;
}

const Button = ({
  text,
  onClick,
  disabled,
  className,
  type,
  img,
}: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {img && <img src={img} alt="" className="w-[24px] h-[24px]" />}
      <p className="text-[24px] font-medium text-white">{text}</p>
    </button>
  );
};

export default Button;
