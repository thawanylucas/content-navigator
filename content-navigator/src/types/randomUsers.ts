export interface RandomUserResponse {
  results: RandomUser[];
}

export interface RandomUser {
  login: {
    username: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  picture: {
    thumbnail: string;
    large: string;
  };
  location: {
    city: string;
    state: string;
  };
}
