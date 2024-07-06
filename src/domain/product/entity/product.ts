export type ProductProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export class Product {
  private constructor(private props: ProductProps) {}

  // static -> não depende de uma instancia da classe.
  public static create(name: string, price: number) {
    return new Product({
      id: crypto.randomUUID.toString(),
      name,
      price,
      quantity: 0,
    });
  }

  public static with(props: ProductProps) {
    return new Product(props);
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get price() {
    return this.props.price;
  }

  public get quantity() {
    return this.props.quantity;
  }

  // regras de negocio

  public increaseQuantity(quantity: number) {
    this.props.quantity += quantity;
  }

  public decreaseQuantity(quantity: number) {
    this.props.quantity -= quantity;
  }
}
