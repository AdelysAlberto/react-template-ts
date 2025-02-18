
interface IButton {
  title: string
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  onClick: () => void
  className?: string
  disabled?: boolean
  variant?: "primary" | "secondary" | "danger" | "tertiary" | "disabled";
  isLoading?: boolean
  id: string
}
const BaseButton: React.FC<IButton> = ({
  title,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  variant = "primary",
  isLoading = false,
  id = "button"
}) => {
  return (
    <div
      className={`btn btn-${variant} ${className}`}
    >
      <button
        id={id}
        type={type}
        onClick={onClick}
        className={` `}
        disabled={isLoading || disabled}
      >
        {isLoading ? "Loading..." : title}
      </button>
    </div>
  );
};

export default BaseButton;