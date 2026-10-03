const PRIORITY_STYLES = {
  urgent: { tag: "tag-vintage tag-advanced", marker: "[!]" },
  high: { tag: "tag-vintage tag-intermediate", marker: "" },
  low: { tag: "tag-vintage", marker: "" },
};

const STATUS_STYLES = {
  pending: { tag: "tag-vintage tag-draft", label: "Pending" },
  in_progress: { tag: "tag-vintage tag-intermediate", label: "In progress" },
  completed: { tag: "tag-vintage tag-published", label: "Completed" },
};

export default function Task_card_as_admin({ task }) {
  const priority = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.low;
  const status = STATUS_STYLES[task.status] || STATUS_STYLES.pending;
  const is_done = task.status === "completed";

  return (
    <article className="card-vintage-hover flex flex-col gap-3 min-h-52 mb-2">
      <div className="flex justify-between items-center gap-3">
        <span className={`${priority.tag} capitalize`}>
          {priority.marker && (
            <span className="text-mark mr-1.5">{priority.marker}</span>
          )}
          {task.priority}
        </span>
        <span className={status.tag}>{status.label}</span>
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className={`text-heading-md font-bold truncate ${
            is_done ? "text-fade line-through" : "text-parchment"
          }`}
        >
          {task.title}
        </h3>
        <p className="text-caption-md leading-normal text-prose line-clamp-3">
          {task.description}
        </p>
      </div>

      <div className="flex flex-col border-t border-hairline pt-2 text-caption-md leading-normal">
        <div className="flex justify-between items-center gap-3">
          <span className="text-fade">Manager</span>
          <span className="text-chalk truncate">
            {task.manager?.name }
          </span>
        </div>
        <div className="flex justify-between items-center gap-3">
          <span className="text-fade">Worker</span>
          <span
            className={`truncate ${task.assigned_to ? "text-chalk" : "text-dim"}`}
          >
            {task.assigned_to?.name }
          </span>
        </div>
      </div>
    </article>
  );
}
