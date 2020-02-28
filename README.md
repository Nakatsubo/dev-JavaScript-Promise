# README
This Repository is Studies Promise by JavaScript<br>
Referenced by<br>
- <a href="https://rightcode.co.jp/blog/information-technology/javascript-promise" target="_blank" rel="noopener">https://rightcode.co.jp/blog/information-technology/javascript-promise</a>
- <a href="https://rightcode.co.jp/blog/information-technology/javascript-async-await" target="_blank" rel="noopener">https://rightcode.co.jp/blog/information-technology/javascript-async-await</a>
- <a href="https://qiita.com/soarflat/items/1a9613e023200bbebcb3" target="_blank" rel="noopener">https://qiita.com/soarflat/items/1a9613e023200bbebcb3</a>


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
// => 1
// => 3
// => 2
```

## Promise
Promiseは非同期処理の状態を表すオブジェクト。

|状態|内容|
|-----|-----|
|pending|初期状態、実行中|
|fulfilled|処理が成功した状態|
|rejected|処理が失敗した状態|

```
// Promiseを返す
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
asyncは非同期関数を定義する宣言。Promiseインスタンスを返す。

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
Promiseがそのまま返る...みたい。

```
async function rejectFunc() {
  return Promise.reject(new Error('Error!'));
};
rejectFunc().catch(error => console.log(error));

// => Error: Error!
```

### async関数内で、throw
throw文は現在の関数の実行を中止し、定義した例外を処理する。

```
async function throwFunc() {
  throw new Error('Error!');
}
throwFunc().catch(error => console.log(error.message));

// => Error!
```

- Errorコンストラクタ<br>
Errorオブジェクトを生成する。<br>
<a href="https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Error" target="_blank" rel="noopener">MDN web docs</a>

## await
awaitは指定したPromiseの結果(resolve, reject)が返されるまで、async内の処理を待機する。

```
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
```

### 複数のawaitを直列処理

```
const promiseFunc = (number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(number * 2);
    }, 1000);
  });
};

async function asyncFunc() {
  const a = await promiseFunc(1);
  // awaitを指定しないと、Promise {<pending>} と出力される
  console.log(a);
  const b = await promiseFunc(2);
  console.log(b);
  const c = await promiseFunc(3);
  console.log(c);
  return a + b + c;
};

asyncFunc().then((value) => {
  console.log(value);
});

// => 2
// => 4
// => 6
// => 12
```

### awaitの例外処理

```
async function asyncFailure() {
  const value = await Promise.reject(new Error('Error!'));
};
asyncFailure().catch(error => console.log(error.message));
// => Error!
```

## Promise.all()
引数に非同期関数の配列を受け取り、Promiseインスタンスを返す。<br>
並列処理が可能となる。

```
const promiseFunc = (number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(number * 2);
    }, 1000);
  });
};

async function asyncFunc() {
  const numbers = await Promise.all([
    promiseFunc(1),
    promiseFunc(2),
    promiseFunc(3)
  ]);
  console.log(numbers);
};

asyncFunc();

// => (3) [2, 4, 6]
```

## Promiseとasync/awaitの記述例
async/awaitで記述する方がわかりやすい。

- Promise

```
function promiseResolve(number) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(1);
      resolve(number * 2)
    }, 1000);
  })
};

function promiseFunc() {
  return promiseResolve(5).then(result => {
    console.log(2);
    return result += 5;
  });
};

promiseFunc().then(result => {
  console.log(3);
  console.log(result);
});

// => 15
```

- async/await

```
function asyncResolve(number) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(1);
      resolve(number * 2);
    }, 1000)
  });
};

async function asyncFunc() {
  const result = await asyncResolve(5);
  console.log(2);
  return result += 5;
}

asyncFunc().then(result => {
  console.log(3);
  console.log(result);
})

// => 15
```

## 直列のPromiseとasync/awaitの記述例
やっぱり...async/awaitで記述する方がわかりやすい。

- Promise

```
function promiseResolve(number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(number);
    }, 1000);
  });
};

function promiseFunc() {
  let result = 0;
  return promiseResolve(5)
    .then(number => {
      result += number;
        return promiseResolve(10);
    })
    .then(number => {
      result *= number;
      return promiseResolve(20)
    })
    .then(number => {
      result += number;
      return result;
    });
};

promiseFunc().then(result => {
  console.log(result);
});

// => 70
```

- async/await

```
function asyncResolve(number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(number);
    }, 1000);
  });
};

async function asyncfunc() {
  return await asyncResolve(5) * await asyncResolve(10) + await asyncResolve(20);
};

asyncfunc().then(result => {
  console.log(result);
});

// => 70
```

- for文を使った非同期処理

```
function asyncResolve(number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(number);
    }, 1000);
  });
};

async function asyncFunc() {
  for (let i = 0; i < 5; i++) {
    const result = await asyncResolve(i);
    console.log(result);
  };
  return 'Finish!';
};

asyncFunc().then(result => {
  console.log(result);
});

// => 0
// => 1
// => 2
// => 3
// => 4
// => Finish!
```

## 並列のPromiseとasync/awaitの記述例
やっぱり...async/awaitで記述する方がわかりやすい。

- Promise

```
function promiseResolveA(number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(number);
    }, 1000);
  });
};

function promiseResolveB(number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(number * 2);
    }, 1000);
  });
};

function promiseFunc() {
  const promiseA = promiseResolveA(5);
  const promiseB = promiseResolveA(10);
  const promiseC = promiseB.then(number => {
    return promiseResolveB(number);
  });

  return Promise.all([promiseA, promiseB, promiseC])
    .then(([a, b, c]) => {
      return [a, b, c];
    });
};

promiseFunc().then(([a, b, c]) => {
  console.log(a, b, c)
});

// => 5, 10, 20
```

- async/await

```
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
```
