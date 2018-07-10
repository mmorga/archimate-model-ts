export class Property {
  public key: string;
  public value?: string;

  constructor(key: string, value?: string) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `Property<${this.key} = "${this.value}">`;
  }
}
