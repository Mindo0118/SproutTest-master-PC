import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',  
    height: '100%', 
  },
  imageStyle: {
    transform: [
      { scale: 1.02 },
      { translateX: 3 }, // 이미지를 X축으로 10만큼 이동
      { translateY: 2 } // 이미지를 Y축으로 -20만큼 이동
    ],
  },
  
  button: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    
  },
  buttonImage: {
    width: 370,    
    height: 210,   
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'absolute',
    bottom: 93,
    flexDirection: 'column',
    alignItems: 'center',    
    justifyContent: 'center', 
  },
  textRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  sideText: {
    color: '#fff',
    fontSize: 16,
  },
  middleText: {
    marginLeft: 5,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default styles;
