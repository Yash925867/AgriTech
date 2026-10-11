import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

function Profile() {

  const members = [
    {
      name: "Aditya Raghuvanshi",
      role: "Full Stack Developer",
      desc: "Designed and developed the backend architecture, database structure, and dashboard logic integration."
    },
    {
      name: "Member 2",
      role: "Frontend Developer",
      desc: "Created modern UI components and implemented interactive data visualizations."
    },
    {
      name: "Member 3",
      role: "Data Analyst",
      desc: "Handled data preprocessing, normalization, and performance optimization of SQL queries."
    }
  ];

  return (
    <div style={{ padding: 30 }}>
      <Typography variant="h4" gutterBottom>
        Project Team
      </Typography>

      <Grid container spacing={4}>
        {members.map((m, index) => (
          <Grid item xs={4} key={index}>
            <Card className="glass-card">
              <CardContent>
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    margin: "0 auto 20px auto"
                  }}
                />
                <Typography variant="h6" align="center">
                  {m.name}
                </Typography>
                <Typography align="center" sx={{ opacity: 0.8 }}>
                  {m.role}
                </Typography>
                <Typography sx={{ mt: 2 }} align="center">
                  {m.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Profile;