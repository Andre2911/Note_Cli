import { 
    RETRIEVE_SETTINGS,
    UPDATE_SETTINGS} from "./types";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  
  export const retrieveSettings = () => async (dispatch) => {
    try {
      const result = await AsyncStorage.getItem('settings');
      if(result == null){
            const setting = [{time: 3600, short: 300, strictmode: false, auto: true}];
            await AsyncStorage.setItem('settings', JSON.stringify(setting))
            dispatch({
                type: RETRIEVE_SETTINGS,
                payload: setting
            })
      }else{
            const parseResult = JSON.parse(result)
            dispatch({
                type: RETRIEVE_SETTINGS,
                payload: parseResult,
            });
      }
      
    //   console.log(parseResult, "actions")
    } catch (err) {
      console.log(err,"action setting*");
    }
  };
  
  export const updateTarea = (time, short, strictmode, auto) => async (dispatch) => {
    const result = await AsyncStorage.getItem('settings'); //Array
    const categoria = [{time: time, short: short, strictmode: strictmode, auto: auto}];
    const categoria2 = {time: time, short: short, strictmode: strictmode, auto: auto}
    
    if(result == null){
      try{
        await AsyncStorage.setItem('settings', JSON.stringify(categoria))
        dispatch({
          type: UPDATE_SETTINGS,
          payload: [{time: time, short: short, strictmode: strictmode, auto: auto}]
        })
      }catch{
          console.log("action settings")
      }
    }else{
      const objectResult = JSON.parse(result).map((item) => item);
      const create = [...objectResult, categoria2];
      const completed = await AsyncStorage.setItem('settings', JSON.stringify(create))
      // console.log(create, "action create");
      try{
        dispatch({
          type: UPDATE_SETTINGS,
          payload: [...objectResult,{time: time, short: short, strictmode: strictmode, auto: auto}]
        })
      }catch{
          console.log("ACTION UPDATE SETTINGS")
      }
    }
    
      
  }