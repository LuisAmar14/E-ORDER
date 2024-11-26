import React, { useState } from 'react';
import { Container, Paper, Tabs, Tab, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
}));

const TabPanel = ({ children, value, index }: any) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const AuthPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSignIn = (data: { username: string; password: string }) => {
    
    console.log('Sign In:', data);
    const user = {username: data.username, password: data.password};
    login(user);
    navigate("/auth/home");
  };

  const handleSignUp = (data: Record<string, string>) => {
    
    console.log('Sign Up:', data);
    const user = {username: data.username, password:data.password};
    login(user);
    navigate("/auth/home");
  };

  return (
    <Container component="main" maxWidth="sm">
      <StyledPaper elevation={6}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <SignIn onSubmit={handleSignIn} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignUp onSubmit={handleSignUp} />
        </TabPanel>
      </StyledPaper>
    </Container>
  );
};

export default AuthPage;
