import { Component } from "solid-js";
import { FILTER_MODE } from "../model/model";
import { model } from "../model/model";

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
        <FilterButton target={FILTER_MODE.ALL} text="All" />
        <FilterButton target={FILTER_MODE.ACTIVE} text="Active" />
        <FilterButton target={FILTER_MODE.COMPLETED} text="Completed" />
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

const FilterButton: Component<{ target: FILTER_MODE; text: string }> = ({ target, text }) => {
  return (
    <li>
      <a classList={{ selected: model.filter() === target }} onClick={() => model.changeVisibility(target)}>
        {text}
      </a>
    </li>
  );
};
