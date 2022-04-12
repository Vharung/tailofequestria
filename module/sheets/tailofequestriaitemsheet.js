export class tailofequestriaItemSheet extends ItemSheet{
    get template(){
        console.log(`tailofequestria | Récupération du fichier html ${this.item.data.type}-sheet.`);

        return `systems/tailofequestria/templates/sheets/${this.item.data.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);

        return data;
    }
}