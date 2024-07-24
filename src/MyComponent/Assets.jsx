import React from 'react'

const Assets = () => {
    return (
        <form>
            <div className="row">
                <div className="field input">
                    <span className="label">Logo Name</span>
                    <input type="text" className="" name="LOGO_NAME" autocomplete="off" />
                    <div className="error"></div>
                </div>
            </div>
            <div className="row">
                <div className="field input">
                    <span className="label">Thumbnail Name</span>
                    <input type="text" className="" name="THUMBNAIL_NAME" />
                    <div className="error"></div>
                </div>
            </div>
            <div className="row">
                <div className="field file">
                    <span className="label">Logo File</span>
                    <input type="file" className="" name="LOGO_FILE" />
                    <div className="error"></div>
                </div>
            </div>
            <div className="row">
                <div className="field file">
                    <span className="label">Thumbnail File</span>
                    <input type="file" className="" name="THUMBNAIL_FILE" />
                    <div className="error"></div>
                </div>
            </div>
            <div className="row">
                <div className="field input">
                    <span className="label">Download Now</span>
                    <input type="text" className="" name="ASSET_FILE" />
                    <div className="error"></div>
                </div>
            </div>
            <div className="row">
                <div className="field button ">
                    <button className="cta">Done</button>
                </div>
            </div>
        </form>

    )
}

export default Assets