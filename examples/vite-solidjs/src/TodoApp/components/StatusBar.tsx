import { Component } from "solid-js";
import type { FilterMode } from "../model";
import { model } from "../model";

// * ================================================================================

// * ---------------------------------------------------------------- StatusBar

export const StatusBar: Component = () => {
  const remainText = () => {
    const remainCount = model.getRemainCount();
    return `${remainCount} ${remainCount === 1 ? "item" : "items"} left`;
  };

  return (
    <footer className="footer">
      <span className="todo-count">{remainText()}</span>

      <ul className="filters">
        <FilterButton target="ALL" text="All" />
        <FilterButton target="ACTIVE" text="Active" />
        <FilterButton target="COMPLETED" text="Completed" />
      </ul>

      {model.getHasCompleted() && (
        <button className="clear-completed" onClick={model.clearCompleted}>
          Clear Completed
        </button>
      )}
    </footer>
  );
};

// * ---------------------------------------------------------------- FilterButton

const FilterButton: Component<{ target: FilterMode; text: string }> = ({ target, text }) => {
  return (
    <li>
      <a classList={{ selected: model.filter() === target }} onClick={() => model.changeVisibility(target)}>
        {text}
      </a>
    </li>
  );
};
