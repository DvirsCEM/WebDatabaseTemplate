import type { Item } from "types";
import { send } from "clientUtilities";

var itemInput = document.querySelector<HTMLInputElement>("#itemInput")!;
var amountInput = document.querySelector<HTMLInputElement>("#amountInput")!;
var addButton = document.querySelector<HTMLButtonElement>("#addButton")!;
var itemsUl = document.querySelector<HTMLUListElement>("#itemsUl")!;

var items = await send<Item[]>("getItems");

for (var i = 0; i < items.length; i++) {
  var itemLi = document.createElement("li");
  itemLi.innerText = `${items[i].amount} ${items[i].name}`;
  itemsUl.append(itemLi);
}

addButton.onclick = async function() {
  await send("addItem", itemInput.value, parseInt(amountInput.value));
  location.reload();
};
