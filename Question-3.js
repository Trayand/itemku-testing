/*
relation: 
[["100","ryan","music","2"],["200","apeach","math","2"],["300","tube","computer","3"],["400","con","computer","4"],["500","muzi","music","3"],["600","apeach","music","2"]]

answer: 2

*/

function solution(relation) {
  // Limitations
  let limitationError = limitations(relation);
  if (limitationError) {
    return limitationError;
  }

  let uniqueIdentifier = uniqueKeyIdentifier(relation);
  let combinationArray = combinationGenerator(uniqueIdentifier);

  let answer = 0;

  for (const key in uniqueIdentifier) {
    if (uniqueIdentifier[key]) answer += 1;
  }

  for (let i = 0; i < combinationArray.length; i++) {
    if (combinationUniqueKey(relation, combinationArray[i])) answer += 1;
  }

  return answer;
}

function limitations(relation) {
  if (!Array.isArray(relation[0]))
    return `Limitation error, relation must be a two-dimensional string array.`;
  else if (relation.length < 0 || relation.length > 20)
    return `Limitation error, The length of the row of relation must 1 ~ 20.`;
  else if (relation[0].length < 0 || relation[0] > 8)
    return `Limitation error, The length of the relation column must 1 ~ 8.`;

  for (let i = 0; i < relation.length; i++) {
    if (
      !relation[i].join("").match(/^[a-z0-9\s]+$/) || // any symbol or uppercase string
      relation.filter((element) => element.length < 1 || element.length > 8)[0] // any string less than 1 or more than 8 characters.
    )
      return `Limitation error, words must only consists lowercase letters and numbers.`;
  }

  return null; // if no Limitation error
}

function uniqueKeyIdentifier(relation) {
  let uniqueIdentifier = setIdentifier(relation);

  for (let i = 0; i < relation.length; i++) {
    for (let j = i + 1; j < relation.length; j++) {
      // for compare a single column
      for (let k = 0; k < relation[j].length; k++) {
        if (relation[i][k] === relation[j][k]) {
          uniqueIdentifier[k] = false;
          break;
        }
      }
    }
  }
  return uniqueIdentifier;
}

function setIdentifier(relationArray) {
  let identifier = {};
  relationArray[0].forEach((element, index) => (identifier[index] = true));
  return identifier;
}

function combinationGenerator(uniqueIdentifier) {
  let combinationKey = [];
  let combinationArray = [];

  for (const key in uniqueIdentifier) {
    if (!uniqueIdentifier[key]) combinationKey.push(key);
  }

  for (let i = 0; i < combinationKey.length; i++) {
    for (let j = i + 1; j < combinationKey.length; j++) {
      combinationArray.push([combinationKey[i], combinationKey[j]]);
    }
  }

  return combinationArray;
}

function combinationUniqueKey(relation, combination) {
  // comparing one to another column combinations
  for (let i = 0; i < relation.length; i++) {
    for (let j = i + 1; j < relation.length; j++) {
      if (
        relation[i][combination[0]] + relation[i][combination[1]] ===
        relation[j][combination[0]] + relation[j][combination[1]]
      ) {
        return false;
      }
    }
  }
  return true;
}

console.log(solution(relation));
