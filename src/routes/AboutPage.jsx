import { Typography, Container, Box, Paper, Divider, Link } from "@mui/material";

const AboutPage = () => {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom color="primary">
                        Σχετικά με την Εφαρμογή
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Εργαλείο υπολογισμού εκπομπών αερίων του θερμοκηπίου
                    </Typography>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom color="primary.main">
                        Περιγραφή Εφαρμογής
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                        Η συγκεκριμένη εφαρμογή έχει αναπτυχθεί στο πλαίσιο πτυχιακής εργασίας για το 
                        Πανεπιστήμιο Θεσσαλίας. Στόχος της είναι η παροχή ενός εργαλείου για τον 
                        υπολογισμό και την καταγραφή των εκπομπών αερίων του θερμοκηπίου σε δημοτικό επίπεδο, με βάση
                        τον οδηγό για ΔηΣΜΕ (Δημοτικά Σχέδια Μείωσης Εκπομπών). Μπορείτε να βρείτε τον οδηγό{' '}
                        <Link href="https://ypen.gov.gr/wp-content/uploads/2023/05/Οδηγός-για-ΔηΣΜΕ.pdf" target="_blank" rel="noopener noreferrer">
                            εδώ
                        </Link>.
                    </Typography>
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom color="primary.main">
                        Χαρακτηριστικά
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                        • Υπολογισμός εκπομπών CO₂, CH₄ και N₂O<br/>
                        • Υπολογισμός απορροφήσεων CO₂<br/>
                        • Κατηγοριοποίηση εκπομπών κατά Scope 1 και Scope 2<br />
                        • Ανάλυση αβεβαιότητας των εκπομπών<br />
                        • Γενική αναφορά και δείκτες κλιματικής επίδοσης<br />
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom color="primary.main">
                        Οδηγίες χρήσης
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                        Για να χρησιμοποιήσετε την εφαρμογή, ακολουθήστε τα παρακάτω βήματα:<br/>
                        1) Περιηγηθείτε στην {' '}
                        <Link href="/" target="_blank" rel="noopener noreferrer">
                            αρχική σελίδα της εφαρμογής.
                        </Link>
                        <br/>
                        2) Επιλέξτε την κατηγορία ρύπων που θέλετε να συμπληρώσετε.<br/>
                        3) Εισάγετε την κατανάλωση του εκάστοτε καυσίμου.<br/>
                        4) Πατήστε το κουμπί "Επιβεβαίωση" αφού έχετε συμπληρώσει όλα τα πεδία.<br/>
                        5) Αναλύστε τα δεδομένα σας στην τελική σελίδα της αναφοράς και αποθηκεύστε την.<br/>
                        <br/>
                        Σιγουρευτείτε ότι <strong>έχετε ακολουθήσει τις αναλυτικές οδηγίες απο τον οδηγό για ΔηΣΜΕ</strong> για την συμπλήρωση των πεδίων
                        και την κατανόηση των μεταβλητών που χρησιμοποιούνται.
                    </Typography>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Box sx={{
                    p: 3,
                    borderRadius: 2,
                    textAlign: 'center'
                }}>
                    <Typography variant="h6" gutterBottom color="primary.main">
                        Επικοινωνία
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Για περισσότερες πληροφορίες, αναφορά προβλημάτων ή αίτηση νέας λειτουργικότητας:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        PLACEHOLDER_EMAIL, PLACEHOLDER_EMAIL
                    </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                        © 2025 Πανεπιστήμιο Θεσσαλίας - PLACEHOLDER_NAME - Διπλωματική Εργασία
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default AboutPage;