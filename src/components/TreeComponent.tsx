import { CartIcon, FolderIcon } from "assets";
import { useState, memo } from "react";
import FolderComponent from "./FolderComponent";
import FileComponent from "./FileComponent";
import ButtonComponent from "./ButtonComponent";
import { explorerType, insertNodeType } from "types";

function TreeComponent({
  handleInsertNode,
  explorerData,
  handleDeleteNode,
  handleUpdateNode,
  updateNodeId,
  setUpdateNodeId,
  handleCollpaseToggle,
}: {
  handleInsertNode: (args: insertNodeType) => void,
  explorerData: explorerType,
  handleDeleteNode: (id: number) => void,
  handleUpdateNode: (id:number, name:string) => void,
  updateNodeId: number,
  setUpdateNodeId: (id: number) => void,
  handleCollpaseToggle: (id: number, opt?:string) => void,
}): JSX.Element {
  
  // add new file or folder in UI when click on folder or file btn
  const [expend, setExpend] = useState({
    type: "",
    collapse: false,
  });
  // it will call when hit enter key to add new node/folder/file in tree
  const handleAddItem = (e: any, type: string) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode({ id: explorerData.id, name: e.target.value, type });
      setExpend({ type: '', collapse: false })
    }
  };

  // update node
  const handleUpdateItem = (e:any, id:number) => {
    if (e.keyCode === 13 && e.target.value) {
      handleUpdateNode(id,  e.target.value)
      setUpdateNodeId(0)
    }
  }


  return (
    <>
      {explorerData?.type === "folder" ? (
        <>
          <div className={`flex items-center justify-between p-3 bg-[#f2f2f2] rounded-sm max-w-[${42 - 0.75}rem] text-md mt-3 ${explorerData.id}`}>
            <span className="flex items-center">

             {/* when you update a folder */}
              <img src={FolderIcon} alt="Folder icon" className={`mr-2 w-12 ${explorerData.id === 1 ? "" : "cursor-pointer"}`} onClick={()=>{
                if(explorerData.id !== 1){
                  handleCollpaseToggle(explorerData.id, "coll")
                }
              }} />              
              {updateNodeId === explorerData.id ? <input type="text" onKeyDown={(e) => handleUpdateItem(e, updateNodeId)} autoFocus onBlur={() => setExpend({ type: "", collapse: false })} />   : <span className="font-samibold">{explorerData.name}</span>}  

            </span>   

            {/* when you will create/update/delete a folder. folder all four btn will be added to folder which you created */}
            <ButtonComponent
              expend={expend}
              setExpend={setExpend}
              explorerData={explorerData}  
              handleDeleteNode={handleDeleteNode}  
              setUpdateNodeId={setUpdateNodeId}    
              handleCollpaseToggle={handleCollpaseToggle}       
            />
          </div>


          {/* inital render when you click btn to create folder or file according btn click */}
          {expend.type === "folder" ? <FolderComponent  handleAddItem={handleAddItem} setExpend={setExpend} /> : expend.type === "file" ? <FileComponent expend={expend} handleAddItem={handleAddItem} setExpend={setExpend} /> : null}
        

          {/* childern for recursive */}
          {explorerData.nodes.map((d: any) => <div className={`ml-3 ${d?.collapse ? 'hidden' : ''}`} key={d.id}>
            <TreeComponent
              handleDeleteNode={handleDeleteNode}
              handleInsertNode={handleInsertNode}
              explorerData={d}
              handleUpdateNode={handleUpdateNode}
              updateNodeId={updateNodeId}
              setUpdateNodeId={setUpdateNodeId}
              handleCollpaseToggle={handleCollpaseToggle}
            />
          </div>)}
        </>
        //  file render when type is not folder
      ) : (explorerData?.collapse ? "" : <FileComponent handleCollpaseToggle={handleCollpaseToggle}  handleDeleteNode={handleDeleteNode} handleUpdateItem={handleUpdateItem} updateNodeId={updateNodeId}  explorerData={explorerData} setUpdateNodeId={setUpdateNodeId}  />)}
    </>
  );
}

export default memo(TreeComponent);
