module.exports = function check(str, bracketsConfig) {

    if (isParity(str) || isOpenBracketEnd(str) || isCloseBracketBegin(str)) {
        return false;
    }

    let openBrackets = [];
    let brackets = {};
    for (let i = 0; i < bracketsConfig.length; i++) {
        brackets[bracketsConfig[i][0]] =  bracketsConfig[i][1];
    }

    for (let i = 0; i < str.length; i++) {
        if(brackets.hasOwnProperty(str[i]) && brackets[str[i]] !== str[i]) {
            openBrackets.push(str[i]);
        } else {
            if (brackets[str[i]] === str[i]) {
                if (openBrackets.length === 0) {
                    openBrackets.push(str[i]);
                } else {
                    let last = openBrackets.pop();
                    if (last !== str[i]) {
                        openBrackets.push(last);
                        openBrackets.push(str[i]);
                    }
                }
            } else if (str[i] !== brackets[openBrackets.pop()]) {
                return false;
            }
        }
    }
    return openBrackets.length <= 0;

}

function isCloseBracketBegin(str) {
    return str[0] === ')' || str[0] === '}' || str[0] === ']';
}

function isOpenBracketEnd(str) {
    return str[str.length - 1] === '(' || str[str.length - 1] === '{' || str[str.length - 1] === '[';
}

function isParity(str) {
    return str.length % 2 !== 0;
}

