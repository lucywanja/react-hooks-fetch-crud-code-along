import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

useEffect(() =>{
  fetch("http://localhost:4000/items")
  .then((r) => r.json())
  .then((items)=> setItems(items)); // update the array by passing items to setItems(displayed the items)
}, []);

function handleDeleteItem(deletedItem) {
  // console.log("In ShoppingCart:", deletedItem);
  const updatedItems = items.filter((item) => item.id !==deletedItem.id);
  setItems(updatedItems);
}

  // callback function for add item
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if(item.id === updatedItem.id) {
        return updatedItem;

      }else {
        return item;
      }
    })
    // console.log("In ShoppingCart:", updateItem)
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm  onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {/* Pass it as a prop to the Item */}
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
