const data = {
  list: [
    10,
    20,
    {
      nest: [30, 40],
      val: 50,
    },
    60,
  ],
};

// * -------------------------------- without immer

// * when you patching a complex immutable data in js without tools

{
  // * change value 40 to 90

  setState((data) => {
    const nextList = [...data.list];
    const nextInnerObj = { ...data.list[2] };
    nextList[2] = nextInnerObj;
    nextInnerObj.nest = [...nextInnerObj.nest];
    nextInnerObj.nest[1] = 90;

    const nextData = {
      list: nextList,
    };

    return nextData;
  });
}

// * -------------------------------- immer equivalent

import { produce } from "immer";

{
  // * change value 40 to 90

  setState((data) =>
    produce(data, (draft) => {
      draft.list[2].nest[1] = 90;
    }),
  );
}
