const SpeakerRender=async  ( {datas,STATE,forPreview,getBase64Image,filesRef})=>{

    //https://techversions.com/tvs/2024/11-Nov/19/Adobe-CPL-Nov-Feb-2024-2025-Q4-Q1-ABM-DTG-DPG/DE/1T/2/Barrierefreie-PDF-dokumente-expert-talk.html
let data=datas

if(STATE["SHOW_SPEAKERS"]==false){
    data=data.replaceAll(`##SPEAKERS##`, "")
    return data
}


 


    try {
        const SPEAKERS=JSON.parse(STATE["SPEAKERS"])
        if(SPEAKERS.length>0){
            console.log("SPEAKERS FOUND",SPEAKERS.length);


           
            // if (forPreview == true) {
            //     if (this.filesRef.fileInput1.files[0]) { data = data.replaceAll(`##BASE_URL####LOGO_FOLDER####LOGO_NAME##`, await this.getBase64Image(this.filesRef.fileInput1.files[0])) }
    
     
            // }



            let html=``

            

            for (let i = 0; i < SPEAKERS.length; i++) {
                const speaker = SPEAKERS[i];

                let speakerImage=""
                        //For Preview
                        if(forPreview==true){
                             speakerImage= await  getBase64Image( filesRef[`speaker${speaker.id}`].files[0])
                             if(speakerImage==null){
                                speakerImage=speaker.speakerImage.startsWith("http")? speaker.speakerImage : STATE["BASE_URL"]+speaker.speakerImage

                             }
                        
                        }else{
                            speakerImage=speaker.speakerImage.startsWith("http")? speaker.speakerImage : STATE["BASE_URL"]+speaker.speakerImage

                        }
                     
                       
                        const speakerImageTag=`<img src='${speakerImage}'/>`
                        const speakerTD=(speaker.speakerImage)?`<td class="speaker-image" valign="top">${speakerImageTag}</td>`: ''

                        const speaker_cell=`<table cellspacing="0" cellpadding="0" border="0" width="100%" class="speaker">
                                        <tr>
                                            ${speakerTD}
                                            <td width="auto" valign="top">
                                                <div class="speaker-name">${speaker.speakerName}</div>
                                                <div class="speaker-details">${speaker.speakerDetails}</div>
                                            </td>
                                        </tr> 
                                    </table>`


                        
                        


                        html+= `
                            <tr>
                                <td>
                                    ${speaker_cell}
                                </td>
                            </tr>
                        `

                
            }


            const speakersDiv=`
            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="speaker">
                    <tr><td class="speaker-heading" colspan="2" align="left">${STATE["SPEAKER_HEADING"]}</td></tr>
                   ${html}
            </table>
            `

           data=data.replaceAll(`##SPEAKERS##`,speakersDiv )
        }else{
            console.log("SPEAKERS NOT FOUND",SPEAKERS.length);
            data=data.replaceAll(`##SPEAKERS##`, "")
        }
     
    } catch (error) {
        console.log("Error while parsing speakers in publishhelper",error);
        data=data.replaceAll(`##SPEAKERS##`, "")
        
    }

    return data+""
}

export default SpeakerRender