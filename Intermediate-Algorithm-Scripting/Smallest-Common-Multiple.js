function smallestCommons(arr) {
  /*
  arr: contains two different whole numbers
  */

  let arrRange;
  let primes = [2];

  // ensures the first number is the smallest
  if (arr[0] > arr[1]){
    arr = [arr[1], arr[0]];
  }

  // creates the list of numbers between the two params
  arrRange = [...Array(arr[1] - arr[0] + 1).keys()];
  for (let i = 0; i < arrRange.length; i++){
    arrRange[i] = arrRange[i] + arr[0];
  }

  // generates all the primes between 0 and the larger number. used to prime factorize each number in range.

  let candidateNum = 3; 
  let isPrime;

  // tests each number to see if it's prime by dividing it by each prime number preceeding it. If candidateNum can't be divided by any of these primes, then it is iteself a prime and is added. 

  while (candidateNum <= arr[1]){
    
    isPrime = true; //assume it's prime until it's proven not a prime

    // check if candidateNum can be evenly divided by any previous prime
    for (let i = 0; i < primes.length; i++){
      if (candidateNum % primes[i] === 0){
        isPrime = false; // it divided evenly by a previous prime, therefore it is not prime.
        break; // no reason to keep looping as it's already proven not a prime
      }
    }

    if (isPrime){
      primes.push(candidateNum);
    }

    candidateNum++;
  }

  // creates an object with each number as a key, and an arr of prime factors as the value

  let primeFactorized = {}; // the object being constructed
  let factors; // the prime factors 
  let remainder; // the remainder after a prime is factored out and added to factors. Primes will continue to be factored out of the remainder until it become a prime itself. When this happens, it is the last prime to be added to factors.

  // for each key: value added to primeFactorized
  for (let i = 0; i < arrRange.length; i++){
    factors = [];
    remainder = arrRange[i];

    // if remainder is alredy prime, then it can't be prime factorized any further.
    if (primes.includes(remainder)){ 
      factors.push(remainder);
      primeFactorized[arrRange[i]] = factors;
    }else{
      // for every prime in primes... 
      for (let i = 0; i < primes.length; i++){
        // ... keep factoring that prime out of remainder and push it to factors until it can't be factored out any more.
        while (remainder % primes[i] === 0){
          remainder = remainder / primes[i];
          factors.push(primes[i]);
        }
      }
      primeFactorized[arrRange[i]] = factors;
    }
  }


  // builds an arry containing the fewest primes needed to make any of the numbers in arrRange.
  // this is done by adding to it only the factors each number in arrRange needs to produce it individually.
  
  let requiredPrimes = [];
  let countRP; // used when counting how many times a prime number is currently in requiredPrime
  let countPF; // used when counting how many times a prime number is used to produce a specific value in arrRange
  let amountToPush; // used when calculating how many of a certain prime number to add to requiredPrimes

  // for each value in arrRange...
  for (let i = 0; i < arrRange.length; i++){
 
    amountToPush = 0;
    // for each prime number in primes...
    for (let j = 0; j < primes.length; j++){
      // for each number in primeFactorized[arrRange[i]]...
      countRP = 0;
      countPF = 0;
      for (let k = 0; k < primeFactorized[arrRange[i]].length; k++){
        // ...count how many times that prime is used to produce that value
        if (primeFactorized[arrRange[i]][k] === primes[j]){
          countPF++;
        }
      }
      // console.log(countPF + ' x ' + primes[j] + 's needed to produce ' + arrRange[i])
      // and for each number in requiredPrimes...
      for (let k = 0; k < requiredPrimes.length; k++){
        // ...count how many times that prime is present in requiredPrimes
        if (requiredPrimes[k] === primes[j]){
          countRP++;
        }
      }
      // then compare how many times that prime is needed with how many of that prime are alredy in requiredPrimes
      // if countPF > countRP, then there are not enough of prime[j]s in requiredPrimes to produce arrRange[i]...
      if (countPF > countRP){
        // ...meaning we must calculate how many more of that prime to push...
        amountToPush = countPF - countRP;
        for (let k = 0; k < amountToPush; k++){
          //...and push that prime to requiredPrimes that number of times
          requiredPrimes.push(primes[j])
        }
      }
    }
  }

  // multiple all the required primes together to get the result
  let result = 1;
  for (let i = 0; i < requiredPrimes.length; i++){
    result = result * requiredPrimes[i];
  }


  console.log('arrRange: ' + arrRange);
  console.log('primes: ' + primes);
  console.log('primeFactorized: \n', primeFactorized);
  console.log('requiredPrimes: ' + requiredPrimes);
  console.log('result: ' + result);

  return result;
}


smallestCommons([6, 10]); //2520
