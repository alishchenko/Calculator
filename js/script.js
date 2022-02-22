let list = "", cpList = "";
let result = "";


function checkBrackets(str) {
  let stck = [];
    for (let i = 0; i <= str.length; i++) {
      if (str[i] == "(") {
        stck.push("(");
      }
      if (str[i] == ")") {
        stck.push(")");
      }
    }
    stck = stck.join("");
    for (let i = 0; i <= str.length; i++) {
      stck = stck.replace(/\(\)/, "");
    }
  return stck.length;
}


function factorial(n){
  if (n == 1 || n == 0) return 1;
  else return n * factorial(n - 1);		
  }

function reset_screen() {
  document.getElementById("res_field").innerHTML = "&nbsp";
  document.getElementById("res_input_field").innerHTML = "&nbsp";
  list = ""; result = ""; cpList = "";
}

function del_symb() {
  list = list.slice(0, list.length - 1);
  cpList = cpList.slice(0, cpList.length - 1);
  document.getElementById("res_field").innerHTML = list;
}

addToExample = function(value) {
  if (list[0] == "-") {
    cpList = "0".concat(cpList);
  }
    if(list == "") {
      if(result != "")
        document.getElementById("res_input_field").innerHTML = result;
      document.getElementById("res_field").innerHTML = "";
      if(value == '*' || value == '/' || value == '+' || value == '-' || value == '^' 
      || value == '√' || value == '!') {
        list += '0';
    }
    }

    if(value == '.')  list += '0';


    if(!String(list[list.length - 1]).match(/\d/) && !value.match(/\d/) && value != '.'  && value != "-"
      && value != '(' && value != ')' && list[list.length - 1] != '(' && list[list.length - 1] != ')') {
        list = list.slice(0, list.length - 1);
        cpList = cpList.slice(0, cpList.length - 1);
    }
    if (value == "-" && (list[list.length - 1] == "+" || list[list.length - 1] == "-" || 
    list[list.length - 1] == "*" || list[list.length - 1] == "/" || list[list.length - 1] == "^" ||
    list[list.length - 1] == "√" || list[list.length - 1] == "!")) {
         list += "(";
         cpList += "(";
    }
    if (value == "(" && list[list.length - 1] == ")") {
        list += "*";
        cpList += "*";
    }
    list += value;
    cpList += value;
    document.getElementById("res_field").innerHTML = list;
    if (value == ")")  {
        let str = getResult(cpList.slice(cpList.lastIndexOf("(") + 1, cpList.length - 1));
      if (cpList.lastIndexOf("(") == 0 && str < 0) {
            cpList = "0".concat(cpList);
        }
        cpList = cpList.replace(cpList.slice(cpList.lastIndexOf("("), cpList.length), str);
    }
}

getResult = function(str = null) {
    if (str == null && checkBrackets(list) != 0) {
      document.getElementById("res_field").innerHTML = "Error";
      document.getElementById("res_input_field").innerHTML = "&nbsp";
      result = "";
      list = "";
      cpList = "";
      return;
    }
    let nArr = [], sArr = [],  num = "", sign = "", sqr = false, minus = false;
    for (i of str == null ? cpList : str) {
        if (i >= "0" && i <= "9" || i == ".") {
            num += i;
            if (sign != "") {
                sArr[sArr.length] = sign;
                sign = "";
            }
        }            
        else {
            nArr[nArr.length] = Number(num);
            num = "";
            if (sqr) {
                nArr[nArr.length - 1] = Math.sqrt(nArr[nArr.length - 1], 2);
                sqr = false;
            }
            if (minus) {
                nArr[nArr.length - 1] *= -1;
                minus = false;
            }
            if (i == "!") {
                nArr[nArr.length - 1] = factorial(nArr[nArr.length - 1]);
            }
            else if (i == "√") {
                sqr = true;
                nArr.splice(nArr.length - 1, 1);
            }
            else if (sign != "" && i == "-") {
                minus = true;
                nArr.splice(nArr.length - 1, 1);
            }
            else sign = i;
        }
    }
    if (num != "") {
        nArr[nArr.length] = Number(num);
        if (sqr) {
            nArr[nArr.length - 1] = Math.sqrt(nArr[nArr.length - 1], 2);
        }
        if (minus) {
            nArr[nArr.length - 1] *= -1;
        }
    }
    let deg;
    while ((deg = sArr.indexOf('^')) != -1) {
        nArr[deg] = Math.pow(nArr[deg], nArr[deg + 1]);
        sArr.splice(deg, 1);
        nArr.splice(deg + 1, 1);
    }
    let mult = sArr.indexOf('*'), div = sArr.indexOf('/');
    while (mult != -1 || div != -1) {
        if (mult == -1 || (div < mult && div != -1)) {
            nArr[div] /= nArr[div + 1];
            sArr.splice(div, 1);
            nArr.splice(div + 1, 1);
        }
        else {
            nArr[mult] *= nArr[mult + 1];
            sArr.splice(mult, 1);
            nArr.splice(mult + 1, 1);
        } 
        mult = sArr.indexOf('*'); div = sArr.indexOf('/');
    }

    let sum = sArr.indexOf('+'), sub = sArr.indexOf('-');
    while (sum != -1 || sub != -1) {
        if (sum == -1 || (sub < sum && sub != -1)) {
            nArr[sub] -= nArr[sub + 1];
            sArr.splice(sub, 1);
            nArr.splice(sub + 1, 1);
        }
        else {
            nArr[sum] += nArr[sum + 1];
            sArr.splice(sum, 1);
            nArr.splice(sum + 1, 1);
        } 
        sum = sArr.indexOf('+'); sub = sArr.indexOf('-');
    }

    if (str == null) {
        document.getElementById("res_field").innerHTML = nArr[0];
        document.getElementById("res_input_field").innerHTML = list;
        result = String(nArr[0]);
        if(isNaN(Number(result))) {
          document.getElementById("res_field").innerHTML = "Error";
          document.getElementById("res_input_field").innerHTML = "&nbsp";
          result = "";
        }
        list = cpList = result;
    }
    else {
        return nArr[0];
    }
}


function plus_minus() {
  getResult();
  document.getElementById("res_field").innerHTML = Number(document.getElementById("res_field").innerHTML) * -1;
  list = cpList = String(Number(result) * -1);

}

function ne_plus_minus() {
  getResult();
  document.getElementById("res_field").innerHTML = Number(document.getElementById("res_field").innerHTML) * 0.01;
  list = cpList = String(Number(result) * 0.01);

}
