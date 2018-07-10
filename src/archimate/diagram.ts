import {IHasProperties, IIdentifiable} from "./archimate";
import {Model} from "./model";
import {Property} from "./property";

export class Diagram implements IIdentifiable, IHasProperties {
  id: string;
  name?: string;
  documentation?: string;
  type?: string;
  properties: Array<Property>;
  viewpoint?: string;
  nodes: Array<object>;
  connectionRouterType?: string;
  background?: string;
  connections: Array<object>;
  model: Model;

  constructor(model: Model) {
    this.id = model.makeUniqueId();
    this.model = model;
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
