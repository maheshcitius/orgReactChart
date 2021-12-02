import React, { useRef, useState, useEffect } from "react";
import JSONDigger from "json-digger";
import { v4 as uuidv4 } from "uuid";
import OrganizationChart from "../components/ChartContainer";
import "./edit-node.css";
import { useSelector } from "react-redux";
import { chartActions } from "../redux/actions";
import { useDispatch } from "react-redux";

const OrgChart = () => {
  const chart = useSelector((state) => state.chart);

  const orgchart = useRef();
  const [ds, setDS] = useState(chart);
  const dispatch = useDispatch();
  useEffect(() => {
    setDS(chart);
  }, [chart]);

  const dsDigger = new JSONDigger(ds, "id", "children");

  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeTitle, setNewNodeTitle] = useState("");
  const [newNodeDoj, setNewNodeDoj] = useState("");
  const [isEditMode, setIsEditMode] = useState(true);
  const [parentNode, setParentNode] = useState();

  const [filename, setFilename] = useState("organization_chart");
  const [fileextension, setFileextension] = useState("png");

  const readSelectedNode = async (nodeData) => {
    setSelectedNodes(new Set([nodeData]));
    setNewNodeTitle(nodeData.title);
    setNewNodeName(nodeData.name);
    setNewNodeDoj(nodeData.doj);
    try {
      let parentNode = await getParent(nodeData.id);
      setParentNode(parentNode);
    } catch (err) {
      console.log("Error :", err);
    }
  };

  const clearSelectedNode = () => {
    setSelectedNodes(new Set());
  };

  const getNewNodes = () => {
    const nodes = [];

    nodes.push({
      id: uuidv4(),
      name: newNodeName,
      title: newNodeTitle,
      doj: newNodeDoj,
    });

    return nodes;
  };

  const addChildNodes = async () => {
    dispatch(
      chartActions.addChartChild([...selectedNodes][0].id, {
        id: uuidv4(),
        name: newNodeName,
        title: newNodeTitle,
        doj: newNodeDoj,
      })
    );
  };

  const addRootNode = () => {
    dsDigger.addRoot(getNewNodes()[0]);
    setDS({ ...dsDigger.ds });
  };

  const getParent = async (id) => {
    let parents = await dsDigger.findParent(id);

    return parents;
  };
  const remove = async () => {
    dispatch(
      chartActions.removeChartNode(
        [...selectedNodes].map((node) => node.id),
        {
          id: uuidv4(),
          name: newNodeName,
          title: newNodeTitle,
          doj: newNodeDoj,
        }
      )
    );

    // if (parentNode.id) {

    //   await dsDigger.addChildren(
    //     parentNode.id,
    //     currentNode.children?.map((node) => {
    //       let s = {};
    //       s.title = node.title;
    //       s.name = node.name;
    //       s.doj = node.doj;

    //       return s;
    //     })
    //   );
    // }

    setSelectedNodes(new Set());
  };

  const onModeChange = (e) => {
    setIsEditMode(e.target.checked);
    if (e.target.checked) {
      orgchart.current.expandAllNodes();
    }
  };

  const updateNodes = async () => {
    dispatch(
      chartActions.updateChartNode(
        [...selectedNodes].map((node) => node.id),
        {
          id: uuidv4(),
          name: newNodeName,
          title: newNodeTitle,
          doj: newNodeDoj,
        }
      )
    );
  };

  const exportTo = () => {
    orgchart.current.exportTo(filename, fileextension);
  };

  return (
    <div className="edit-chart-wrapper">
      <section className="toolbar">
        <div className="new-nodes">
          <h4>Add/Update Node</h4>

          <input
            type="text"
            placeholder="name"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="title"
            value={newNodeTitle}
            onChange={(e) => setNewNodeTitle(e.target.value)}
          />
          <br />
          <input
            type="date"
            placeholder="DOJ"
            value={newNodeDoj}
            onChange={(e) => setNewNodeDoj(e.target.value)}
          />
        </div>
        <div className="action-buttons">
          <button disabled={!isEditMode} onClick={updateNodes}>
            Update Nodes
          </button>
          <button disabled={!isEditMode} onClick={addChildNodes}>
            Add Child Nodes
          </button>

          <button disabled={!isEditMode} onClick={addRootNode}>
            Add Root Node
          </button>
          <button disabled={!isEditMode} onClick={remove}>
            Remove Nodes
          </button>
          <button disabled={!isEditMode} onClick={exportTo}>
            Export
          </button>
          <input
            style={{ marginLeft: "1rem" }}
            id="cb-mode"
            type="checkbox"
            checked={isEditMode}
            onChange={onModeChange}
          />
          <label htmlFor="cb-mode">Edit Mode</label>
        </div>
      </section>
      <OrganizationChart
        ref={orgchart}
        datasource={ds}
        collapsible={!isEditMode}
        onClickNode={readSelectedNode}
        onClickChart={clearSelectedNode}
        pan={true}
        zoom={true}
      />
    </div>
  );
};

export default OrgChart;
