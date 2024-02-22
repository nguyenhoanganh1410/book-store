//LOCAL_STORAGE_KEYS
export const LOCAL_STORAGE_KEYS = {
  rememberMe: "REMEMBER_ME",
};

//ROUTER
export const ROUTERS = {
  login: "/login",
  signup: "/signup",
  home: "/home",
  newLead: "new-lead",
  chapter: "/chapter",
  resetPassword: "/reset-password",
  product: "/products",
  orders: '/orders',
  categories: '/categories'
};

//FORMAT
export const FORMAT_DATE = {
  formatDate: "DD/MM/YYYY",
  formatFullDate: "MMM DD, YYYY h:mm A",
};

//ERROR_MESSAGES
export const ERROR_CODE_FIREBASE = {
  "auth/user-not-found": "Not found user",
  "auth/wrong-password": "Invalid password",
  "auth/invalid-login-credentials": "Email or Password is incorrect",
  "auth/email-already-in-use": "Email already in use. Please use another email",
};

export const ERROR_SOMTHING_WENT_WRONG = 'Something went wrong please try again!'
export const MESSAGE = {
  addedNewLead: 'Added new lead successfully!'
}
export const FIELD_REQUIRED = 'Hãy nhập đầy đủ thông tin';
export const MESSAGE_UNKNOWN_ERROR = 'An unknown error has occurred please refresh the page and try again.';
export const STRING_EMPTY = '';
export const CREATED_PRODUCT = 'Tạo mới sản phẩm thành công!';
export const MESSAGE_DELETED = 'Đã xoá thành công!'
export const MESSAGE_UPDATED = 'Đã cập nhật thành công!'
export const CREATED_CATEGORY = 'Tạo mới danh mục thành công!';