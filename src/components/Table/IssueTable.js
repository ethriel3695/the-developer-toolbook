import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LoadingProgress from '../Progress/LoadingProgress';

const QUERY_FIELD_ISSUES = gql`
  query {
    getFieldIssues {
      id
      model
      sn
      customer
      requester
      issueDesc
      sameIssue
    }
  }
`;

const useStyles = makeStyles(theme => ({
  table: {
    // minWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    marginBottom: theme.spacing(3),
  },
  w100: {
    width: '100%',
    overflow: 'hidden',
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}));

export default function IssueTable({ toggleDetailDialog }) {
  const classes = useStyles();
  return (
    <div>
      <Query query={QUERY_FIELD_ISSUES}>
        {({ data, loading, error }) => {
          if (loading)
            return (
              <div style={{ textAlign: 'center' }}>
                <LoadingProgress />
              </div>
            );
          if (error) return <p>Error: ${error.message}</p>;

          return (
            <React.Fragment>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={[classes.head, classes.body].join(' ')}
                      key={'model'}
                      style={{ padding: 15 }}
                      align="left"
                    >
                      Model
                    </TableCell>
                    <TableCell
                      className={[classes.head, classes.body].join(' ')}
                      key={'sn'}
                      style={{ padding: 15 }}
                      align="left"
                    >
                      Serial Number
                    </TableCell>
                    <TableCell
                      className={[classes.head, classes.body].join(' ')}
                      key={'customer'}
                      style={{ padding: 15 }}
                      align="left"
                    >
                      Customer
                    </TableCell>
                    <TableCell
                      className={[classes.head, classes.body].join(' ')}
                      key={'requester'}
                      style={{ padding: 15 }}
                      align="left"
                    >
                      Requester
                    </TableCell>
                    <TableCell
                      className={[classes.head, classes.body].join(' ')}
                      key={'sameIssue'}
                      style={{ padding: 15 }}
                      align="left"
                    >
                      Number of Same Issues
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.getFieldIssues.map(row => {
                    return (
                      <TableRow className={classes.row} key={`row_${row.id}`}>
                        <TableCell
                          onClick={() => toggleDetailDialog(row)}
                          className={[classes.body].join(' ')}
                          key={`model_${row.id}`}
                          style={{ padding: 15 }}
                          align="left"
                        >
                          {row.model}
                        </TableCell>
                        <TableCell
                          onClick={() => toggleDetailDialog(row)}
                          className={[classes.body].join(' ')}
                          key={`sn_${row.id}`}
                          style={{ padding: 15 }}
                          align="left"
                        >
                          {row.sn}
                        </TableCell>
                        <TableCell
                          onClick={() => toggleDetailDialog(row)}
                          className={[classes.body].join(' ')}
                          key={`customer_${row.id}`}
                          style={{ padding: 15 }}
                          align="left"
                        >
                          {row.customer}
                        </TableCell>
                        <TableCell
                          onClick={() => toggleDetailDialog(row)}
                          className={[classes.body].join(' ')}
                          key={`requester_${row.id}`}
                          style={{ padding: 15 }}
                          align="left"
                        >
                          {row.requester}
                        </TableCell>
                        <TableCell
                          onClick={() => toggleDetailDialog(row)}
                          className={[classes.body].join(' ')}
                          key={`sameIssue_${row.id}`}
                          style={{ padding: 15 }}
                          align="left"
                        >
                          {row.sameIssue}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </React.Fragment>
          );
        }}
      </Query>
    </div>
  );
}
