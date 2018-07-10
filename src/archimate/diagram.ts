import {IHasProperties, IIdentifiable} from "./archimate";
import {Model} from "./model";
import {Property} from "./property";

export enum DiagramType {
  ArchimateDiagramModel = "ArchimateDiagramModel",
  SketchModel = "SketchModel",
}

export class Diagram implements IIdentifiable, IHasProperties {
  public id: string;
  public name?: string;
  public documentation?: string;
  public type?: string;
  public properties: Array<Property>;
  public viewpoint?: string;
  public nodes: Array<object>;
  public connectionRouterType?: string;
  public background?: string;
  public connections: Array<object>;
  // private model: Model;

  constructor(model: Model, type: DiagramType) {
    // this.model = model;
    this.id = model.makeUniqueId();
    this.type = type;
    this.properties = [];
    this.nodes = [];
    this.connections = [];
  }

  // all_nodes() {
  //   nodes.inject(Array.new(nodes)) { |child_ary, child| child_ary.concat(child.all_nodes) }
  // }

  // elements() {
  //   @elements ||= all_nodes.map(&:element).compact
  // }

  // element_ids() {
  //   @element_ids ||= elements.map(&:id)
  // }

  // relationships() {
  //   @relationships ||= connections.map(&:relationship).compact
  // }

  // relationship_ids() {
  //   @relationship_ids ||= relationships.map(&:id)
  // }

  toString() {
    return `Diagram<${this.id}>[${this.name}]`;
  }

  totalViewpoint() {
    return (this.viewpoint !== undefined);
  }

  // viewpoint_description() {
  //   switch(this.viewpoint) {
  //   case Symbol:
  //     viewpoint.to_s
  //   case Viewpoint:
  //     viewpoint.name.to_s
  //   default:
  //     switch(this.type) {
  //     case "canvas:CanvasModel":
  //       return "Canvas";
  //     case "archimate:SketchModel":
  //       return "Sketch";
  //     default:
  //       return "Total";
  //     }
  //   }
  // }
}
