const US_Canada_State_Province_Dependency=(API)=>{

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
            {"label": "Canada", "value" : "Canada"},
            {"label": "United States" , "value": "United States"}
        ]
      }
    }))
    dispatch(addField({ field: {
        "type": "SelectBox",
        "id": "state",
        "label": "State",
        "name": "",
        "isFullWidth": false,
        "isRequired": true,
        "isDisabled": false,
        "isReadOnly": false,
        "options": [
            { "label":"Choose One", "value" : "" },
            { "label":"Alabama (AL)", "value" : "Alabama (AL)" },
            { "label":"Alaska (AK)", "value" : "Alaska (AK)" },
            { "label":"Arizona (AZ)", "value" : "Arizona (AZ)" },
            { "label":"Arkansas (AR)", "value" : "Arkansas (AR)" },
            { "label":"California (CA)", "value" : "California (CA)" },
            { "label":"Colorado (CO)", "value" : "Colorado (CO)" },
            { "label":"Connecticut (CT)", "value" : "Connecticut (CT)" },
            { "label":"Delaware (DE)", "value" : "Delaware (DE)" },
            { "label":"District of Columbia (DC)", "value" : "District of Columbia (DC)" },
            { "label":"Florida (FL)", "value" : "Florida (FL)" },
            { "label":"Georgia (GA)", "value" : "Georgia (GA)" },
            { "label":"Hawaii (HI)", "value" : "Hawaii (HI)" },
            { "label":"Idaho (ID)", "value" : "Idaho (ID)" },
            { "label":"Illinois (IL)", "value" : "Illinois (IL)" },
            { "label":"Indiana (IN)", "value" : "Indiana (IN)" },
            { "label":"Iowa (IA)", "value" : "Iowa (IA)" },
            { "label":"Kansas (KS)", "value" : "Kansas (KS)" },
            { "label":"Kentucky (KY)", "value" : "Kentucky (KY)" },
            { "label":"Louisiana (LA)", "value" : "Louisiana (LA)" },
            { "label":"Maine (ME)", "value" : "Maine (ME)" },
            { "label":"Maryland (MD)", "value" : "Maryland (MD)" },
            { "label":"Massachusetts (MA)", "value" : "Massachusetts (MA)" },
            { "label":"Michigan (MI)", "value" : "Michigan (MI)" },
            { "label":"Minnesota (MN)", "value" : "Minnesota (MN)" },
            { "label":"Mississippi (MS)", "value" : "Mississippi (MS)" },
            { "label":"Missouri (MO)", "value" : "Missouri (MO)" },
            { "label":"Montana (MT)", "value" : "Montana (MT)" },
            { "label":"Nebraska (NE)", "value" : "Nebraska (NE)" },
            { "label":"Nevada (NV)", "value" : "Nevada (NV)" },
            { "label":"New Hampshire (NH)", "value" : "New Hampshire (NH)" },
            { "label":"New Jersey (NJ)", "value" : "New Jersey (NJ)" },
            { "label":"New Mexico (NM)", "value" : "New Mexico (NM)" },
            { "label":"New York (NY)", "value" : "New York (NY)" },
            { "label":"North Carolina (NC)", "value" : "North Carolina (NC)" },
            { "label":"North Dakota (ND)", "value" : "North Dakota (ND)" },
            { "label":"Ohio (OH)", "value" : "Ohio (OH)" },
            { "label":"Oklahoma (OK)", "value" : "Oklahoma (OK)" },
            { "label":"Oregon (OR)", "value" : "Oregon (OR)" },
            { "label":"Pennsylvania (PA)", "value" : "Pennsylvania (PA)" },
            { "label":"Rhode Island (RI)", "value" : "Rhode Island (RI)" },
            { "label":"South Carolina (SC)", "value" : "South Carolina (SC)" },
            { "label":"South Dakota (SD)", "value" : "South Dakota (SD)" },
            { "label":"Tennessee (TN)", "value" : "Tennessee (TN)" },
            { "label":"Texas (TX)", "value" : "Texas (TX)" },
            { "label":"Utah (UT)", "value" : "Utah (UT)" },
            { "label":"Vermont (VT)", "value" : "Vermont (VT)" },
            { "label":"Virginia (VA)", "value" : "Virginia (VA)" },
            { "label":"Washington (WA)", "value" : "Washington (WA)" },
            { "label":"West Virginia (WV)", "value" : "West Virginia (WV)" },
            { "label":"Wisconsin (WI)", "value" : "Wisconsin (WI)" },
            { "label":"Wyoming (WY)", "value" : "Wyoming (WY)" }
        ]
      }
    }))


    dispatch(addField({ field: {
        "type": "SelectBox",
        "id": "province",
        "label": "Province",
        "name": "",
        "isFullWidth": false,
        "isRequired": true,
        "isDisabled": false,
        "isReadOnly": false,
        "options": [
            { "label" : "Choose One", "value" : ""},
            { "label" : "Alberta", "value" : "Alberta"},
            { "label" : "British Columbia", "value" : "British Columbia"},
            { "label" : "Manitoba ", "value" : "Manitoba "},
            { "label" : "New Brunswick ", "value" : "New Brunswick "},
            { "label" : "Newfoundland and Labrador ", "value" : "Newfoundland and Labrador "},
            { "label" : "Nova Scotia ", "value" : "Nova Scotia "},
            { "label" : "Ontario ", "value" : "Ontario "},
            { "label" : "Prince Edward Island ", "value" : "Prince Edward Island "},
            { "label" : "Quebec ", "value" : "Quebec "},
            { "label" : "Saskatchewan", "value" : "Saskatchewan"}
        ]
      }
    }))

   
    dispatch(addField({ field: { label: "US Canada State Dependency Script", type: fields.Html , 
        html : `

       
        <script>

        
        const stateHolder=document.querySelector(".state-holder")
        const provinceHolder=document.querySelector(".province-holder")

        stateHolder.classList.add("hide"); 
        provinceHolder.classList.add("hide"); 

        document.getElementById("country").addEventListener("input", function() {
        var country = this.value;
        var stateField = document.getElementById("state");
        var provincesField = document.getElementById("province");
        stateField.value = "";
        provincesField.value = "";
        

        if (country === "United States") {
            stateField.required = true;
            provincesField.required = false;
            stateHolder.classList.remove("hide"); 
            provinceHolder.classList.add("hide"); 
        } else if (country === "Canada") {
            stateField.required = false;
            provincesField.required = true;
            stateHolder.classList.add("hide"); 
            provinceHolder.classList.remove("hide"); 
        } else {
            stateField.required = false;
            provincesField.required = false;
            stateHolder.classList.add("hide"); 
            provinceHolder.classList.add("hide"); 
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

export default US_Canada_State_Province_Dependency;