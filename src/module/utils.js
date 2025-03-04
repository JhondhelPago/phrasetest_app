export const IsEmptyString = (value) => {

    if (value === ''){
        return true;
    }else{
        return false;
    }

}


// export const getCurrentTimestamp = () => {
//     const now = new Date();

//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const day = String(now.getDate()).padStart(2, '0');
//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     const seconds = String(now.getSeconds()).padStart(2, '0');
//     const milliseconds = String(now.getMilliseconds()).padStart(3, '0') + Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Simulating microseconds

//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
// }


export const getCurrentTimestamp = () => {
    const now = new Date();

    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(now.getUTCMilliseconds()).padStart(3, '0') + Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Simulating microseconds

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export const rubricsScorePercentile = (score) => {
    //expected input {1, 2, 3, 4}

    const int_value =  parseInt((Number(score) / 4) * 100);

    return int_value;
}

export const continuousScorePercetile = (float_score) => {

    if (float_score >= 100) {
        return "100%";
    }

    const int_value = parseInt(parseFloat(float_score) * 100);

    return int_value;

}

// export const ClarityScoreForamat = (float_score) => {

//     const int_score = parseInt(float_score);

//     let range = 3;

//     let lowerbound = [];

//     for (let iter = range; iter > (int_score - range); iter -= 1) {

//         lowerbound.push(iter);
        
//     }


//     for (let iter = (int_score + range); iter <)


// }


console.log(getCurrentTimestamp());