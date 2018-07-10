import {getStringAttribute} from "./dom-helpers";
import {Model} from "../model";
import {Property} from "../property";

export class PropertiesParser {
  public model: Model;

  constructor(model: Model) {
    this.model = model;
    this.handleElement = this.handleElement.bind(this);
  }

  properties(parent: Element) {
    const els = parent.querySelectorAll(">property");
    if (els === null) {
      return [];
    }
    return Array.from(els).map(this.handleElement);
  }

  handleElement(el: Element) {
    const key = getStringAttribute(el, "key");
    const value = getStringAttribute(el, "value");
    if (key === undefined) {
      throw "Property is missing key";
    }
    return new Property((key as string), value);
  }
}

