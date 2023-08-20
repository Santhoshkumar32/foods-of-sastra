import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px',
    height: '4rem',
  },
  heading: {
    color: '#f39c12',
    fontFamily: 'cursive, sans-serif',
    fontWeight: '600',
    textDecoration: 'none',
    marginLeft: '0.75rem',
    fontSize: '2.7rem',
    '@media (max-width: 600px)': {
      fontSize: 14,
    },
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  authButton: {
    backgroundColor: '#3498db', // Blue background color for the "Sign In" button
    color: '#FFFFFF',
  },
}));