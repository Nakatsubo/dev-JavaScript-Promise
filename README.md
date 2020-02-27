# README
This Repository is Studies Promise by JavaScript<br>
Referenced by<br>
- <a href="https://rightcode.co.jp/blog/information-technology/javascript-promise" target="_blank" rel="noopener">https://rightcode.co.jp/blog/information-technology/javascript-promise</a>
- <a href="https://rightcode.co.jp/blog/information-technology/javascript-async-await" target="_blank" rel="noopener">https://rightcode.co.jp/blog/information-technology/javascript-async-await</a>

# MEMO

- 同期処理<br>
上から順番に処理を実行する。

- 非同期処理<br>
一つの処理が終了するのを待たずに次の処理を実行する。

```
// setTimeoutの場合
console.log(1);
setTimeout(() => {
  console.log(2);
}, 1000);
console.log(3);

// => 実行結果
// 1
// 3
// 2
```

## Promise
Promiseは非同期処理の状態を表すオブジェクト。

|状態|内容|
|-----|-----|
|apending|初期状態、実行中|
|fulfilled|処理が成功した状態|
|rejected|処理が失敗した状態|

```
return new Promise((resolve, reject) => {
  resolve(); // => fulfilledの状態になる
  rejected(); // => rejectedの状態になる
});
```

## Promiseの結果

### then()メソッド
Promiseのインスタンスの状態が、fulfilledの時に実行される関数を登録できるインスタンスメソッド。

### catch()メソッド
Promiseのインスタンスの状態が、rejectedの時に実行される関数を登録できるインスタンスメソッド。

```
function purchaseFunc(pay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (pay >= 100) {
        console.log('Success!');
        resolve(pay - 100);
      } else {
        reject('Failure!');
      };
    }, 1000);
  });
};

purchaseFunc(500)
  .then((change) => {
    console.log(`${change}yen`);
  })
  .catch((error) => {
    console.log(error);
  })

// => Success!
// => 400yen
```

## PromiseをsetTimeoutで処理

```
// const waitFunc = function(sec) {
//   return new Promise(function(resolve) {
//     setTimeout(resolve, sec);
//   });
// };

// 上記を省略
const waitFunc = (sec) => {
  return new Promise((resolve) => setTimeout(resolve, sec));
};

waitFunc(1000).then(() => {
  console.log('Hello, JavaScript');
});
```

## async
asyncは非同期関数を定義する宣言。

```
// 下記は同義

async function asyncFunc() {
  // ...
  return value;
}

function asyncFunc() {
  return new Promise((resolve, reject) => {
    // ...
    resolve(value);
  });
}
```

### async関数内で、Promiseをreturn
Promiseがそのまま返る。。。みたい。

```
async function rejectFunc() {
  return Promise.reject(new Error('Error!'));
};
rejectFunc().catch(error => console.log(error));
// => Error: Error!
```
