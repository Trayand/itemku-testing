/*
N: 5
users: [2,1,2,6,2,4,3,3]
answer: [3,4,2,1,5]

N: 4
users: [4,4,4,4,4]
answer: [4,1,2,3]
*/

function solution(N, users) {
  // Limitations
  const limitationError = limitations(N, users);
  if (limitationError) return limitationError;

  users.sort((a, b) => a - b); // sorting users current stage

  let stageData = [];

  for (let stage = 1; stage <= N; stage++) {
    let userFailedCount = 0;

    users.forEach((currentUserStage) => {
      if (currentUserStage === stage) {
        userFailedCount++;
      }
    });

    stageData.push([stage, userFailedCount / users.length]);
    users = users.slice(userFailedCount);
  }

  let sortableStageData = stageData.sort((a, b) => b[1] - a[1]); // sorting the failure rate for each stage [descending]

  let answer = sortableStageData.map((data) => data[0]); // return stage by higher failure rate

  return answer;

  // short way
  // return stageData.sort((a, b) => b[1] - a[1]).map((data) => data[0])
}

function limitations(N, users) {
  if (N < 1 || N > 500) {
    return `total stage must between 1 ~ 500.`;
  } else if (users.length < 1 || users.length > 200000) {
    return ` The length of array users: 1 ~ 200,000`;
  } else if (
    users.find(
      (currentUserStage) =>
        currentUserStage < 1 ||
        currentUserStage > N + 1 ||
        typeof currentUserStage !== "number"
    ) ||
    users.filter((currentUserStage) => !currentUserStage).length > 0 // to find falsy data types ex: null, undefined, false
  ) {
    return `users only contain numbers 1 ~ N+1`;
  }
  return null;
}

console.log(solution(N, users));
