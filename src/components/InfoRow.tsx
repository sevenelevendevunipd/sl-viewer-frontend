const InfoRow = ({
  caption,
  value,
}: {
  caption: string;
  value: string | number | JSX.Element;
}) => (
  <div className="flex justify-content-between mb-3">
    <span className="text-color font-bold">{caption}</span>
    <span className="text-right ml-2">{value}</span>
  </div>
);

export default InfoRow;
