import TreeComponent from "components/TreeComponent";
import useTraverseTree from "hooks/useTraverseTree";
import { useState, useCallback } from "react";
import { insertNodeType } from "types";

export default function App() {
  const [updateNodeId, setUpdateNodeId] = useState(0)
  const [explorerData, setExplorerData] = useState({
    id: 1,
    name: "root",
    type: "folder",
    nodes: []
  })

  const { insertNode, deleteNode, updateNode, collapseNode} = useTraverseTree()

  // to insert new node
  const handleInsertNode = useCallback((arg: insertNodeType) => {
    const { id, name, type } = arg
    const finalTree = insertNode(explorerData, id, name?.trim(), type)
    setExplorerData(finalTree)
  }, [explorerData, insertNode])

  // to delete node
  const handleDeleteNode = useCallback((id: number) => {
    const finalTree = deleteNode(id, explorerData)
    setExplorerData({...finalTree})
  }, [explorerData, deleteNode])

  // to update node
  const handleUpdateNode = useCallback((id: number, name: string) => {
    const finalTree = updateNode(id, name?.trim(), explorerData)
    setExplorerData(finalTree)
  }, [explorerData, updateNode])

  // to add the collapse true and false hide/show the tabs
  const handleCollpaseToggle = useCallback((id:number, opt?:string) => {
    const finalTree = collapseNode(id, explorerData, opt)
    setExplorerData({...finalTree})
  }, [explorerData, collapseNode])

  return (
    <div className="p-10">
      <span className="text-xs text-gray-600">Note: only folder can be create as nested/cat/subcat not file. you can't delete, collapse or edit root folder. click on folder icon to collapes the tabs and folder/file btn to create them.</span>
      <TreeComponent
        handleInsertNode={handleInsertNode}
        explorerData={explorerData}
        handleDeleteNode={handleDeleteNode}
        handleUpdateNode={handleUpdateNode}
        updateNodeId={updateNodeId}
        setUpdateNodeId={setUpdateNodeId}
        handleCollpaseToggle={handleCollpaseToggle}
      />
    </div>
  );
}
