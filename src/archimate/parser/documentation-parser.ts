class DocumentationParser {
  public parentElement: Element;
  public docElementName: string;

  constructor(parentElement: Element, docElementName?: string) {
    this.parentElement = parentElement;
    this.docElementName = docElementName || "documentation";
  }

  value() {
    const docEl = this.parentElement.querySelector(`>${this.docElementName}`);
    if (docEl === null) {
      return undefined;
    }
    return (docEl as Element).textContent || undefined;
  }
}
