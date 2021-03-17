function getFilteredLinks(list, searchQuery) {
  // shuffle order
  shuffleOrder(list) 

  // sort on priority (only 10 websites have priority)
  var sortedList = list.sort(function(link1, link2) {
    return link2.priority - link1.priority;
  });

  // show matched sites based on the searchQuery
  if (searchQuery != "") {
    var sortedList = sortedList.filter(function(link) {
      return (
        link.name.toLowerCase().includes(searchQuery) ||
        link.country.toLowerCase().includes(searchQuery)
      );
    });
  }

  // show matched name (or first name)
  sortedList.forEach(function(element) {
    var names = element.name.split("|");

    var defaultName = names[0];
    var foundName = undefined;

    if (names.length > 1 && searchQuery != "") {
       var foundName = names.find(function(name) {
        return name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    } 
    
    element.displayname = foundName || defaultName;    
  });

  return sortedList;
}

function shuffleOrder(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export default {
  getFilteredLinks
};
