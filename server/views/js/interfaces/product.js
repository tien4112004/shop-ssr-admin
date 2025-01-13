
/*

model Category {
  categoryId   Int       @id @default(autoincrement())
  categoryName String    @unique
  description  String?
}

model Brand {
  brandId     Int       @id @default(autoincrement())
  brandName   String    @unique
  description String?
  imageUrl    String?
  publicImgId String?
}

model Product {
  productId          Int            @id @default(autoincrement())
  productName        String
  productDescription String?
  publishedAt        DateTime       @default(now())
  updatedAt          DateTime       @updatedAt
  status             ProductStatus  @default(PUBLISHED)
  stock              Int            @default(0)
  currentPrice       Int
  originalPrice      Int
  soldQuantity       Int            @default(0)
  rating             Float          @default(5)
  numReviews         Int            @default(0)
  brand              Brand          @relation(fields: [brandId], references: [brandId])
  category           Category       @relation(fields: [categoryId], references: [categoryId])
  productImages      ProductImage[]
}

model ProductImage {
  imageId   Int     @id @default(autoincrement())
  productId Int
  publicId  String
  url       String
}

enum ProductStatus {
  PUBLISHED
  UNPUBLISHED
  DELETED
}


*/

export class Category {
  categoryId;
  categoryName;
  description;
}

export class Brand {
  brandId;
  brandName;
  description;
  imageUrl;
  publicImgId;
}

export default class Product {
  productId;
  productName;
  productDescription;
  publishedAt;
  updatedAt;
  status;

  /**
   * @type {Brand}
   */
  brand;
  /**
   * @type {Category}
   */
  category;
  stock;
  currentPrice;
  originalPrice;
  /**
   * @type {{imageId: number, publicId: string, url: string}[]}
   */
  productImages;

  rating;
  numReviews;
  soldQuantity;
}