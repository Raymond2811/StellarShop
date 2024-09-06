import { jwtDecode } from "jwt-decode";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import { Grid, Container } from '@mui/material';

export default function Account() {
  return(
    <main>
      <h1>Account</h1>
      <Container>
        <Grid container spacing={2}>

          <Grid 
            item 
            xs={12} 
            sm={6} 
            sx={{display:'flex', justifyContent:'center',}}
          >
            <Login/>
          </Grid>

          <Grid 
            item 
            xs={12} 
            sm={6}
            sx={{display:'flex', justifyContent:'center',}}
          >
            <CreateUser/>
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}