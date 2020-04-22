let checkIt = function (str) {
  console.log(str);
  if (!str instanceof String) {
    console.log('It is not string!');
  } else {
    while (str[0] === ' ') str.slice(1);
    console.log(str);
  }
}

checkIt('    Hello my friend');