interface CardProps {
  title: string;
  description: string;
  date: string;
  link: string;
}

export const Card = (props: CardProps) => (
  <a
    href={props.link}
    className="flex max-w-sm flex-col justify-between rounded-xl bg-shorebirdBg3 bg-clip-border text-white shadow-md hover:bg-shorebirdBg3Hover"
  >
    <div className="p-6">
      <h5 className="text-blue-gray-900 mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
        <span className="hover:underline">{props.title}</span>
        <p className="mb-3 text-xs font-light text-gray-400">{props.date}</p>
      </h5>
      <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
        {props.description}
      </p>
    </div>
  </a>
);
