/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Item}
 */
 export class tailofequestriaItemSheet extends ItemSheet{
    get template(){
        console.log(`tailofequestria | Récupération du fichier html ${this.item.type}-sheet.`);

        return `systems/tailofequestria/templates/sheets/${this.item.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);

        return data;
    }
}