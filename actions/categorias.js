import { 
  RETRIEVE_CATEGORIAS,
  CREATE_CATEGORIA} from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const retrieveCategorias = () => async (dispatch) => {
  try {
    const result = await AsyncStorage.getItem('categoria');
    const parseResult = result === null ? [{name: "Sin Categoria", color:"red"}] : JSON.parse(result)
    // console.log(result, "actions")

    dispatch({
      type: RETRIEVE_CATEGORIAS,
      payload: parseResult,
    });
  } catch (err) {
    console.log(err,"action categorias*");
  }
};

export const createCategoria = (name, color) => async (dispatch) => {
  const result = await AsyncStorage.getItem('categoria'); //Array
  const categoria = [{name: name, color: color}];
  const categoria2 = {name: name, color: color}
  // console.log(result,"resuklt")
  if(result == null){
    try{
      await AsyncStorage.setItem('categoria', JSON.stringify(categoria))
      dispatch({
        type: CREATE_CATEGORIA,
        payload: [{name: name, color: color}]
      })
    }catch{
        console.log("ERROR1")
    }
  }else{
    const objectResult = JSON.parse(result).map((item) => item);
    const create = [...objectResult, categoria2];
    const completed = await AsyncStorage.setItem('categoria', JSON.stringify(create))
    // console.log(create, "action create");
    try{
      dispatch({
        type: CREATE_CATEGORIA,
        payload: [...objectResult,{name: name, color: color}]
      })
    }catch{
        console.log("ERROR2")
    }
  }
  
    
}