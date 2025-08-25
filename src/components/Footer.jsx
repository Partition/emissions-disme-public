import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 2,
        backgroundColor: 'primary.main',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          
          <Typography variant="body2" color="white" align="center">
            {'Η σελίδα αυτή δημιουργήθηκε από τον '}
            <Link color="inherit" href="mailto:PLACEHOLDER_EMAIL" target="_blank" rel="noopener">
              PLACEHOLDER_NAME
            </Link>
            {' και τον '}
             <Link color="inherit" href="mailto:PLACEHOLDER_EMAIL" target="_blank" rel="noopener">
              PLACEHOLDER_NAME
            </Link>
            {' στα πλαίσια διπλωματικής εργασίας στο '}
            <Link color="inherit" href="PLACEHOLDER_URL" target="_blank" rel="noopener">
              PLACEHOLDER_NAME
            </Link>
            {' του '}
            <Link color="inherit" href="PLACEHOLDER_URL" target="_blank" rel="noopener">
              PLACEHOLDER_NAME
            </Link>
            {
              ', υπό την επίβλεψη του PLACEHOLDER_NAME και της επιτροπής των PLACEHOLDER_NAME και PLACEHOLDER_NAME.'
            }
          </Typography>
          <img src="/UTH-logo-greek.png" alt="University of Thessaly Logo" height="70" />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 