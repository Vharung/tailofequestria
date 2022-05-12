import { tailofequestriaActor } from"./sheets/tailofequestriaactor.js";
import { tailofequestriaActorSheet } from "./sheets/tailofequestriaactorsheet.js";
import { tailofequestriaItem } from "./sheets/tailofequestriaitem.js";
import { tailofequestriaItemSheet } from "./sheets/tailofequestriaitemsheet.js";


Hooks.once("init", async function() {
    console.log("Tail of equestria | Initialisation du système Tail of equestria");
	CONFIG.Actor.documentClass = tailofequestriaActor;
    CONFIG.Item.documentClass = tailofequestriaItem;

    CONFIG.Combat.initiative = {
	    formula: "1d6",
	    decimals: 2
	};

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("tailofequestria", tailofequestriaItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("tailofequestria", tailofequestriaActorSheet, { makeDefault: true });
});

