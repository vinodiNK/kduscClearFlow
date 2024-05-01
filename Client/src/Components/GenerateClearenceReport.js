import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

export default function GenerateClearenceReport() {
    const [registrationNumber, setRegistrationNumber] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can handle submission logic here, like sending the registration number to the server
        console.log('Submitted registration number:', registrationNumber);
        // Reset the registration number after submission
        setRegistrationNumber('');
    };

    const handleInputChange = (event) => {
        setRegistrationNumber(event.target.value);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#f1f3f4"
            paddingX={2}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                bgcolor="white"
                boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                borderRadius="8px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                maxWidth="600px"
                width="100%"
                padding={2}
            >
                <TextField
                    label="Registration Number"
                    variant="outlined"
                    value={registrationNumber}
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <Box mr={1}>
                                <SearchIcon />
                            </Box>
                        ),
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth
                    style={{ marginTop: '16px' }}
                >
                    Search
                </Button>
            </Box>
        </Box>
    );
}
