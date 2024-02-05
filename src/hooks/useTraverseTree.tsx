/*
 This travers tree can be optimize 
*/

function useTraverseTree() {

let flag = false
  const duplidate = (name: string, tree: any): boolean => {
    if(name === tree?.name && tree?.name !== "root"){
      flag = true
    }
    tree.nodes.map((obj: any) => duplidate(name, obj))
    return flag
  }


  // delete node
  const deleteNode = (id: number, tree: any) => {
    const isFoundIndex = tree.nodes.findIndex((d: any) => d.id === id)
    if (isFoundIndex !== -1) {
      tree.nodes.splice(isFoundIndex, 1)
      return tree
    }
    // for recursive call
    const latestNode = tree.nodes.map((obj: any) => deleteNode(id, obj))
    return { ...tree, nodes: latestNode }
  }


  // add new node
  const insertNode = (tree: any, itemId: number, itemName: string, type: string) => {

    const isDuplicate = duplidate(itemName?.trim(), tree)

    if (itemName === "root" || isDuplicate) {
      alert("You are using duplicate name.")
      return tree
    } else {
      flag = false
      if (tree.id === itemId && tree.type === "folder") {
        tree.nodes.unshift({
          id: new Date().getTime(),
          name: itemName,
          type,
          nodes: [],
          collapse: null
        })
        return tree
      }

      // for recursive call
      const latestNode = tree.nodes.map((obj: any) => insertNode(obj, itemId, itemName, type))
      return { ...tree, nodes: latestNode }
    }

  }


  // udpate node
  const updateNode = (id: number, name: string, tree: any) => {
    const isDuplicate = duplidate(name, tree)
    if (isDuplicate || name === "root") {
      alert("You are using duplicate name.")
      return tree
    } else {
      flag = false
      if (id === tree.id) {
        const newObj = {
          ...tree,
          name,
        }
        return newObj
      }

      // for recursive call
      const latestNode = tree.nodes.map((obj: any) => updateNode(id, name, obj))
      return { ...tree, nodes: latestNode }
    }
  }

  // collapse node
  const collapseNode = (id: number, tree:any, opt?: string) => {

    // to add collapse true key and value targeted node and its all chilren
    function addKeyToChildren(element: any, key: string, value: boolean) {
      if (element?.nodes?.length) {
        // Recursively add the key to all children
        element?.nodes?.forEach((child: any) => addKeyToChildren(child, key, value));
      }
      // Add the new key to the current element
      if (id === element.id) {
        element[key] = null;
      } else {
        element[key] = value;
      }
    }


    // it will only remove the or open fol  r/file which are on same level
    function removeKeyChildren(element: any, key: string) {

      element?.nodes?.forEach((child: any) => {
        if (child["collapse"] === null && opt !== "create") {
          child["collapse"] = true
          // if child of folder then also close them all
          child?.nodes?.forEach((sub: any) => addKeyToChildren(sub, key, true));
        } else {
          child["collapse"] = null
        }
      });
    }

    // match the id on which you have click to the tree node
    if (id === tree.id) {
      if (tree?.collapse === null) {
        removeKeyChildren(tree, "collapse")
      } else {
        addKeyToChildren(tree, "collapse", true)
      }
      return tree
    }

    // for recursive call
    tree.nodes.map((obj: any) => collapseNode(id, obj, opt))
    return { ...tree }

  }


  return { insertNode, deleteNode, updateNode, collapseNode }
}

export default useTraverseTree
