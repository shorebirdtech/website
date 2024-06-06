interface CardProps {
  title: string;
  description: string;
  date: string;
  link: string;
}

export const Card = (props: CardProps) => (
  <div className="flex max-w-sm flex-col justify-between rounded-xl bg-shorebirdBg3 bg-clip-border text-white shadow-md">
    <div className="p-6">
      <h5 className="text-blue-gray-900 mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
        <a className="hover:underline" href={props.link}>
          {props.title}
        </a>
        <p className="mb-3 text-xs font-light text-gray-400">{props.date}</p>
      </h5>
      <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
        {props.description}
      </p>
    </div>
    <div className="flex flex-col p-6 pt-0">
      <a
        href={props.link}
        className="select-none rounded-lg bg-shorebirdPrimary px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:bg-[#0196C0] hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Read More
      </a>
    </div>
  </div>
);
