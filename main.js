// function purchaseFunc(pay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (pay >= 100) {
//         console.log('Success!');
//         resolve(pay - 100);
//       } else {
//         reject('Failure!');
//       };
//     }, 1000);
//   });
// };

// purchaseFunc(500)
//   .then((change) => {
//     console.log(`${change}yen`);
//     return purchaseFunc(change);
//   })
//   // then() を直列処理する
//   .then((change) => {
//     console.log(`${change}yen`);
//     // return purchaseFunc(change);
//   })
//   .catch((error) => {
//     console.log(error);
//   })

// // => Success!
// // => 400yen

// const waitFunc = function(sec) {
//   return new Promise(function(resolve) {
//     setTimeout(resolve, sec);
//   });
// };

// const waitFunc = (sec) => {
//   return new Promise((resolve) => setTimeout(resolve, sec));
// };

// waitFunc(1000).then(() => {
//   console.log('Hello, JavaScript');
// });

// async function asyncFunc() {
//   return 'resolve';
// };
// asyncFunc().then(value => console.log(value));
// // => resolve

// async function rejectFunc() {
//   return Promise.reject(new Error('Error!'));
// };
// rejectFunc().catch(error => console.log(error));
// // => Error: Error!

// async function throwFunc() {
//   throw new Error('Error!');
// }
// throwFunc().catch(error => console.log(error));
// // => Error: Error!

const waitFunc = (sec) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, sec);
  });
}

async function awaitFunc() {
  console.log(1);
  // waitFunc(3000); // awaitを指定しなければPromiseの結果を待機しない。
  await waitFunc(3000);
  console.log(2);
};

awaitFunc();
console.log(3);

// => 1
// => 3
// 3000ミリ秒後に処理
// => 2
