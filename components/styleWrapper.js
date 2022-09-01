import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box} from '@mui/system';
import React, { Component } from 'react';
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    }
  });


class Wrapper extends Component{
    render(){
        return (
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
            <Box    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    >
                        {this.props.children}
                    </Box>
        </ThemeProvider>
        )
    }
        
    
}

export default Wrapper;