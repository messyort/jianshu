/**
 * @description 列表结构转换成树形结构
 * @export
 * @param data
 * @param options
 * @returns
 */
export function listToTree<D>(data: D[], options?: { idKey?: string; parentKey?: string; childrenKey?: string }): D[] {
  const { idKey: ID_KEY, parentKey: PARENT_KEY, childrenKey: CHILDREN_KEY } = Object.assign(
    { idKey: 'id', parentKey: 'parentId', childrenKey: 'children' },
    options,
  );

  const tree: D[] = [];
  let childrenOf = {};
  let item: D;
  let id: string | number;
  let parentId: string | number;
  let i = 0;
  const length = data.length;
  while (i < length) {
    item = data[i];
    id = item[ID_KEY];
    parentId = item[PARENT_KEY] || 0;
    // 检查子节点是否存在
    childrenOf[id] = childrenOf[id] || [];
    // 初始化子节点
    item[CHILDREN_KEY] = childrenOf[id];
    if (parentId !== 0) {
      // 初始化其父对象的子节点
      childrenOf[parentId] = childrenOf[parentId] || [];
      // 将它推入其父对象的子节点中
      childrenOf[parentId].push(item);
    } else {
      tree.push(item);
    }
    i++;
  }
  // 销毁变量
  childrenOf = null;
  item = null;
  return tree;
}
