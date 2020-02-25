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
    return purchaseFunc(change);
  })
  // then() を直列処理する
  .then((change) => {
    console.log(`${change}yen`);
    // return purchaseFunc(change);
  })
  .catch((error) => {
    console.log(error);
  })

// => Success!
// => 400yen
