import { Container, Tab, Box, Toolbar } from '@mui/material';
import TabWindow from './components/TabWindow';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router';
import AboutPage from './routes/AboutPage';
import ConstantsPage from './routes/ConstantsPage';
import ReportPage from './routes/ReportPage';
import Footer from './components/Footer';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <Toolbar />
      <Container component="main" maxWidth="xl" sx={{ flexGrow: 1, padding: 0 }}>
        <Routes>
          <Route path="/" element={<TabWindow />} />
          <Route path="/constants" element={<ConstantsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </Container>
      <Footer />
    </Box>
  )
}

export default App
