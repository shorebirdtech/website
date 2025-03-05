function Ellipse({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
    >
      <circle cx="10" cy="10.5" r="4" fill="url(#paint0_linear_3053_5381)" />
      <circle
        cx="10"
        cy="10.5"
        r="7"
        stroke="url(#paint1_linear_3053_5381)"
        strokeOpacity="0.25"
        strokeWidth="6"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3053_5381"
          x1="6"
          y1="10.5"
          x2="14"
          y2="10.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#46CEFF" />
          <stop offset="1" stopColor="#17FFCD" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3053_5381"
          x1="6"
          y1="10.5"
          x2="14"
          y2="10.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#46CEFF" />
          <stop offset="1" stopColor="#17FFCD" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export { Ellipse };
