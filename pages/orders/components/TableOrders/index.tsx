import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IOrder, IProduct } from '@/utils/types';
import { formatVND } from '@/utils';
import { STRING_EMPTY } from '@/constants';
import { OrderStatus } from '@/utils/enums';
import ModelUpdateOrder from '../ModelUpdateOrder';

interface Column {
  id:
    | 'id'
    | 'email'
    | 'fullName'
    | 'payment'
    | 'phone'
    | 'status'
    | 'address'
    | 'total'
    | 'createdAt';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
  convertStatus?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Mã đơn hàng', minWidth: 170 },
  {
    id: 'fullName',
    label: 'Khách hàng',
    minWidth: 170,
    // align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'address',
    label: 'Địa chỉ',
    minWidth: 170,
    // align: '',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'phone',
    label: 'Số điện thoại',
    minWidth: 170,
    // align: 'right',
    // format: (value: number) => value.toFixed(2),
  },
  {
    id: 'total',
    label: 'Tổng tiền',
    minWidth: 170,
    format: (value: any) => formatVND(value),
    // align: 'right',
    // format: (value: number) => value.toFixed(2),
  },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 170,
    convertStatus: (value: string) => {
      if (value === OrderStatus.newOrder) return 'Chờ xác nhận';
      else if (value === OrderStatus.shipping) return 'Đang giao';
      else if (value === OrderStatus.pending) return 'Đang xử lý';
      else if (value === OrderStatus.completed) return 'Hoàn thành';
      return 'hoàn thành';
    },
  },
  {
    id: 'createdAt',
    label: 'Ngày đặt',
    minWidth: 170,
  },
];

interface IProps {
  orders: IOrder[];
}
const TableOrders = ({ orders }: IProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showModelUpdate, setShowModelUpdate] = React.useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = React.useState<IOrder>();

  const onCloseModelUpdate = React.useCallback(() => {
    setShowModelUpdate(false);
  }, []);

  const onClickRow = React.useCallback((product: IOrder) => {
    setShowModelUpdate(true);
    setCurrentProduct(product);
  }, []);

  const getStatus = React.useMemo(() => {}, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                  className='font-Inter font-semibold'
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    onClick={() => onClickRow(product)}
                    key={product.id}
                  >
                    {columns.map((column) => {
                      const value = product[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className='capitalize font-Inter cursor-pointer'
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value as any)
                            : column.convertStatus
                            ? column.convertStatus(value as string)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ModelUpdateOrder
        order={currentProduct}
        open={showModelUpdate}
        onClose={onCloseModelUpdate}
      />
    </Paper>
  );
};

export default TableOrders;
