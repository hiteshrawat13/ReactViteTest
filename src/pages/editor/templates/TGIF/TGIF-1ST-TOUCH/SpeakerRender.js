const SpeakerRender=({SPEAKERS})=>{

    return SPEAKERS.map(speaker=>{
        return `<div><div>${speaker.name}</div><div>${Sneaker.details}</div></div>`
    }).join("")
}

export default SpeakerRender