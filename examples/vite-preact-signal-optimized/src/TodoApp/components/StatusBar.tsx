import clsx from "clsx";
import type { FunctionalComponent as FC } from "preact";
import { changeVisibilityFilter, clearCompleted, filter, FilterMode, hasCompleted, remainCount } from "../model";

// * ================================================================================

// * ---------------------------------------------------------------- StatusBar

export const StatusBar: FC = () => {
  const remainText = `${remainCount.value} ${remainCount.value === 1 ? "item" : "items"} left`;

  return (
    <footer className="footer">
      <span className="todo-count">{remainText}</span>

      <ul className="filters">
        <FilterButton target="ALL" text="All" />
        <FilterButton target="ACTIVE" text="Active" />
        <FilterButton target="COMPLETED" text="Completed" />
      </ul>

      {hasCompleted.value && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear Completed
        </button>
      )}
    </footer>
  );
};

// * ---------------------------------------------------------------- FilterButton

const FilterButton: FC<{ target: FilterMode; text: string }> = ({ target, text }) => {
  return (
    <li>
      <a className={clsx({ selected: filter.value === target })} onClick={() => changeVisibilityFilter(target)}>
        {text}
      </a>
    </li>
  );
};
