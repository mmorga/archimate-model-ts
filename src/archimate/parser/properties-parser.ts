import {getStringAttribute} from "./dom-helpers";
import {IHasProperties} from "../archimate";
import {Model} from "../model";
import {Property} from "../property";

export class PropertiesParser {
  public model: Model;
  public owner: IHasProperties;
  public parent: Element;

  constructor(model: Model, owner: IHasProperties, parent: Element) {
    this.model = model;
    this.owner = owner;
    this.parent = parent;
    this.handleElement = this.handleElement.bind(this);
  }

  properties() {
    const els = this.parent.querySelectorAll(">property");
    if (els === null) {
      return;
    }
    els.forEach(this.handleElement);
  }

  handleElement(el: Element) {
    const key = getStringAttribute(el, "key");
    const value = getStringAttribute(el, "value");
    if (key === undefined) {
      throw "Property is missing key";
    }
    const prop = new Property((key as string), value);
    this.owner.properties.push(prop);
  }
}

