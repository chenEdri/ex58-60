var mat = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 18, 19],
  [72 ,28, 92],
  [74, 33, 39],
]

var sqtMat = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
]

//mat => arr m*n m = row length , n = col lenght

var twoDArr = [
    [1,2],
    [4,5,6,7],
    [8,9,10]
]
// console.log('specific cell-', sqtMat[0][0]);
// console.log('specific cell-', sqtMat[1][1]);
// console.log('specific cell-', sqtMat[2][0]);

for(var i = 0; i<sqtMat.length; i++) {
    // console.log(sqtMat[i]);
    // console.log('specific row-',sqtMat[0][i]);
    // console.log('specific col-', sqtMat[i][0]);
    // console.log('main diagonal', sqtMat[i][i]);
    console.log('secondary diagonal', sqtMat[i][sqtMat.length -1 -i]);

}