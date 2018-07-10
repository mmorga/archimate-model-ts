import {Property} from "./property";

export interface IIdentifiable {
  id: string;
}

export interface IHasOrganizations extends IIdentifiable {
  organizations: Array<IHasOrganizations>;
}

export interface IHasProperties {
  properties: Array<Property>;
}
