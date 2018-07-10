import {IHasOrganizations, IIdentifiable} from "./archimate";
import {Property} from "./property";

function emptyIndexHash() {
  return new Map<string, IIdentifiable>();
}

// This is the root model type.
// It is a container for the elements, relationships, diagrams and
// organizations of the model.
export class Model implements IHasOrganizations {
  // unique identifier of this model
  public id: string = "";
  // name of the model
  public name: string = "";
  // model documentation
  public documentation?: string;
  // model properties
  public properties?: Array<Property>;
  // model metadata
  public metadata?: Map<string, object>;
  // model elements
  public elements: Array<IIdentifiable> = []; // Element[] = [];
  // model relationships
  public relationships: Array<IIdentifiable> = []; // Relationship[] = [];
  // model organization tree (aka Folders)
  public organizations: Array<IHasOrganizations> = []; // Organization[] = [];
  // property definitions
  public propertyDefs: Map<string, IIdentifiable> = new Map<string, IIdentifiable>();
  public version?: string; // default: nil
  public diagrams: Array<IIdentifiable> = []; // Diagram[] = [];
  public viewpoints: Array<IIdentifiable> = [];

  private indexHash: Map<string, IIdentifiable>;

  // Constructor TODO: parse opts
  constructor(opts = {}) {
    this.indexHash = emptyIndexHash();
    this.rebuildIndex();
  }

  lookup(id : string) {
    if (this.indexHash.get(id) === undefined) {
      this.rebuildIndex(id);
    }
    return this.indexHash.get(id);
  }

  // Called only by [Lint::DuplicateEntities]
  entities() {
    return this.indexHash.values();
  }

  rebuildIndex(missingId?: string) {
    if (missingId === undefined) {
      return this;
    }
    this.indexHash = this.buildIndex();
    return this;
  }

  toString() {
    return `Model<${this.id}>[${this.name}]`;
  }

  makeUniqueId() {
    return "TODO";

    while(true) {
      const uniqueId = (Math.random() * 0xffffffff).toString(16);
      if (this.indexHash.has(uniqueId)) {
        return uniqueId;
      }
    }
  }

  // remove_reference(item) {
  //   case item
  //   when Element
  //     elements.delete(item)
  //   when Relationship
  //     relationships.delete(item)
  //   when Diagram
  //     diagrams.delete(item)
  //   else
  //     raise "Unhandled remove reference for type #{item.class}"
  //   }
  //   organizations.each { |org| org.remove_reference(item) }
  // }

  // Elements.classes.each do |el_cls|
  //   define_method(el_cls.name.split("::").last.snake_case + "s") do
  //     elements.select { |el| el.is_a?(el_cls) }
  //   }
  // }

  // private

  // Only used by [#find_default_organization]
  // add_organization(type, name)
  //   raise "Program Error: #{organizations.inspect}" unless organizations.none? { |f| f.type == type || f.name == name }
  //   organization = Organization.new(
  //     id: make_unique_id,
  //     name: LangString.new(name),
  //     type: type,
  //     items: [],
  //     organizations: [],
  //     documentation: nil
  //   )
  //   register(organization, organizations)
  //   organizations.push(organization)
  //   organization
  // }

  buildIndex() {
    this.indexHash = emptyIndexHash();
    this.indexHash.set(this.id, this);
    this.elements.forEach((ref: IIdentifiable) => { this.indexHash.set(ref.id, ref); });
    this.relationships.forEach(ref => { this.indexHash.set(ref.id, ref); });
    this.diagrams.forEach(dia => { this.indexHash.set(dia.id, this.indexViewNodes(dia)); });
    this.propertyDefs.forEach(ref => { this.indexHash.set(ref.id, ref); });
    this.indexOrganizations(this);
    return this.indexHash;
  }

  // default_organization_for(item)
  //   case item
  //   when Element
  //     case item.layer
  //     when Layers::Strategy
  //       find_default_organization("strategy", "Strategy")
  //     when Layers::Business
  //       find_default_organization("business", "Business")
  //     when Layers::Application
  //       find_default_organization("application", "Application")
  //     when Layers::Technology
  //       find_default_organization("technology", "Technology")
  //     when Layers::Physical
  //       find_default_organization("physical", "Physical")
  //     when Layers::Motivation
  //       find_default_organization("motivation", "Motivation")
  //     when Layers::Implementation_and_migration
  //       find_default_organization("implementation_migration", "Implementation & Migration")
  //     when Layers::Connectors
  //       find_default_organization("connectors", "Connectors")
  //     when Layers::Other
  //       find_default_organization("other", "Other")
  //     else
  //       raise StandardError, "Unexpected Element Layer: #{item.layer} for item type #{item.type}"
  //     }
  //   when Relationship
  //     find_default_organization("relations", "Relations")
  //   when Diagram
  //     find_default_organization("diagrams", "Views")
  //   else
  //     raise StandardError, "Unexpected item type #{item.class}"
  //   }
  // }

  // find_by_class(klass)
  //   this.indexHash.values.select { |item| item.is_a?(klass) }
  // }

  // find_default_organization(type, name)
  //   result = organizations.find { |f| f.type == type }
  //   return result unless result.nil?
  //   result = organizations.find { |f| f.name == name }
  //   return result unless result.nil?
  //   add_organization(type, name)
  // }

  // find_in_organizations(item, _fs = nil)
  //   find_by_class(DataModel::Organization).select { |f| f.items.include?(item) }.first
  // }

  registerOrg(org: IHasOrganizations) {
    this.indexHash.set(org.id, this.indexOrganizations(org));
  }

  // @todo maybe move to [Organization]
  indexOrganizations(ref: IHasOrganizations) : IHasOrganizations {
    const regFunc = this.registerOrg.bind(this);
    ref.organizations.forEach(regFunc);
    // ref.organizations.forEach(org => {
    //   (this as Model).indexHash[org.id] = this.indexOrganizations(org)
    // });
    return ref;
  }

  // @todo maybe move to [ViewNode]
  indexViewNodes(ref: IIdentifiable) {
    // ref.nodes.each do |node|
    //   this.indexHash[node.id] = indexViewNodes(node)
    // }
    // ref.connections.each { |con| this.indexHash[con.id] = con }
    return ref;
  }

  register(node: IIdentifiable, _parent?: object) {
    this.indexHash.set(node.id, node);
  }

  deregister(node: IIdentifiable) {
    this.indexHash.delete(node.id);
  }
}
