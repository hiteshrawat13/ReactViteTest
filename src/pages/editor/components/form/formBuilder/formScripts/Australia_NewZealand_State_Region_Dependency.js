const Australia_NewZealand_State_Region_Dependency=(API)=>{

    return {
        run:()=>{


            const {addField, updateField, loadFieldsFromJson ,setFields ,dispatch, state , fields} = API

    dispatch(addField({ field: {
        "type": "SelectBox",
        "id": "country",
        "label": "Country",
        "name": "",
        "isFullWidth": false,
        "isRequired": true,
        "isDisabled": false,
        "isReadOnly": false,
        "options": [
            {"label": "Choose One", "value": "" },
            {"label": "Australia", "value" : "Australia"},
            {"label": "New Zealand" , "value": "New Zealand"}
        ]
      }
    }))
    dispatch(addField({ field: {
        "type": "SelectBox",
        "id": "state",
        "label": "State",
        "name": "data[20]",
        "isFullWidth": false,
        "isRequired": true,
        "isDisabled": false,
        "isReadOnly": false,
        "options": [
            { "label":"Choose One", "value" : "" },
            { "label":"Australian Capital Territory", "value":"Australian Capital Territory"},
            { "label":"New South Wales", "value":"New South Wales"},
            { "label":"Northern Territory", "value":"Northern Territory"},
            { "label":"Queensland", "value":"Queensland"},
            { "label":"South Australia", "value":"South Australia"},
            { "label":"Tasmania", "value":"Tasmania"},
            { "label":"Victoria", "value":"Victoria"},
            { "label":"Western Australia", "value":"Western Australia"},
        ]
      }
    }))


    dispatch(addField({ field: {
        "type": "SelectBox",
        "id": "region",
        "label": "Region",
        "name": "data[21]",
        "isFullWidth": false,
        "isRequired": true,
        "isDisabled": false,
        "isReadOnly": false,
        "options": [
            { "label" : "Choose One", "value" : ""},
            { "label" : "Auckland", "value" : "Auckland"},
            { "label" : "Bay of Plenty", "value" : "Bay of Plenty"},
            { "label" : "Canterbury", "value" : "Canterbury"},
            { "label" : "Gisborne", "value" : "Gisborne"},
            { "label" : "Hawke's Bay", "value" : "Hawke's Bay"},
            { "label" : "Manawatu-Wanganui", "value" : "Manawatu-Wanganui"},
            { "label" : "Marlborough", "value" : "Marlborough"},
            { "label" : "Nelson", "value" : "Nelson"},
            { "label" : "Northland", "value" : "Northland"},
            { "label" : "Otago", "value" : "Otago"},
            { "label" : "Southland", "value" : "Southland"},
            { "label" : "Taranaki", "value" : "Taranaki"},
            { "label" : "Tasman", "value" : "Tasman"},
            { "label" : "Waikato", "value" : "Waikato"},
            { "label" : "Wellington", "value" : "Wellington"},
            { "label" : "West Coast", "value" : "West Coast"},
        ]
      }
    }))

   
    dispatch(addField({ field: { label: "Australia NewZealand State Dependency Script", type: fields.Html , 
        html : `<script>
        const countryField=document.querySelector("#country")
        const stateHolder=document.querySelector(".state-holder")
        const regionHolder=document.querySelector(".region-holder")

        var stateField = stateHolder.querySelector("select");
        var regionField = regionHolder.querySelector("select");
        
        function showState(){
            stateHolder.classList.remove("hide"); 
            stateField.required = true;
        }

        function hideState(){
            stateHolder.classList.add("hide"); 
            stateField.value = "";
            stateField.required = false;
        }
 
        function showRegion(){
            regionHolder.classList.remove("hide"); 
            regionField.required = true;
        }

        function hideRegion(){
            regionHolder.classList.add("hide"); 
            regionField.value = "";
            regionField.required = false;
        }



        hideState();
        hideRegion();

        countryField.addEventListener("input", function() {
            var country = this.value;

            hideState();
            hideRegion();
 
            if (country === "Australia") {
                showState();
            } else if (country === "New Zealand") {
                showRegion();
            }  

            // Set focus back to the country field
            this.focus();
        });
        </script>
        ` 
        } 
    }))
 


        }
    }

    


}

export default Australia_NewZealand_State_Region_Dependency;