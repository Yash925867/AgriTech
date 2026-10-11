import { Card, CardContent, Typography } from "@mui/material";

function ChartCard({ title, children }) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}

export default ChartCard;