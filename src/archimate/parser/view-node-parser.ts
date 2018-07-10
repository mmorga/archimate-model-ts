import {getStringAttribute} from "./dom-helpers";
import {Diagram, DiagramType} from "../diagram";
import {Model} from "../model";
import {ViewNode} from "../view-node";

export class ViewNodeParser {
  public model: Model;
  public diagram: Diagram;
  private documentationParser: DocumentationParser;

  constructor(model: Model) {
    this.model = model;
    this.diagram = new Diagram(model, DiagramType.ArchimateDiagramModel);
    this.createViewNode = this.createViewNode.bind(this);
    this.documentationParser = new DocumentationParser();
  }

  viewNodes(diagram: Diagram, diagramEl: Element): Array<ViewNode> {
    this.diagram = diagram;
    const childNodes = this.createViewNodes(diagramEl);

    return childNodes.concat(
      childNodes.flatMap(node => node.allNodes(), this)
    );
  }

  createViewNodes(parent: Element): Array<ViewNode> {
    const children = parent.querySelectorAll(">child");
    if (children === undefined) {
      return [];
    }
    return Array.from(children as NodeListOf<Element>).map(this.createViewNode);
  }

  createViewNode(child: Element): ViewNode {
    const viewNode = new ViewNode(this.model, this.diagram);
    viewNode.id = getStringAttribute(child, "id") || this.model.makeUniqueId();
    viewNode.name = getStringAttribute(child, "name");
    viewNode.documentation = this.documentationParser.value(child);
    viewNode.type = child.attributes.getNamedItemNS("http://www.w3.org/2001/XMLSchema-instance", "type")!.value || undefined;
    // viewNode.style =
    viewNode.viewRefs = getStringAttribute(child, "model");
    // viewNode.content =
    if (child.parentElement!.nodeName === "child") {
      const parentEl = child.parentElement as Element;
      viewNode.parent = getStringAttribute(parentEl, "id");
    }
    // viewNode.bounds = // TODO: normalize bounds with parent(s)
    viewNode.nodes = this.createViewNodes(child);
    // viewNode.connections =
    viewNode.element = getStringAttribute(child, "archimateElement");
    viewNode.childType = getStringAttribute(child, "type");
    return viewNode;
  }
}
