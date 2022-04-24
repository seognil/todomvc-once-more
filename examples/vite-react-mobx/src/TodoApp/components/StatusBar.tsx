import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { changeVisibility, clearCompleted, filter, FILTER_MODE, hasCompleted, remainCount } from "../model/model";

// * ================================================================================

// * ---------------------------------------------------------------- StatusBar

export const StatusBar = observer(() => {
  const remainText = `${remainCount.get()} ${remainCount.get() === 1 ? "item" : "items"} left`;

  return (
    <footer className="footer">
      <span className="todo-count">{remainText}</span>

      <ul className="filters">
        <FilterButton value={FILTER_MODE.ALL} text="All" />
        <FilterButton value={FILTER_MODE.ACTIVE} text="Active" />
        <FilterButton value={FILTER_MODE.COMPLETED} text="Completed" />
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

const FilterButton = observer<{ value: FILTER_MODE; text: string }>(({ value, text }) => {
  return (
    <li>
      <a className={clsx({ selected: filter.get() === value })} onClick={() => changeVisibility(value)}>
        {text}
      </a>
    </li>
  );
});
