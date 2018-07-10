import {IHasProperties, IIdentifiable} from "./archimate";
import {Model} from "./model";
import {Property} from "./property";

export enum ElementType {
  BusinessActorElementType = "BusinessActor",
  BusinessCollaborationElementType = "BusinessCollaboration",
  BusinessEventElementType = "BusinessEvent",
  BusinessFunctionElementType = "BusinessFunction",
  BusinessInteractionElementType = "BusinessInteraction",
  BusinessInterfaceElementType = "BusinessInterface",
  BusinessObjectElementType = "BusinessObject",
  BusinessProcessElementType = "BusinessProcess",
  BusinessRoleElementType = "BusinessRole",
  BusinessServiceElementType = "BusinessService",
  ContractElementType = "Contract",
  LocationElementType = "Location",
  ProductElementType = "Product",
  RepresentationElementType = "Representation",
  ApplicationCollaborationElementType = "ApplicationCollaboration",
  ApplicationComponentElementType = "ApplicationComponent",
  ApplicationEventElementType = "ApplicationEvent",
  ApplicationFunctionElementType = "ApplicationFunction",
  ApplicationInteractionElementType = "ApplicationInteraction",
  ApplicationInterfaceElementType = "ApplicationInterface",
  ApplicationProcessElementType = "ApplicationProcess",
  ApplicationServiceElementType = "ApplicationService",
  DataObjectElementType = "DataObject",
  ArtifactElementType = "Artifact",
  CommunicationNetworkElementType = "CommunicationNetwork",
  CommunicationPathElementType = "CommunicationPath",
  DeviceElementType = "Device",
  InfrastructureFunctionElementType = "InfrastructureFunction",
  InfrastructureInterfaceElementType = "InfrastructureInterface",
  InfrastructureServiceElementType = "InfrastructureService",
  NetworkElementType = "Network",
  NodeElementType = "Node",
  PathElementType = "Path",
  SystemSoftwareElementType = "SystemSoftware",
  TechnologyCollaborationElementType = "TechnologyCollaboration",
  TechnologyEventElementType = "TechnologyEvent",
  TechnologyFunctionElementType = "TechnologyFunction",
  TechnologyInteractionElementType = "TechnologyInteraction",
  TechnologyInterfaceElementType = "TechnologyInterface",
  TechnologyObjectElementType = "TechnologyObject",
  TechnologyProcessElementType = "TechnologyProcess",
  TechnologyServiceElementType = "TechnologyService",
  DistributionNetworkElementType = "DistributionNetwork",
  EquipmentElementType = "Equipment",
  FacilityElementType = "Facility",
  MaterialElementType = "Material",
  AssessmentElementType = "Assessment",
  ConstraintElementType = "Constraint",
  DriverElementType = "Driver",
  GoalElementType = "Goal",
  MeaningElementType = "Meaning",
  OutcomeElementType = "Outcome",
  PrincipleElementType = "Principle",
  RequirementElementType = "Requirement",
  StakeholderElementType = "Stakeholder",
  ValueElementType = "Value",
  DeliverableElementType = "Deliverable",
  GapElementType = "Gap",
  ImplementationEventElementType = "ImplementationEvent",
  PlateauElementType = "Plateau",
  WorkPackageElementType = "WorkPackage",
  AndJunctionElementType = "AndJunction",
  JunctionElementType = "Junction",
  OrJunctionElementType = "OrJunction",
  CapabilityElementType = "Capability",
  CourseOfActionElementType = "CourseOfAction",
  ResourceElementType = "Resource",
  GroupingElementType = "Grouping",
}

// A base element type that can be extended by concrete ArchiMate types.
//
// Note that ElementType is abstract, so one must have derived types of this
// type. This is indicated in xml by having a tag name of +element+ and an
// attribute of +xsi:type="BusinessRole"+ where +BusinessRole+ is a derived
// type from [ElementType].
export class Element implements IIdentifiable, IHasProperties {
  public id: string;
  public type: ElementType;
  public name: string;
  public documentation?: string;
  public properties: Array<Property>;
  private model: Model;

  constructor(model: Model, type: ElementType, id?: string, name?: string) {
    this.model = model;
    this.type = type;
    this.id = id || model.makeUniqueId();
    this.name = name || "";
    this.properties = [];
  }

  toString() {
    return `${this.type}<${this.id}>[${this.name}]`;
  }

  // classification() {
  //   this.class::CLASSIFICATION
  // }

  // layer() {
  //   this.class::LAYER
  // }

  // Diagrams that this entity is referenced in.
  // TODO: memoize the response
  diagrams() {
    // return this.model.diagrams.filter(dia => dia.references(this.id));
    return this.model.diagrams;
  }
}
