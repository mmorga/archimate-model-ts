class DocumentationParser {
  value(parentElement: Element, docElementName?: string) {
    const docEl = parentElement.querySelector(`>${docElementName}`);
    if (docEl === null) {
      return undefined;
    }
    return (docEl as Element).textContent || undefined;
  }
}
