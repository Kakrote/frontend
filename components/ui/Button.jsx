"use client"
export function Button({ children, className = '', ...props }) {
    return (
      <button
        className={`bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
  