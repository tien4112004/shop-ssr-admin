
/*

model Admin {
  adminId        Int       @id @default(autoincrement())
  fullname       String
  username       String @unique
  hashedPassword String
  doB            DateTime? @db.Date
  email          String?   @unique
  gender         String?
}

*/

export default class Admin {
  constructor(adminId, fullname, username, hashedPassword, dob, address, phoneNumber, email, gender) {
    this.adminId = adminId;
    this.fullname = fullname;
    this.username = username;
    this.hashedPassword = hashedPassword;
    this.dob = dob;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.gender = gender;
  }
}