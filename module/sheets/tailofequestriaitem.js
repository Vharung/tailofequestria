export class tailofequestriaItem extends Item {
  static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["tailofequestria", "sheet", "item"],
          width: 600,
          height: 400,
        });
    }
  prepareData() {
    super.prepareData();
    const itemData = this.system;
    const data = itemData;
    const flags = itemData.flags;
  	//preparation dépendant du type de personnage (
  	if (itemData.type === 'arme') this._prepareItemData(itemData);
    if (itemData.type === 'talent') this._prepareItemData(itemData);
    if (itemData.type === 'faiblesse') this._prepareItemData(itemData);
    if (itemData.type === 'objet') this._prepareItemData(itemData);
    if (itemData.type === 'magie') this._prepareItemData(itemData);
  }


   /**
   * Prepare Character type specific data
   */
  _prepareItemData(itemData) {
    const data = itemData.system;
  }

  /** @override */
  prepareBaseData() {
  }

  prepareDerivedData() {
  }
}