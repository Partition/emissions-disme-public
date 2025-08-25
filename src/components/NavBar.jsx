import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, useLocation } from 'react-router';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

const NavBar = () => {
    const location = useLocation();

    return (
        <AppBar>
            <Toolbar sx={{ backgroundColor: 'primary.main' }}>
                <EnergySavingsLeafIcon sx={{ mr: 1 }} />
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                    >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            EmissionsCalculator
                        </Typography>
                    </Button>
                <Box sx={{ marginLeft: 'auto' }}>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                    >
                        Εργαλειο
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/constants"
                    >
                        Σταθερες
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/about"
                    >
                        Σχετικα
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;