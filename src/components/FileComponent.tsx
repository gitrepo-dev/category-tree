import { DeleteIcon, EditIcon, FileIcon } from 'assets'
import { expendType } from 'types';
import { memo } from 'react'

interface FileType {
  explorerData: any,
  expend: expendType,
  setExpend: (arg: expendType) => void | undefined;
  handleAddItem: (e: React.KeyboardEvent<HTMLElement>, type: string) => void,
  handleUpdateItem: (e: React.KeyboardEvent<HTMLElement>, id: number) => void,
  setUpdateNodeId: (id: number) => void,
  updateNodeId: number,
  handleDeleteNode: (id: number) => void,
  handleCollpaseToggle: (id: number, opt:string) => void
}

function FileComponent({
  explorerData,
  expend,
  setExpend,
  handleAddItem,
  handleUpdateItem,
  setUpdateNodeId,
  updateNodeId,
  handleDeleteNode,
  handleCollpaseToggle
}: Partial<FileType>): JSX.Element {
  return (
    <div className={`flex items-center justify-between p-3 bg-[#f2f2f2] rounded-sm max-w-[${42 - 0.75}rem] text-md mt-3`}>
      <span className="flex items-center">
        <img src={FileIcon} alt="File icon" className="mr-2 w-10 cursor-pointer"
          onClick={() => {
            if (handleCollpaseToggle) {
              handleCollpaseToggle(explorerData.id, "create")
            }
          }} />
        {(updateNodeId === explorerData?.id ? <input type="text" onKeyDown={(e) => {
          if (handleUpdateItem && updateNodeId) {
            handleUpdateItem(e, updateNodeId)
          }
          else if (handleAddItem) {
            handleAddItem(e, "file")
          }
        }} autoFocus onBlur={() => {
          if (setExpend) {
            setExpend({ type: "", collapse: false })
          }
        }} /> : explorerData?.name)}
      </span>

      {!expend && (
        <span className="flex items-center">
          <img src={EditIcon} alt="Edit" className="w-6 cursor-pointer mr-3" title="Edit" onClick={() => {
            if (setUpdateNodeId) {
              setUpdateNodeId(explorerData.id)
            }
          }} />
          <img src={DeleteIcon} alt="Delete" className="w-6 cursor-pointer" title="Delete" onClick={() => {
            if (handleDeleteNode) {
              handleDeleteNode(explorerData.id)
            }
          }} />
        </span>
      )}
    </div>
  )
}

export default memo(FileComponent)
