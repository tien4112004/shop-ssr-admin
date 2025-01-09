
/*

  userId            Int               @id @default(autoincrement())
  status            UserStatus        @default(ACTIVE)
  email             String            @unique
  hashedPassword    String
  confirmed         Boolean           @default(false)
  createdAt         DateTime          @default(now())
  lastLogin         DateTime?
  phoneNumber       String?
  fullname          String?
  avatarUrl         String?
  publicImgId       String?
  oauthProvider     String?
  oauthId           String?           @unique

*/

export default class User {
  userId;

  avatarUrl;
  status;
  fullname;
  email;
  phoneNumber;

  lastLogin;
  createdAt;

  confirmed;
  publicImgId;
  oauthProvider;
  oauthId;
}
