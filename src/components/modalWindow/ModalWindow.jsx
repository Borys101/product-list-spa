import * as React from 'react';
import { TableBody, TableCell, TableRow, TableContainer, Table } from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid gray',
  p: 4,
};

const ModalWindow = ({ open, setOpen, product }) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{backgroundColor:'gray'}}
      >
        <TableContainer sx={{ mx: 'auto', mt: 1}}>
            <Table>
                <TableBody sx={style}>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>Pantone Value</TableCell>
                    </TableRow>
                    <TableRow key={product.id} sx={{bgcolor: product.color}}>
                            <TableCell component="th" scope="row">
                                {product.id}
                            </TableCell>
                            <TableCell>
                                {product.name}
                            </TableCell>
                            <TableCell>
                                {product.year}
                            </TableCell>
                            <TableCell>
                                {product.color}
                            </TableCell>
                            <TableCell>
                                {product.pantone_value}
                            </TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
      </Modal>
    </div>
  );
}

export default ModalWindow;