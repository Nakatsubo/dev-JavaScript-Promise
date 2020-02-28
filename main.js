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

// const waitFunc = (sec) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, sec);
//   });
// }

// async function awaitFunc() {
//   console.log(1);
//   // waitFunc(3000); // awaitを指定しなければPromiseの結果を待機しない。
//   await waitFunc(3000);
//   console.log(2);
// };

// awaitFunc();
// console.log(3);

// // => 1
// // => 3
// // 3000ミリ秒後に処理
// // => 2

// const promiseFunc = (number) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(number * 2);
//     }, 1000);
//   });
// };

// async function asyncFunc() {
//   const a = await promiseFunc(1);
//   // awaitを指定しないと、Promise {<pending>} と出力される
//   console.log(a);
//   const b = await promiseFunc(2);
//   console.log(b);
//   const c = await promiseFunc(3);
//   console.log(c);
//   return a + b + c;
// };

// asyncFunc().then((value) => {
//   console.log(value);
// });

// // => 2
// // => 4
// // => 6
// // => 12

// const promiseFunc = (number) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(number * 2);
//     }, 1000);
//   });
// };

// async function asyncFunc() {
//   const numbers = await Promise.all([
//     promiseFunc(1),
//     promiseFunc(2),
//     promiseFunc(3)
//   ]);
//   console.log(numbers);
// };

// asyncFunc();

// // => (3) [2, 4, 6]

// async function asyncFailure() {
//   const value = await Promise.reject(new Error('Error!'));
// };
// asyncFailure().catch(error => console.log(error.message));
// // => Error!

// function promiseResolve(number) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log(1);
//       resolve(number * 2)
//     }, 1000);
//   })
// };

// function promiseFunc() {
//   return promiseResolve(5).then(result => {
//     console.log(2);
//     return result += 5;
//   });
// };

// promiseFunc().then(result => {
//   console.log(3);
//   console.log(result);
// });

// function asyncResolve(number) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log(1);
//       resolve(number * 2);
//     }, 1000)
//   });
// };

// async function asyncFunc() {
//   const result = await asyncResolve(5);
//   console.log(2);
//   return result + 5;
// }

// asyncFunc().then(result => {
//   console.log(3);
//   console.log(result);
// })

// function promiseResolve(number) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(number);
//     }, 1000);
//   });
// };

// function promiseFunc() {
//   let result = 0;
//   return promiseResolve(5)
//     .then(number => {
//       result += number;
//         return promiseResolve(10);
//     })
//     .then(number => {
//       result *= number;
//       return promiseResolve(20)
//     })
//     .then(number => {
//       result += number;
//       return result;
//     });
// };

// promiseFunc().then(result => {
//   console.log(result);
// });

// // => 70

// function asyncResolve(number) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(number);
//     }, 1000);
//   });
// };

// async function asyncfunc() {
//   return await asyncResolve(5) * await asyncResolve(10) + await asyncResolve(20);
// };

// asyncfunc().then(result => {
//   console.log(result);
// });

// // => 70

// function asyncResolve(number) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(number);
//     }, 1000);
//   });
// };

// async function asyncFunc() {
//   for (let i = 0; i < 5; i++) {
//     const result = await asyncResolve(i);
//     console.log(result);
//   };
//   return 'Finish!';
// };

// asyncFunc().then(result => {
//   console.log(result);
// });

// // => 0
// // => 1
// // => 2
// // => 3
// // => 4
// // => Finish!

// function promiseResolveA(number) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(number);
//     }, 1000);
//   });
// };

// function promiseResolveB(number) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(number * 2);
//     }, 1000);
//   });
// };

// function promiseFunc() {
//   const promiseA = promiseResolveA(5);
//   const promiseB = promiseResolveA(10);
//   const promiseC = promiseB.then(number => {
//     return promiseResolveB(number);
//   });

//   return Promise.all([promiseA, promiseB, promiseC])
//     .then(([a, b, c]) => {
//       return [a, b, c];
//     });
// };

// promiseFunc().then(([a, b, c]) => {
//   console.log(a, b, c)
// });

// // => 5, 10, 20

function asyncResolveA(number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(number);
    }, 1000);
  });
};

function asyncResolveB(number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(number * 2);
    }, 1000);
  });
};

async function asyncFunc() {
  const [a, b] = await Promise.all([asyncResolveA(5), asyncResolveA(10)]);
  const c = await asyncResolveB(b);
  return [a, b, c];
};

asyncFunc().then(([a, b, c]) => {
  console.log(a, b, c);
});

// => 5, 10, 20
