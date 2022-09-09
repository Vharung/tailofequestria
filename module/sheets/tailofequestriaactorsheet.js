/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
 export class tailofequestriaActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["tailofequestria", "sheet", "actor"],
          width: 1000,
          height: 640,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    get template() {
        console.log(`tailofequestria | Récupération du fichier html ${this.actor.type}-sheet.`);
        if(this.actor.type=='personnage' || this.actor.type =='pnj' || this.actor.type=='monstre'){
            return `systems/tailofequestria/templates/sheets/personnage-sheet.html`; 
       }else {
            return `systems/tailofequestria/templates/sheets/${this.actor.type}-sheet.html`;
       }
        
    }

    getData(){
        const data = super.getData();
        var poidsactor='';
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);        
		if (this.actor.type == 'personnage' || this.actor.type == 'pnj' || this.actor.type == 'monstre') {
			this._prepareCharacterItems(data);
		}
        console.log(data);
        return data;
    }
   
	_prepareCharacterItems(sheetData) {
        const actorData = sheetData.actor;

        // Initialize containers.
        const inventaire = [];
        const faiblesse = [];
        const talent = [];
        const harmony =[];
        
        // Iterate through items, allocating to containers
        // let totalWeight = 0;
        for (let i of sheetData.items) {
          let item = i.items;
          i.img = i.img || DEFAULT_TOKEN;
          if (i.type === 'talent') {
            talent.push(i);
          }
          else if (i.type === 'faiblesse') {
            faiblesse.push(i);
          }
          else if (i.type === 'objet') {
            inventaire.push(i);
          }
          else if (i.type === 'harmony') {
            harmony.push(i);
          }
        }

        // Assign and return
        actorData.inventaire = inventaire;
        actorData.talent = talent;
        actorData.faiblesse = faiblesse;
        actorData.harmony = harmony;
    }


    activateListeners(html){
        super.activateListeners(html);
        //edition items
        html.find('.item-edit').click(this._onItemEdit.bind(this));

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            let d = Dialog.confirm({
                title: "Suppression d'élément",
                content: "<p>Confirmer la suppression de '" + item.name + "'.</p>",
                yes: () => item.delete(),
                no: () => { },
                defaultYes: false
            });
            //item.delete();
            li.slideUp(200, () => this.render(false));
        });
        
        const body=html.find('.body').val();
        const mind=html.find('.mind').val();
        const charm=html.find('.charm').val();
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
        let monJetDeDes = event.target.dataset["dice"];
        let nbdes = event.target.dataset["attdice"];
        const name = event.target.dataset["name"];
        const trait = event.target.dataset["trait"];
        const body =this.actor.system.body;
        const mind =this.actor.system.mind;
        const charm =this.actor.system.charm;
        const modifbody =this.actor.system.modif.body;
        const modifmind =this.actor.system.modif.mind;
        const modifcharm =this.actor.system.modif.charm;
        var listdes=['D4','D6','D8','D10','D12','D20','D20 + 1D4','D20 + 1D6','D20 + 1D8','D20 + D10','D20 + D12','2D20','2D20 + 1D6','2D20 + 1D8','2D20 + D10','2D20 + D12','3D20']
        var adddice="";
        var modif=0;
        if(trait=="body" || trait=="corps"){
            adddice='+ 1'+body;
        }else if(trait=="mind" || trait=="esprit"){
            adddice='+ 1'+mind;
        }else if(trait=="charm" || trait=="charme"){
            adddice='+ 1'+charm;
        }
        if(name=="Corps" || trait=="body" || trait=="corps"){
            modif=modifbody;
        }else if(name=="Esprit" || trait=="mind" || trait=="esprit"){
            modif=modifmind;
        }else if(name=="Charme" || trait=="charm" || trait=="charme"){
            modif=modifcharm;
        }
        if(modif!=0){
            var nblist=0;
            for (var i =0; i< listdes.length; i++) {
                if(nbdes==listdes[i]){
                    nblist=i;
                }
            }
            nblist=parseInt(nblist)+parseInt(modif);
            if(nblist<0){
                nblist=0;
            }else if(nblist>listdes.length){
               nblist=listdes.length ;
            }
            nbdes=listdes[nblist];
        }
        const jetdeDesFormule = "1"+nbdes + adddice;
        console.log(nbdes+' '+name+" "+jetdeDesFormule+" "+trait+" "+adddice);

        let r = new Roll(nbdes + adddice);
        var roll=r.evaluate({"async": false});
        let retour=r.result; 
        var succes="";

        const myArray = nbdes.split("D");
        let numdes = myArray[1];
        /*if(retour>95){
            succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec critique</h4>";
        }else if(retour<critique){
            succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite critique</h4>";
        }else if(retour<=inforesult){
            succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite</h4>";
        }else{
            succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec</h4>";
        }*/
        if(retour==1){
            succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec critique</h4>";
        }else if(retour==numdes){
            succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite critique</h4>";
        }
        console.log(succes);
        const texte = "Jet de " + name + " : " +jetdeDesFormule +succes;
        //roll.roll().toMessage({
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: texte
        });
    }
}