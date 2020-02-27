# README
This Repository is Studies Promise by JavaScript<br>
Referenced by<br>
- <a href="https://rightcode.co.jp/blog/information-technology/javascript-promise" target="_blank" rel="noopener">https://rightcode.co.jp/blog/information-technology/javascript-promise</a>
- <a href="https://rightcode.co.jp/blog/information-technology/javascript-async-await" target="_blank" rel="noopener">https://rightcode.co.jp/blog/information-technology/javascript-async-await</a>

# MEMO

- 同期処理<br>
上から順番に処理を実行する

- 非同期処理<br>
一つの処理が終了するのを待たずに次の処理を実行する


## Promiseの状態

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

## then()メソッド
Promiseのインスタンスの状態が、fulfilledの時に実行される関数を登録できるインスタンスメソッド。

## catch()メソッド
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
