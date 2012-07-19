/**
 * Removes the first occurence of the given element from the list.
 *
 * @param element the element to remove.
 * @return whether the operation was successfull or not.
 */
Array.prototype.remove = function(element) {
	for(var i=0; i<this.length; i++) { 
  		if(this[i] === element) {
  			this.splice(i,1);
  			return true;
  		}
	}

	return false; 
}

/**
 * Removes all occurences of the given element from the list.
 *
 * @param element the element to remove.
 */
Array.prototype.removeAll = function(element) {
	for(var i=0; i<this.length; i++) { 
  		if(this[i] === element) {
  			this.splice(i,1);
  			i--;
  		}
	}
}

/**
 * Adds the element to the array.
 *
 * @param element the element to add.
 * @return the index of the element.
 */
Array.prototype.add = function(element) {
  var newSize = this.push(element);

  return newSize-1;
}