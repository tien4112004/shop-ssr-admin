
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
  constructor(userId, status, email, hashedPassword, confirmed, createdAt, lastLogin, phoneNumber, fullname, avatarUrl, publicImgId, oauthProvider, oauthId) {
    this.userId = userId;
    this.status = status;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.confirmed = confirmed;
    this.createdAt = createdAt;
    this.lastLogin = lastLogin;
    this.phoneNumber = phoneNumber;
    this.fullname = fullname;
    this.avatarUrl = avatarUrl;
    this.publicImgId = publicImgId;
    this.oauthProvider = oauthProvider;
    this.oauthId = oauthId;
  }
}
