import clsx from "clsx";
import { observer } from "mobx-react-lite";
import type { FilterMode } from "../model";
import { changeVisibility, clearCompleted, filter, hasCompleted, remainCount } from "../model";

// * ================================================================================

// * ---------------------------------------------------------------- StatusBar

export const StatusBar = observer(() => {
  const remainText = `${remainCount.get()} ${remainCount.get() === 1 ? "item" : "items"} left`;

  return (
    <footer className="footer">
      <span className="todo-count">{remainText}</span>

      <ul className="filters">
        <FilterButton value={"ALL"} text="All" />
        <FilterButton value={"ACTIVE"} text="Active" />
        <FilterButton value={"COMPLETED"} text="Completed" />
      </ul>

      {hasCompleted.get() && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear Completed
        </button>
      )}
    </footer>
  );
});

// * ---------------------------------------------------------------- FilterButton

const FilterButton = observer<{ value: FilterMode; text: string }>(({ value, text }) => {
  return (
    <li>
      <a className={clsx({ selected: filter.get() === value })} onClick={() => changeVisibility(value)}>
        {text}
      </a>
    </li>
  );
});
