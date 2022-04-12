export class tailofequestriaActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["tailofequestria", "sheet", "actor"],
          //template: "systems/tailofequestria/templates/actor/personnage-sheet.html",
          width: 1000,
          height: 800,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    get template() {
        console.log(`tailofequestria | Récupération du fichier html ${this.actor.data.type}-sheet.`);
        return `systems/tailofequestria/templates/sheets/${this.actor.data.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        var poidsactor='';
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);        
        if (this.actor.data.type == 'personnage' || this.actor.data.type == 'pnj' || this.actor.data.type == 'monstre') {
            this._prepareCharacterItems(data);
        }
        console.log(data);
        return data;
    }
   
    _prepareCharacterItems(sheetData) {
        const actorData = sheetData.actor;

        // Initialize containers.
        const objet = [];
        const quirk = [];
        const talent = [];
        
        // Iterate through items, allocating to containers
        // let totalWeight = 0;
        for (let i of sheetData.items) {
          let item = i.data;
          i.img = i.img || DEFAULT_TOKEN;
          if (i.type === 'talent') {
            talent.push(i);
          }
          else if (i.type === 'quirk') {
            quirk.push(i);
          }
          else if (i.type === 'objet') {
            objet.push(i);
          }
        }

        // Assign and return
        actorData.objet = objet;
        actorData.talent = talent;
        actorData.quirk = quirk;
    }


    activateListeners(html){
        super.activateListeners(html);
        //edition items
        html.find('.item-edit').click(this._onItemEdit.bind(this));

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.delete();
            li.slideUp(200, () => this.render(false));
        });
        

        //Jet de des
        html.find('.jetdedes').click(this._onRoll.bind(this)); 

        

    }


    getItemFromEvent = (ev) => {
        const parent = $(ev.currentTarget).parents(".item");
        //return this.actor.getOwnedItem(parent.data("itemId"));
        return this.actor.items.get(parent.data("itemId"));
    }

    _onItemEdit(event){
        const item = this.getItemFromEvent(event);
        item.sheet.render(true);
    }

    //lancer de dés
    _onRoll(event){
        /*let monJetDeDes = event.target.dataset["dice"];
        let nbdes = event.target.dataset["attdice"];
        const name = event.target.dataset["name"];
        const jetdeDesFormule = nbdes+"d6";

        let r = new Roll(nbdes+"d6");
        var roll=r.evaluate({"async": false});
        let retour=r.result; 
        var succes="";
        const texte = "Jet de " + name + " : " +jetdeDesFormule ;//+" - "+succes+" réussite(s)";
        //roll.roll().toMessage({
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: texte
        });*/
    }
}
