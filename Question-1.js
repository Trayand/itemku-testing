function solution(record) {
  // Limitations record length
  if (record.length < 1 || record.length > 100000)
    return "Limitation error, record length must between 1 ~ 100,000.";

  let userData = userList(record);
  if (typeof userData === typeof "string") return userData; // Limitations error

  let answer = [];

  record.forEach((chatData) => {
    let [condition, UID] = chatData.split(" ");

    if (condition === "Enter") answer.push(`${userData[UID]} came in.`);
    else if (condition === "Leave") answer.push(`${userData[UID]} has left.`);
  });

  return answer;
}

function userList(record) {
  let userData = {};

  for (let index = 0; index < record.length; index++) {
    let userInput = record[index];
    if (!userInput.match(/^[0-9a-zA-Z\s]+$/))
      return `Limitation error at index ${index}, words must only consists uppercase letters, lowercase letters, and numbers.`;

    let [condition, UID, Username] = userInput.split(" ");

    // Limitations
    switch (true) {
      case !UID:
        return `Limitation error  at index ${index}, User ID undifined.`;

      case UID.length < 1 || UID.length > 10:
        return `Limitation error at index ${index}, User ID length must between 1 - 10.`;

      case Username?.length < 1 || Username?.length > 10:
        return `Limitation error at index ${index}, Username length must between 1 - 10.`;

      case condition !== "Leave" &&
        condition !== "Enter" &&
        condition !== "Change":
        return `Limitation error at index ${index}, The first word is either Enter, Leave, or Change.`;
    }

    if (condition === "Enter" || condition === "Change") {
      if (!Username && !userData[UID])
        return `Limitation error at index ${index}, user does not have Username.`;
      else userData[UID] = Username;
    }
  }

  return userData;
}

/*
record:
["Enter uid1234 Muzi", "Enter uid4567 Prodo", "Leave uid1234", "Enter uid1234 Prodo", "Change uid4567 Ryan"]

answer:
["Prodo came in.", "Ryan came in.", "Prodo has left.", "Prodo came in."]
*/

// console.log(solution(record));
