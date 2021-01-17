// Compress Array
// Input = [1, 2, 3, 5, 6, 7, 9, 10, 12];
// Output = ["1-3", "5-7", "9-10", "12"];

function compressArray(_arr) {
    let arr = _arr.sort((a, b) => a - b);
    let result = [];
    let i = 0, j = 1;
    if(arr.length === 1)
        result.push(arr[0] + "");
    while(j < arr.length) {
        if(arr[j] - arr[j-1] === 1)
            j++;
        else {
            if( i === j-1)
                result.push(arr[i] + "");
            else
                result.push(arr[i] + "-" + arr[j-1]);
            i = j;
            j = i + 1;        
        }

        if(j >= arr.length) {
            if( i === j-1)
                result.push(arr[i] + "");
            else
                result.push(arr[i] + "-" + arr[j-1]);
        }
    }
    return result;
}