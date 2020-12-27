

//actions
const createPolicy = (name, amount) => {
    return {
        type : 'CREATE_POLICY',
        payload : {
            name: name,
            amount : amount
        }
    };
};

const deletePolicy = (name) => {
    return {
        type: 'DELETE_POLICY',
        payload : {
            name: name
        }
    };
};

const createClaim = (name, amountOfMoney) => {
    return {
        type: 'CREATE_CLAIM',
        payload : {
            name: name,
            amountOfMoney: amountOfMoney
        }
    }
}

//reducers
const claimHistory = (oldListOfClaims = [], action) => {
    if(action.type === 'CREATE_CLAIM'){
        return [...oldListOfClaims, action.payload]

    }

    return oldListOfClaims;
}

const accounting = (bagOfMoney = 100, action) => {
    if(action.type === 'CREATE_CLAIM'){
        return bagOfMoney - action.payload.amountOfMoney
    }
    else if(action.type === 'CREATE_POLICY'){
        return bagOfMoney + action.payload.amount
    }

    return bagOfMoney;
}

const policies = (listOfPolicies = [], action) => {
    if(action.type === 'CREATE_POLICY'){
        return [...listOfPolicies, action.payload.name]
    } else if (action.type === 'DELETE_POLICY'){
        return listOfPolicies.filter(name => name !== action.payload.name)
    }

    return listOfPolicies;
}

const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const ourDepartments = combineReducers ({
    accounting: accounting,
    claimHistory : claimHistory,
    policies : policies
})

const store = createStore(ourDepartments);


store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Bob', 30));

store.dispatch(createClaim('Alex', 120));

console.log(store.getState());