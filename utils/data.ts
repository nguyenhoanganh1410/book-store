import { OrderStatus, ProductStatus } from "./enums";

//data template
export const DASHBOARD_TABLE_DATE_TEMPLATE = [
  {
    id: '1',
    clientName: 'Bell',
    price: '25.00$',
    date: '24/12/2023',
    status: 'Pending',
    payout: '24/12/2023',
  },
  {
    id: '2',
    clientName: 'Lee Barrett',
    price: '25.00$',
    date: '24/12/2023',
    status: 'Pending',
    payout: '24/12/2023',
  },
  {
    id: '3',
    clientName: 'Marion Figueroa',
    price: '25.00$',
    date: '24/12/2023',
    status: 'Pending',
    payout: '24/12/2023',
  },
];

export const DASHBOARD_MARKETING_DATA_TEMPLATE = [
  {
    id: 'd1',
    name: 'The hidden cost of bad health insurance',
  },
  {
    id: 'd2',
    name: 'What are Fixed Indemnity Policies?',
  },
];

export const PRODUCT_STATUS = [
  {
    id: ProductStatus.active,
    label: 'Sẵn sàng',
  },
  {
    id: ProductStatus.notActive,
    label: 'Hết hàng',
  },
];

export const PRODUCT_CATEGORY = [
  {
    id: 'burgers',
    label: 'Bánh mì kẹp thịt',
  },
  {
    id: 'sandwiches',
    label: 'Bánh Sandwish',
  },
  {
    id: 'drinks',
    label: 'Đồ uống',
  },
  {
    id: 'pizzas',
    label: 'Bánh Pizza',
  },
];


export const ORDER_STATUS_DATA = [
  {
    id: OrderStatus.newOrder,
    label: 'Chờ xác nhận',
  },
  {
    id: OrderStatus.pending,
    label: 'Đang xử lý',
  },
  {
    id: OrderStatus.shipping,
    label: 'Đang giao hàng',
  },
  {
    id: OrderStatus.completed,
    label: 'Đã hoàn thành',
  },
]