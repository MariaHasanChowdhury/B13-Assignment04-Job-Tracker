### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

## Answer:
- getElementById: Returns a single element based on a unique ID. It is the fastest selection method.
- getElementsByClassName: Returns a "Live" HTMLCollection of all elements with that class. If the DOM changes, the collection updates automatically.
- querySelector: Returns the first element that matches a CSS selector (e.g., .class, #id, div > p).
- querySelectorAll: Returns a static NodeList of all matching elements. Unlike HTMLCollections, NodeLists allow you to use .forEach() directly.

### 2. How do you create and insert a new element into the DOM?

## Answer:
- Create: const newDiv = document.createElement('div');
Content: newDiv.innerText = 'Hello World';

- Insert: Find a parent element and use appendChild() or insertBefore().
Example: document.getElementById('container').appendChild(newDiv);
### 3. What is Event Bubbling? And how does it work?

## Answer:
- Event Bubbling means an event starts from the target element and then moves upward to its parent elements.
- When an event happens on an element (like a click on a button), the event first runs the handlers on that element, then on its parent, then all the way up to the document and window.

### 4. What is Event Delegation in JavaScript? Why is it useful?

## Answer:
- Event Delegation means adding one event listener to a parent instead of multiple listeners to child elements. It works because of event bubbling.
- it's useful:
1. Memory Efficiency
2. Handles dynamically added elements
3. Better performance

### 5. What is the difference between preventDefault() and stopPropagation() methods?

## Answer:
- preventDefault() vs stopPropagation() -
preventDefault() : Stops default browser behavior.
stopPropagation() : Stops event bubbling.
