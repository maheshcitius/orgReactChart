import { actionTypes } from "./actionTypes";
import JSONDigger from "json-digger";

export const chartActions = {
  getChart,
  updateChartNode,
  removeChartNode,
  addChartSibling,
  addChartChild,
};

function getChart() {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CHART });
  };
}

function removeChartNode(ids, node) {
  return async (dispatch, getState) => {
    const { chart } = getState();
    const type = actionTypes.REMOVE_CHILD;
    const newData = await digg(ids, { chart, node, type });
    dispatch({ type: actionTypes.UPDATE, payload: newData });
  };
}

function addChartChild(ids, node) {
  return async (dispatch, getState) => {
    const { chart } = getState();
    const type = actionTypes.ADD_CHILD;
    const newData = await digg(ids, { chart, node, type });
    dispatch({ type: actionTypes.UPDATE, payload: newData });
  };
}
function addChartSibling(ids, node) {
  return (dispatch, getState) => {
    const { chart } = getState();
    const type = actionTypes.ADD_SIBBLING;
    const newData = digg({ chart, ids, node, type });
    dispatch({ type: actionTypes.UPDATE, payload: newData });
  };
}
function updateChartNode(nodeIds, node) {
  return async (dispatch, getState) => {
    const { chart } = getState();
    const type = actionTypes.UPDATE_NODE;
    const newData = await digg(nodeIds, { chart, node, type });
    dispatch({ type: actionTypes.UPDATE, payload: newData });
  };
}

async function digg(nodeIds, newData) {
  const { chart, node, type = "ADD" } = newData;
  const dsDigger = new JSONDigger(chart, "id", "children");

  switch (type) {
    case actionTypes.UPDATE_NODE:
      await dsDigger.updateNodes(nodeIds, node);
      return { ...dsDigger.ds };
    case actionTypes.REMOVE_CHILD:
      await dsDigger.removeNodes(nodeIds, node);
      return { ...dsDigger.ds };
    case actionTypes.ADD_CHILD:
      await dsDigger.addChildren(nodeIds, node);
      return { ...dsDigger.ds };
    case actionTypes.ADD_SIBBLING:
      await dsDigger.addSiblings(nodeIds, node);
      return { ...dsDigger.ds };
    default:
      return { ...dsDigger.ds };
  }
}
