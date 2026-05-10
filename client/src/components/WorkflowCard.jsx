function WorkflowCard({
  title,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="bg-zinc-900 hover:bg-zinc-800 transition p-6 rounded-2xl text-left"
    >
      <h2 className="text-xl font-semibold">
        {title}
      </h2>
    </button>
  );
}

export default WorkflowCard;