import React from "react";

function Item({ item, onUpdateItem, onDeletedItem }) {
  // function to handle button click
  function handleAddToCartClick() {
    // add fetch request
    
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
    .then((r) => r.json())
    // Call onUpdateItem, passing the data returned from the fetch request
    .then((updatedItem) => onUpdateItem(updatedItem));
    // console.log("clicked item:", item);
  }

  function handleDeleteClick () {
    // console.log(item);
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
     // Call onDeleteItem, passing the deleted item
    .then(() => onDeletedItem("deleted!"));
  }


  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"}
      onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
