import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IProduct } from '@/utils/types';
import { formatVND } from '@/utils';
import ModelAddProduct from '../ModelAddProduct';
import { STRING_EMPTY } from '@/constants';

interface Column {
  id: 'name' | 'price' | 'quality' | 'category' | 'desc';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Tên SP', minWidth: 170 },
  {
    id: 'price',
    label: 'Giá SP',
    minWidth: 100,
    format: (value: any) => formatVND(value),
  },
  {
    id: 'quality',
    label: 'Số lượng',
    minWidth: 170,
    // align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  // {
  //   id: 'category',
  //   label: 'Nhóm',
  //   minWidth: 170,
  //   // align: '',
  //   // format: (value: number) => value.toLocaleString('en-US'),
  // },
  {
    id: 'desc',
    label: 'Miêu tả',
    minWidth: 170,
    // align: 'right',
    // format: (value: number) => value.toFixed(2),
  },
];

interface IProps {
  products: IProduct[];
}
const TableProducts = ({ products }: IProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showModelUpdate, setShowModelUpdate] = React.useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = React.useState<IProduct>();

  const onCloseModelUpdate = React.useCallback(() => {
    setShowModelUpdate(false);
  }, []);

  const onClickRow = React.useCallback((product: IProduct) => {
    setShowModelUpdate(true);
    setCurrentProduct(product);
  }, []);

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
            {products
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
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ModelAddProduct product={currentProduct} open={showModelUpdate} onClose={onCloseModelUpdate}/>
    </Paper>
  );
};

export default TableProducts;
