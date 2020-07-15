import React from "react";

// Table
import {
  Card,
  Button,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from "@material-ui/core";

// Styles
import { makeStyles } from "@material-ui/styles";
import PerfectScrollbar from "react-perfect-scrollbar";

// Component 
import Modal from './modal'
// Props
//import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    // marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: "flex-end"
  },
  notify: {
    alignItems: "center"
  }
}));

export default function TableCustom(props) {
  
  const { list, pagination, onChange } = props;
  const classes = useStyles();

  
  const handlePageChange = (event, page) => {
       onChange({ page: page + 1 });
  };

  const handleRowsPerPageChange = event => {
    onChange({ size: event.target.value });
  };

  return (
    <Card>
      <CardContent>
        <PerfectScrollbar>
          <div className={classes.content}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ação</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>CEP Inicial</TableCell>
                  <TableCell>CEP Final</TableCell>
                  {[1, 2, 3, 4].map((item, index) => {
                    index++;
                    return (
                      <TableCell key={index}>Transportadora {index}</TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {list.coverage.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Modal setItem={item} />
                      </TableCell>
                      <TableCell>{item.region}</TableCell>
                      <TableCell>{item.postalCodeStart}</TableCell>
                      <TableCell>{item.postalCodeEnd}</TableCell>
                      {item.carriers.map((item, index) => {
                        return (
                          <TableCell key={index}>{item.carrier.name}</TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      {pagination && (
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={pagination.totalElements}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={pagination.number}
            rowsPerPage={pagination.size}
            rowsPerPageOptions={[2, 10, 25]}
          />
        </CardActions>
      )}
    </Card>
  );
}
