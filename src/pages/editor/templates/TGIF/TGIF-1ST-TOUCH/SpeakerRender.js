const SpeakerRender= ( {datas,STATE,forPreview,getBase64Image,filesRef})=>{
let data=datas
    try {
        const SPEAKERS=JSON.parse(STATE["SPEAKERS"])
        if(SPEAKERS.length>0){
            console.log("SPEAKERS FOUND",SPEAKERS.length);


           
            // if (forPreview == true) {
            //     if (this.filesRef.fileInput1.files[0]) { data = data.replaceAll(`##BASE_URL####LOGO_FOLDER####LOGO_NAME##`, await this.getBase64Image(this.filesRef.fileInput1.files[0])) }
    
     
            // }



            const speakersDiv=`
           
                    ${SPEAKERS.map( async (speaker)=>{
                        let speakerImage
                        //For Preview
                        if(forPreview==true){
                             speakerImage= await  getBase64Image( filesRef[`speaker${speaker.id}`].files[0])
                        
                        }else{
                            speakerImage=speaker.speakerImage.startsWith("http")? speaker.speakerImage : STATE["BASE_URL"]+speaker.speakerImage

                        }
                     
                       
                        const speakerImageTag=`<img src='${speakerImage}'/>`
                        const speakerTD=(speaker.speakerImage)?`<td class="speaker-image">${speakerImageTag}</td>`: ''


                        return `
                        <table cellspacing="0" cellpadding="0" border="0" width="100%" class="speaker">
                        <tr><td class="speaker-heading">${STATE["SPEAKER_HEADING"]}</td></tr>
                            <tr>
                                ${speakerTD}
                                <td width="auto">
                                    <div class="speaker-name">${speaker.speakerName}</div>
                                    <div>${speaker.speakerDetails}</div>
                                </td>
                            </tr>
                        </table>
                        `


                    }).join("")}
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