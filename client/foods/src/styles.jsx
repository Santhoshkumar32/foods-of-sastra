import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: 'column-reverse',
    },
  },
  
  heading: {
    color: 'rgb(0)',
    fontFamily: 'Raleway',
  },
  image: {
    marginLeft: '15px',
  },
}));