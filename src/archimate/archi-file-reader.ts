import {getStringAttribute} from "./parser/dom-helpers";
import {Model} from "./model";
import {ElementParser} from "./parser/element-parser";

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
    model.documentation = (new DocumentationParser()).value(modelNode, "purpose");
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
