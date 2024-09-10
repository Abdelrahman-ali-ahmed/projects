import{ ACTION_CATEGORY,ACTION_DIFFICULTY,ACTION_TYPE, ACTION_MOUNT,ACTION_SCORE,ACTION_SAVE_TOKEN,ACTION_LOGGED, ACTION_SAVE_POSTS, ACTION_SAVE_TEST_ID, ACTION_SAVE_LANGUAGE, ACTION_SCORE_FINAL, ACTION_SAVE_AGE, ACTION_SAVE_CATEGORYNAME}from"./actionType";
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
export const  handelScoreFinal= (payload)=>({
    type:ACTION_SCORE_FINAL,
    payload,
})
export const  handelTOKEN= (payload)=>({
    type:ACTION_SAVE_TOKEN,
    payload,
})
export const  handelLOGGED= (payload)=>({
    type:ACTION_LOGGED,
    payload,
})
export const  handelSavePost= (payload)=>({
    type:ACTION_SAVE_POSTS,
    payload,
})
export const  handelSaveTestId= (payload)=>({
    type:ACTION_SAVE_TEST_ID,
    payload,
})
export const  handelSaveLanguage= (payload)=>({
    type:ACTION_SAVE_LANGUAGE,
    payload,
})
export const  handelSaveAge= (payload)=>({
    type:ACTION_SAVE_AGE,
    payload,
})
export const  handelCategoryName= (payload)=>({
    type:ACTION_SAVE_CATEGORYNAME,
    payload,
})