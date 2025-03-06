import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate",
        {emailContent, tone}
      );
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError("An error occurred while generating the reply. Please try again.");
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>
      <Box sx={{ mx: 3 }}>
        <TextField
          label="Email Content"
          fullWidth
          multiline
          variant="outlined"
          rows={7}
          value={emailContent || ""}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel> Tone (Optional) </InputLabel>
          <Select
            value={tone || ""}
            label={"Tone (Optional)"}
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="Formal">Formal</MenuItem>
            <MenuItem value="Informal">Informal</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
            <MenuItem value="Humorous">Humorous</MenuItem>
            <MenuItem value="Authoritative">Authoritative</MenuItem>
            <MenuItem value="Inspirational">Inspirational</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !emailContent}
          fullWidth
        >
          {loading ? <CircularProgress size={25} /> : "Generate Reply"}
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {generatedReply && (
        <Box sx={{ mt: 4, mx: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={7}
            variant="outlined"
            value={generatedReply || ""}
            InputProps={{ readOnly: true }}
          />
          <Button variant="outlined" onClick=
            {() => navigator.clipboard.writeText(generatedReply)}
            fullWidth sx={{ mt: 2 }}>
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App;
