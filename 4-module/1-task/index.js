function makeFriendsList(friends) {
  // ваш код...
  let newList = document.createElement("ul");
  document.body.append(newList);

  for (let i = 0; i < friends.length; i++) {
    let nextFriend = document.createElement("li");
    nextFriend.innerHTML = `${friends[i].firstName} ${friends[i].lastName}`;
    newList.append(nextFriend);
  }
  return newList;
}
