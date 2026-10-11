import { Card, CardContent, Typography } from "@mui/material";

function KpiCard({ title, value, subtitle }) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
        <Typography variant="caption">{subtitle}</Typography>
      </CardContent>
    </Card>
  );
}

export default KpiCard;