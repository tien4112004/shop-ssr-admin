
/*

model Order {
  orderId       Int           @id @default(autoincrement())
  userId        Int
  totalAmount   Float
  orderStatus   OrderStatus   @default(PENDING)
  createdAt     DateTime      @default(now())
  phoneNumber   String?
  country       String
  city          String
  district      String
  ward          String
  addressDetail String?
  paymentMethod PaymentMethod
  user          User          @relation(fields: [userId], references: [userId])
  details       OrderDetail[]
}

model OrderDetail {
  orderId         Int
  productId       Int
  quantity        Int
  priceAtPurchase Float
  order           Order   @relation(fields: [orderId], references: [orderId])
  product         Product @relation(fields: [productId], references: [productId])

  @@id([orderId, productId])
}

enum OrderStatus {
  PENDING
  CANCELLED
  CONFIRMED
  SHIPPING
  DELIVERED
  PAID
}

enum PaymentMethod {
  COD
  VNPAY
}

*/

import Product from "./product";
import User from "./user";


export class OrderDetail {
  orderId;
  /**
   * @type {Product}
   */
  product;
  quantity;
  /**
   * @type {number}
   */
  priceAtPurchase;
}

export default class Order {
  orderId;
  totalAmount;
  /**
   * @type {'PENDING' | 'CANCELLED' | 'CONFIRMED' | 'SHIPPING' | 'DELIVERED' | 'PAID'}
   */
  orderStatus;
  createdAt;
  phoneNumber;
  country;
  city;
  district;
  ward;
  addressDetail;
  paymentMethod;
  
  /**
   * @type {User}
   */
  user;

  /**
   * @type {{
   * productId: number,
   * product: Product,
   * quantity: number,
   * priceAtPurchase: number
   * }[]}
   */
  details;
}