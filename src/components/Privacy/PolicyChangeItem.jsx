export default function PolicyChangeItem({ date, change }) {
  return (
    <li className="flex gap-4">
      <div className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-primary"></div>
      <div>
        <span className="font-medium">{date}: </span>
        <span>{change}</span>
      </div>
    </li>
  );
}
