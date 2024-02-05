import { FolderIcon } from 'assets'
import React, {memo} from 'react'
import { expendType } from 'types';

function FolderComponent({
  setExpend,
  handleAddItem,
}: {
  setExpend: (arg: expendType) => void;
  handleAddItem: (e:React.KeyboardEvent<HTMLElement>, type:string) => void,
}): JSX.Element {
  return (
    <div className='flex items-center p-3 bg-[#f2f2f2] rounded-sm max-w-2xl text-md mt-3 ml-2'>
      <span className="flex items-center">
        <img src={FolderIcon} alt="Tree icon" className="mr-2 w-10" />
        <input type="text" onKeyDown={(e) => handleAddItem(e, "folder")} autoFocus onBlur={() => {
          setExpend({ type: "", collapse: false }
          )}} />       
      </span>
    </div>
  )
}

export default memo(FolderComponent)
