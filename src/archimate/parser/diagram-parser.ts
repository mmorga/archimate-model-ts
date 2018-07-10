import {getStringAttribute} from "./dom-helpers";
import {PropertiesParser} from "./properties-parser";
import {ViewNodeParser} from "./view-node-parser";
import {ViewpointParser} from "./viewpoint-parser";
import {Diagram, DiagramType} from "../diagram";
import {Model} from "../model";

export class DiagramParser {
  public model: Model;
  private documentationParser: DocumentationParser;
  private propertiesParser: PropertiesParser;
  private viewpointParser: ViewpointParser;
  private viewNodeParser: ViewNodeParser;

  constructor(model: Model) {
    this.model = model;
    this.documentationParser = new DocumentationParser();
    this.propertiesParser = new PropertiesParser(model);
    this.viewpointParser = new ViewpointParser();
    this.viewNodeParser = new ViewNodeParser(this.model);
  }

  diagram(domEl: Element, type: DiagramType): Diagram {
    const dia = new Diagram(this.model, type);
    dia.id = getStringAttribute(domEl, "id") || this.model.makeUniqueId();
    dia.name = getStringAttribute(domEl, "name");
    dia.documentation = this.documentationParser.value(domEl);
    dia.properties = this.propertiesParser.properties(domEl);
    dia.viewpoint = this.viewpointParser.viewpoint(domEl);
    dia.nodes = this.viewNodeParser.viewNodes(dia, domEl);
    return dia;
  }
}
