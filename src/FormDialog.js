import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({movie, id, list}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateMovie = () => {
    const data = {
      title: document.getElementById("form-dialog").value
    };
    const update = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }
    fetch(`https://epmovieapi.herokuapp.com/movies/${id}`, update)
    .then(res => {
      if (!res.ok) throw new Error(`Error: ${res.status}`)
      return res.json()
    })
    .then(data => list.setMovies(data)) // add this line of code here to your fetch
    .then(()=> setOpen(false));
  }

  return (
    <div>
      <Button variant='outlined' style={{ cursor: "pointer" }}onClick={handleClickOpen}>
        {movie}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Seeing incorrect information?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the information you would like to change below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="form-dialog"
            label="Movie Title"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {updateMovie();handleClose()}}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}