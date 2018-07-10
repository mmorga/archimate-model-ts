import {getStringAttribute} from "./parser/dom-helpers";
import {Model} from "./model";
import {ElementParser} from "./parser/element-parser";

// when "element"
//   element_type = Hash[attrs]["xsi:type"].sub(/archimate:/, '')
//   case element_type
//   when DataModel::Elements
//     Element
//   when DataModel::DiagramType
//     Diagram
//   when DataModel::Relationships
//     Relationship
//   else
//     raise "Unexpected element_type #{element_type}"
//   end
// when "property"
//   Property
// when "folder"
//   Organization
// when "child"
//   ViewNode
// when "bounds"
//   Bounds
// when "sourceConnection"
//   Connection
// when "bendpoint"
//   Location
// when "content"
//   Content

export class ArchiFileReader {
  parse(doc: XMLDocument) {
    const model = this.parseModel(doc);
    return this.fixBendpoints(model);
  }

  parseModel(doc: XMLDocument) {
    const model = new Model();
    const modelNodes = doc.getElementsByTagNameNS("http://www.archimatetool.com/archimate", "model");
    if (modelNodes.length == 0) {
      throw "Couldn't find a Model in the XMLDocument";
    }
    const modelNode = modelNodes[0];
    model.id = getStringAttribute(modelNode, "id") || "";
    model.name = getStringAttribute(modelNode, "name") || "";
    model.documentation = (new DocumentationParser(modelNode, "purpose")).value();
    (new ElementParser(model, doc)).elements();
    return model;
  }

  fixBendpoints(model: Model) {
    // model
    //   .diagrams
    //   .flat_map(&:connections)
    //   .each do |connection|
    //     connection.bendpoints.each do |bendpoint|
    //       bendpoint.x += connection.start_location.x.to_i
    //       bendpoint.y += connection.start_location.y.to_i
    //     end
    //   end
    return model;
  }
}
