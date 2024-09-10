import{ ACTION_CATEGORY,ACTION_DIFFICULTY,ACTION_TYPE, ACTION_MOUNT,ACTION_SCORE}from"./actionType";
// export function SelectCategory(dispatch){
//     let category={type:ACTION_CATEGORY};
//     return  dispatch (category);
// };

export const  handelCategory= (payload)=>({
    type:ACTION_CATEGORY,
    payload,
})
export const  handelDifficulty= (payload)=>({
    type:ACTION_DIFFICULTY,
    payload,
})
export const  handelType= (payload)=>({
    type:ACTION_TYPE,
    payload,
})
export const  handelMount= (payload)=>({
    type:ACTION_MOUNT,
    payload,
})
export const  handelScore= (payload)=>({
    type:ACTION_SCORE,
    payload,
})