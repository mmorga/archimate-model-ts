import {ArchiFileReader} from "./archi-file-reader"

export interface IUnsupportedFormat {
  xmlns?: string;
}

export class UnsupportedFormat {
  msg: string;
  xmlns?: string;

  constructor(msg: string, xmlns?: string) {
    this.msg = msg;
    this.xmlns = xmlns;
  }
}

export function parse(doc : XMLDocument) {
  const ns_attr = doc.all[0].attributes.getNamedItem('xmlns');
  const ns = ns_attr ? (ns_attr as Attr).value : undefined;
  let model = undefined;
  switch(ns) {
    case "http://www.opengroup.org/xsd/archimate/3.0/":
    case "http://www.opengroup.org/xsd/archimate":
      throw new UnsupportedFormat("Format not supported", ns);
      // let reader = new ModelExchangeFileReader(doc);
      break;
    default:
      model = (new ArchiFileReader()).parse(doc);
  }
  return model;
}
