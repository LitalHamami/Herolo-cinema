export const updateObject = (oldObject, updatedProperties ,error = false)=>{
  return{
    ...oldObject,
    ...updatedProperties
  }
}

