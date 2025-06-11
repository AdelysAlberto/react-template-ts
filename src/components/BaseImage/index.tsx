import listIcons, { type TIconKeys } from "../../assets/index";

interface TBaseImage {
  image?: TIconKeys;
  width?: number | string;
  height?: number | string;
  alt?: string;
  style?: string;
  onClick?: () => void;
  lazy?: boolean;
  iconColor?: string;
  id?: string;
  className?: string;
  decorative?: boolean; // NUEVO: define si la imagen es solo decorativa
}

const BaseImage = ({
  image = "logo-white",
  iconColor = "",
  width = 28,
  height = 28,
  alt = "",
  style = "",
  onClick,
  lazy = false,
  className,
  decorative = false,
  id,
}: TBaseImage) => {
  const src = listIcons[image] ?? image;
  const isClickable = typeof onClick === "function";
  const loading = lazy ? ("lazy" as const) : ("eager" as const);

  const commonProps = {
    src,
    width,
    height,
    loading,
    className: `${iconColor} ${style} ${className}`.trim(),
    style: { cursor: isClickable ? "pointer" : "default" },
    id,
  };

  if (isClickable) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClick?.()}
        aria-label={alt || "Interactive image"}
        {...commonProps}
      >
        <img
          {...commonProps}
          alt={alt}
          title={alt}
          aria-hidden="true" // Ocultamos la imagen real y usamos label en contenedor
        />
      </div>
    );
  }

  return (
    <img
      {...commonProps}
      alt={decorative ? "" : alt}
      aria-hidden={decorative ? "true" : undefined}
    />
  );
};

export default BaseImage;
