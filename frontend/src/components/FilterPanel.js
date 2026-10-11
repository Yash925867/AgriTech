import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

function FilterPanel({ onApply }) {
  const [states, setStates] = useState([]);
  const [crops, setCrops] = useState([]);
  const [years, setYears] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/states")
      .then(res => setStates(res.data));

    axios.get("http://localhost:5000/crops")
      .then(res => setCrops(res.data));

    axios.get("http://localhost:5000/years")
      .then(res => setYears(res.data));
  }, []);

  const handleApply = () => {
    onApply({
      state: selectedState,
      crop: selectedCrop,
      year: selectedYear,
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel>State</InputLabel>
        <Select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {states.map(s => (
            <MenuItem key={s.state_name} value={s.state_name}>
              {s.state_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Crop</InputLabel>
        <Select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {crops.map(c => (
            <MenuItem key={c.crop_name} value={c.crop_name}>
              {c.crop_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Year</InputLabel>
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {years.map(y => (
            <MenuItem key={y.year} value={y.year}>
              {y.year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="success" onClick={handleApply}>
        Apply
      </Button>
    </Box>
  );
}

export default FilterPanel;