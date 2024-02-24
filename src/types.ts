export interface UserData {
  username: string;
  usernameLowercase: string;
  about: string;
  avatarImage: string;
  bannerImage: string;
}

export interface ClerkError {
  errors: {
    message?: string;
    longMessage?: string;
  }[];
}
