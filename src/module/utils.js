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



console.log(getCurrentTimestamp());