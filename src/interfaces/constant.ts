export type IPropertyType =
  | "Apartment"
  | "Bungalow"
  | "Condo"
  | "House"
  | "Land"
  | "Single Family";

export type IPropertyStatus = "sale";

export type IPropertyAmenity =
  | "Air Conditioning"
  | "Barbeque"
  | "Dryer"
  | "Gym"
  | "Laundry"
  | "Lawn"
  | "Microwave"
  | "Outodoor Shower"
  | "Refrigerator"
  | "Sauna"
  | "Swimming Pool"
  | "TV Cable"
  | "Washer"
  | "Wi-fi"
  | "Window Coverings";

export type IAreaSuffix = "sq.m" | "acre";

export type IArticleCategory =
  | "construction"
  | "business"
  | "apartment"
  | "sales";

export type IBiddingStatus = "rejected" | "accepted" | "pending" | "";

export type ITransactionStatus = "success" | "failed" | "pending";

export type ITransactionType = "payment" | "withdrawal";
