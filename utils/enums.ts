export enum Tables {
  products = 'products',
  //
  users = "users",
  contacts = 'contacts',
  leads = 'leads',
  //delete
  comments = "comments",
  replies = "replies",
  chapters = "chapters",
  orders = "orders",
  categories = 'categories'
}

export enum StorageState {
  stateChanged = 'state_changed',
}

export enum ProductStatus {
  active = 'active',
  notActive = 'notActive'
}

export enum OrderStatus {
  newOrder = 'new-order',
  pending = 'pending',
  shipping = 'shipping',
  completed = 'completed'
}