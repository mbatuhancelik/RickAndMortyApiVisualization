
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRouter } from 'next/router'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Wrapper from '../../components/styleWrapper';

export async function getServerSideProps({params}){

  
    var data = await axios.get("https://rickandmortyapi.com/api/location").then( response =>(response.data))
    var pages = data.info.pages
    var locations = data.results
    var pages = await Promise.all([...Array(pages + 1).keys()].slice(2).map(pageNumber => (axios.get("https://rickandmortyapi.com/api/location?page=" + pageNumber ).then( response =>(response.data.results)))))
    for( let i = 0; i < pages.length; i ++){
      locations = locations.concat(pages[i])
    }
    locations.map(location => location.residents = location.residents.length)
    return {props : {...locations}}
}
export default function locations(locations) {
    locations = Object.keys(locations).map((key) =>  locations[key]);
    const router = useRouter()
    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        {
          id: 'type',
          label: 'Type',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'dimension',
          label: 'Dimension',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'residents',
          label: 'Residents',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US')
        },
      ];
    return (
    <Wrapper>
        <Paper sx={{ width: 7/10 }}>
        <TableContainer>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 57, minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {locations.map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name} 
                          onClick={() => {
                            router.push("/residents/" + row.id);
                          }}>
                            {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
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
            </Paper>
        </Wrapper>
    );
  }