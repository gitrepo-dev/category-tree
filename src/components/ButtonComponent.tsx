import { DeleteIcon, EditIcon } from "assets";
import { memo } from "react";
import { expendType, explorerType } from "types";

function ButtonComponent({
  expend,
  setExpend,
  explorerData,
  handleDeleteNode,
  setUpdateNodeId,
  handleCollpaseToggle
}: {
  expend: expendType,
  setExpend: (args: expendType) => void,
  explorerData: explorerType,
  handleDeleteNode: (id: number) => void,
  setUpdateNodeId: (id: number) => void,
  handleCollpaseToggle:(id:number, opt?:string) => void
}): JSX.Element {
  return (
    <span className="flex items-center justify-between">
      {[{ name: "folder", color: '600' }, { name: "file", color: "800" }].map((d: { name: string, color: string }) => (
        <button
          key={d.name}
          type="button"
          className={`rounded-full px-4 py-2 bg-yellow-600 text-white text-xs mr-3 focus:none flex items-center`}
          onClick={() => {
            setExpend({ type: d.name, collapse: !expend.collapse })
            if(explorerData.id !== 1){
            handleCollpaseToggle(explorerData.id, "create")
            }
          }}
        >
          <span className="mr-2 capitalize">{d.name}</span>
          <span className="rounded-full bg-white text-black h-4 w-4 flex items-center justify-center inline-block pb-0.5">
            +
          </span>
        </button>
      ))}

      {explorerData.id === 1 ? null : <span className="flex items-center">
        <img src={EditIcon} alt="Edit" className="w-6 cursor-pointer mr-3" title="Edit" onClick={() =>
          setUpdateNodeId(explorerData.id)} />
        <img src={DeleteIcon} alt="Delete" className="w-6 cursor-pointer" title="Delete" onClick={() => handleDeleteNode(explorerData.id)} />
      </span>}
    </span>
  );
}

export default memo(ButtonComponent);
