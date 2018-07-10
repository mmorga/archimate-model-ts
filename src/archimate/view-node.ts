import {Diagram} from "./diagram";
import {Model} from "./model";

// Graphical node type. It can contain child node types.
// This can be specialized as Label and Container
// In the ArchiMate v3 Schema, the tree of these nodes is:
// ViewConceptType(
//     LabelGroup (name LangString)
//     PreservedLangString
//     style (optional)
//     viewRefs
//     id)
// - ViewNodeType(
//       LocationGroup (x, y)
//       SizeGroup (width, height))
//   - Label(
//         conceptRef
//         attributeRef
//         xpathPart (optional)
//     )
//   - Container(
//         nodes (ViewNodeType)
//     - Element(
//           elementRef)
export class ViewNode {
  // ArchiMate ViewConceptType Attributes
  public id: string;
  public name?: string;
  public documentation?: string;
  // @note type here was used for the Element/Relationship/Diagram type
  public type?: string;
  public style?: string;

  // @note viewRefs are pointers to 0-* Diagrams for diagram drill in defined in abstract View Concept
  public viewRefs?: string; //, comparison_attr: :id, writable: true, default: nil

  // @todo document where this comes from
  public content?: string; //, default: nil

  // This is needed for various calculations
  public parent?: string; //, writable: true, comparison_attr: :no_compare, default: nil

  // ArchiMate ViewNodeType Attributes

  public bounds?: string; //, default: nil

  // ArchiMate Container Attributes
  // container doesn't distinguish between nodes and connections

  public nodes: Array<ViewNode> = []; //, default: [], referenceable_list: true, also_reference: [:diagram]
  public connections: Array<object> = []; //, default: [], referenceable_list: true

  // Element
  public element?: string; //, writable: true, comparison_attr: :id, default: nil, also_reference: [:diagram]
  // Archi format, selects the shape of element (for elements that can have two or more shapes)
  // A nil value indicates the standard representation, a value of "1" indicates the alternate
  public childType?: string; //, default: nil

  public diagram: Diagram; //, comparison_attr: :no_compare

  // Node type to allow a Label in a Artifact. the "label" element holds the info for the @note.
  // Label View Nodes have the following attributes

  // conceptRef is a reference to an concept for this particular label, along with the attributeRef
  // which references the particular concept's part which this label represents.
  public conceptRef?: string; //, default: nil
  // conceptRef is a reference to an concept for this particular label, along with the partRef
  // which references the particular concept's part which this label represents. If this attribute
  // is set, then there is no need to add a label tag in the Label parent (since it is contained in the model).
  // the XPATH statement is meant to be interpreted in the context of what the conceptRef points to.
  // @!attribute [r] xpath_path
  // @return [String, NilClass]
  public xpathPath?: string; //, default: nil

  private model: Model;

  constructor(model: Model, diagram: Diagram) {
    this.model = model;
    this.id = this.model.makeUniqueId();
    this.diagram = diagram;
  }

  toString() {
    `ViewNode[${this.name || ''}](${this.element ? this.element : ''})`
  }

  // description() {
  //   [
  //     name&.to_s,
  //     element&.name,
  //     element ? "(#{element.type})" : nil
  //   ].compact.join(" ")
  // }

  allNodes(): Array<ViewNode> {
    return this.nodes.concat(
      this.nodes.flatMap(node => node.allNodes(), this)
    );
  }

  // child_id_hash() {
  //   nodes.each_with_object(id => self) { |i, a| a.merge!(i.child_id_hash) }
  // }

  // @todo Is this true for all or only Archi models?
  // absolute_position() {
  //   offset = bounds || Bounds.zero
  //   el = parent
  //   while el.respond_to?(:bounds) && el.bounds
  //     bounds = el.bounds
  //     offset = Bounds.new(offset.to_h.merge(x: (offset.x || 0) + (bounds.x || 0), y: (offset.y || 0) + (bounds.y || 0)))
  //     el = el.parent
  //   }
  //   offset
  // }

  // target_connections() {
  //   diagram
  //     .connections
  //     .select { |conn| conn.target&.id == id }
  //     .map(&:id)
  // }

  // center() {
  //   @bounds&.center
  // }
}

// Type is one of:  ["archimate:DiagramModelReference", "archimate:Group", "archimate:DiagramObject"]
// textAlignment "2"
// model is on only type of archimate:DiagramModelReference and is id of another element type=archimate:ArchimateDiagramModel
// fillColor, lineColor, fontColor are web hex colors
// targetConnections is a string of space separated ids to connections on diagram objects found on DiagramObject
// archimateElement is an id of a model element found on DiagramObject types
// font is of this form: font="1|Arial|14.0|0|WINDOWS|1|0|0|0|0|0|0|0|0|1|0|0|0|0|Arial"
