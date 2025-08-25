import { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import tableData from '../config/tableData.json';
import VariableEmissionsTable from './VariableEmissionsTable.jsx';
import GlobalControls from './GlobalControls';

const TabWindow = () => {
    const [tabNumber, setTabNumber] = useState(0);
    const handleChange = (event, newValue) => {
        setTabNumber(newValue);
    };

    return (
        <Box>
            <GlobalControls currentCategory={tabNumber.toString()} />
            <Tabs
                value={tabNumber}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Category Tabs"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
                {Object.keys(tableData).map((key, index) => (
                    <Tab
                        key={index}
                        label={`${key}. ${tableData[key].Category}`}
                        sx={{ textTransform: 'none' }}
                    />
                ))}
            </Tabs>

            <Box sx={{ p: 1 }}>
                <VariableEmissionsTable key={tabNumber} categoryNumber={tabNumber.toString()} />
            </Box>
        </Box>
    );
};

export default TabWindow;
