import clsx from "clsx";
import type { FC } from "react";
import { FILTER_MODE, useTodoModel } from "../model/model";

// * ================================================================================

// * ---------------------------------------------------------------- StatusBar

export const StatusBar: FC = () => {
  const model = useTodoModel();
  const remainCount = model.getRemainCount();
  const hasCompleted = model.getHasCompleted();
  const clearCompleted = model.clearCompleted;
  const remainText = `${remainCount} ${remainCount === 1 ? "item" : "items"} left`;

  return (
    <footer className="footer">
      <span className="todo-count">{remainText}</span>

      <ul className="filters">
        <FilterButton target={FILTER_MODE.ALL} text="All" />
        <FilterButton target={FILTER_MODE.ACTIVE} text="Active" />
        <FilterButton target={FILTER_MODE.COMPLETED} text="Completed" />
      </ul>

      {hasCompleted && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear Completed
        </button>
      )}
    </footer>
  );
};

// * ---------------------------------------------------------------- FilterButton

const FilterButton: FC<{ target: FILTER_MODE; text: string }> = ({ target, text }) => {
  const model = useTodoModel();
  const filter = model.getFilterValue();
  const changeVisibility = model.changeVisibility;

  return (
    <li>
      <a className={clsx({ selected: filter === target })} onClick={() => changeVisibility(target)}>
        {text}
      </a>
    </li>
  );
};
