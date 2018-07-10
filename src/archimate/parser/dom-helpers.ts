export function getStringAttribute(node: Element, name: string) {
  const attr = node.attributes.getNamedItem(name);
  if (attr === null) {
    return undefined;
  }
  return (attr as Attr).value;
}
