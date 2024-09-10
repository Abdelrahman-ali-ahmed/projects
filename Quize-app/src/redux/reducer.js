import{ ACTION_CATEGORY,ACTION_DIFFICULTY,ACTION_TYPE, ACTION_MOUNT,ACTION_SCORE}from"./actionType";
const initialState ={
    questionCategory:"",
    questionDifficulty:"",
    questionType:"",
    amount_question:50,
    score:0,

};

const reducer =(state=initialState,action)=>{
    switch(action.type){  
        case ACTION_CATEGORY:
       return {...state,questionCategory:action.payload,};
       case ACTION_DIFFICULTY:
        return {...state, questionDifficulty:action.payload,};
        case ACTION_TYPE:
       return {...state,questionType:action.payload,};
       case ACTION_MOUNT:
       return {...state,amount_question:action.payload,};
       case ACTION_SCORE:
        console.log("body");
       return {...state,score:action.payload,};
        default:
        return state;


    }
    return state;

}
export default reducer;