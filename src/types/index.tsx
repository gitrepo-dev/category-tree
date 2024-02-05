
export interface commanType{
  id: number,
  name: string,
  type: string,
  collapse?: boolean  | null
}

export type explorerType ={
  nodes: commanType[]
} & commanType

export type expendType = {
  type: string;
  collapse: boolean;
};

export type insertNodeType = commanType