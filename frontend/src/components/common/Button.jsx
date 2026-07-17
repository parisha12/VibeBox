import React from 'react';

function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        bg-pink-500
        hover:bg-pink-600
        active:scale-95
        transition-all
        duration-200
        text-white
        font-semibold
        py-3
        rounded-xl
        shadow-md
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
