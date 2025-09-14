export const queryKeys = {
  listOffers: "listOffers",
  listProducts: "listProducts",
  listFavorites: "listFavorites",
  listPopularProducts: "listPopularProducts",
  listOrders: "listOrders",
  reviews: "reviews",
  listCart: "listCart",
  listAddresses: "listAddresses",
  auth: "auth",
  favorite: "favorite",
  userData: "userData",
  listCategories: "listCategories",
  productDetails: "productDetails",
  contactUs: "contactUs",
  storeQuote: "storeQuote",
  storeAppointment: "storeAppointment",
  home: "home",
} as const;

export type QueryKey = typeof queryKeys[keyof typeof queryKeys];
