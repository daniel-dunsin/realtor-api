export interface ICreateReviewBody {
  text: string;
  author: string;
  listing: string;
  stars: number;
}

export interface IEditReviewBody {
  text: string;
  author: string;
  stars: number;
  _id: string;
}
