import IBaseModel from "./_baseModel";
import moment, { Moment } from "moment";
import { IAddInventory } from "../types";
export default class Addinventory implements IBaseModel {
  item?: string;
  id: string;
  quantity?: number;
  description?: string;
  notes?:string;
  purchase_date?:string
  inventory: IAddInventory;
  constructor(inventory: IAddInventory) {
    this.id = inventory._id;
    this.item = inventory.item;
    this.quantity = inventory.quantity;
    this.description = inventory.description;
    this.notes = inventory.notes;
    this.purchase_date = inventory.purchase_date;
    this.inventory = inventory;
  }
}