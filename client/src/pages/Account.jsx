import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import { Grid, Container } from '@mui/material';

export default function Account() {
  return(
    <main>
      <h1>Account</h1>
      <Container>
        <Grid container spacing={2}>

          <Grid item sm={12} md={6}>
            <Login/>
          </Grid>

          <Grid item sm={12} md={6}>
            <CreateUser/>
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}