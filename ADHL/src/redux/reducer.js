import{ ACTION_CATEGORY,ACTION_DIFFICULTY,ACTION_TYPE, ACTION_MOUNT,ACTION_SCORE,ACTION_SAVE_TOKEN, ACTION_LOGGED, ACTION_SAVE_POSTS, ACTION_SAVE_TEST_ID, ACTION_SAVE_LANGUAGE, ACTION_SCORE_FINAL, ACTION_SAVE_AGE, ACTION_SAVE_CATEGORYNAME}from"./actionType";
const initialState ={
    questionCategory:"",
    questionDifficulty:"",
    questionType:"",
    amount_question:50,
    score:0,
    scorefinal:0,
    token:"",
    age:0,
    logged:false,
    posts:[],
    test:"",
    categoryName:"",
    language:"English",

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
        // console.log("body");
       return {...state,score:action.payload,};
       case ACTION_SCORE_FINAL:
        // console.log("body");
       return {...state,scorefinal:action.payload,};
       case ACTION_SAVE_TOKEN:
        return {...state,token:action.payload,};
        case ACTION_LOGGED:
        return {...state,logged:action.payload,};
        case ACTION_SAVE_POSTS:
        return {...state,posts:action.payload,};
        case ACTION_SAVE_TEST_ID:
        return {...state,test:action.payload,};
        case ACTION_SAVE_LANGUAGE:
        return {...state,language:action.payload,};
        case ACTION_SAVE_AGE:
        return {...state,age:action.payload,};
        case ACTION_SAVE_CATEGORYNAME:
        return {...state,categoryName:action.payload,};
        default:
        return state;


    }
    return state;

}
export default reducer;