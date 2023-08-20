import { makeStyles} from '@material-ui/core/styles';

export default makeStyles(()=>({
  media: {
    height: 0,
    paddingTop: '65%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  time: {
   fontFamily: 'Montserrat, cursive',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 0px 0px 10px',
    fontFamily: 'Montserrat , cursive',
  },
  info:{
  display: 'flex',
  margin: '5px 0px 0px 10px',
  },
  title: {
    padding: '0px 10px',
    margin: '0px',
    fontFamily: 'Dancing Script,cursive',
    fontWeight: '600',
  },
  canteen: {
    padding: '0px 10px',
    fontFamily: 'Pacifico, cursive '
  },
  desc:{
    fontFamily: 'Nunito, cursive',
    margin: '0px 0px 0px 5px',
    padding: '5px 0px 10px 16px',
  },
  cardActions: {
    padding: '0 10px 8px 10px',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0%',
  },
  cardContents: {
    padding: '0px 0px 0px 5px',
  },
  rating:{
    padding: '0px 0px 0px 5px',
  }
}));