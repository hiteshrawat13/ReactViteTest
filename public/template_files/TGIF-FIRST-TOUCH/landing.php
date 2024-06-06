<?php
   $email=$_GET['e'];
   $emailencoded=base64_encode($email);
   $emailstr="##PIXEL_LINK##".$emailencoded;
   ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />

        <!-- ASSET TITLE -->
        <title>##LANDING_TITLE##</title>

        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js"></script>
        <style type="text/css">
			@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");

			* {
				text-decoration: none;
				font-family: "Noto Sans", sans-serif;
			}
			a {
				color: #0066b2;
			}

			.btn-primary1 {
				color: #ffffff;
				background-color: #954535;
				border: none;
				text-align: center;
				padding-bottom: 10px;
				margin-right: 10px;
				font-size: 18px;
			}
				
			table.leadForm {
				width: 100%;
				border-collapse: collapse; /* so we can control cellspacing in a practical way */
			}
			table.leadForm th,
			table.leadForm td {
				color: #cc0000;
				padding: 5px;
				text-align: left;
				font: normal 13px/21px "Noto Sans", sans-serif;
			}
			table.leadForm select {
				border-radius: 2px;
				width: 100%;
				height: 28px;
				border: 1px solid #ccc;
				padding: 5px;
			}
			table.leadForm input[type="text"],
			input[type="email"] {
				border-radius: 2px;
				width: 150px;
				height: 22px;
				border: 1px solid #ccc;
				font: normal 12px/22px "Noto Sans", sans-serif;
				color: #111;
				padding: 5px;
			}
			input.submit {
				background: url("##BASE_URL##download-button-new.png") left top no-repeat;
				cursor: pointer;
				height: 39px;
				width: 160px;
				border: 0px solid #000;
			}
			.formbg {
				-webkit-border-radius: 10px;
				-moz-border-radius: 10px;
				border-radius: 20px;
				padding: 10px;
				text-align: right;
			}
			body {
				background-repeat: repeat;
				margin-top: 0px;
			}

			p,
			ul {
				font-size: 14px;
				line-height: 1.5;
				color: #505050;
			}

			ul li {
				padding-bottom: 12px;
			}

			table {
				border-spacing: 0px;
			}

			label.error {
				display: block;
			}

			[type="checkbox"].error {
				outline: 2px solid #c00;
			}


                     <!--[if gte IE 9]>
                     .header {
                     filter: none;
                     }
                     <![endif]
                     -->
        </style>

        <script>
        $( document ).ready(function() {
	
		   
		   jQuery.validator.addMethod(
    "email",
    function(value, element) {
        // Regular expression for email validation
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    },
    "Please enter a valid email address."
);
		   
		});
		
		
		$().ready(function() {
		// validate the comment form when it is submitted
			$("#id3f").validate(
			
			{ // initialize the plugin
       
					errorPlacement: function (error, element) {
						if (element.attr("type") == "radio") {
							error.appendTo(element.closest(".check-group"));
						} else if (element.attr("type") == "checkbox") {
							error.appendTo(element.closest(".check-group"));
						} else {
							error.appendTo($(element).parent());
						} 
					
					},
					 submitHandler: function (form) {
						//console.log("Submitted!");
						//alert("Submit");
						form.submit();
					}
			}
	
			);
		}
		);

        </script>

        <script>
            new Image().src = "##PIXEL_LINK##<Base64 encrypted email>";
        </script>

        <noscript> <img height="1" width="1" style="display: none;" alt="" src="##PIXEL_LINK##<Base64 encrypted email>" /></noscript>
    </head>
    <body style="background-color: #e8ecee;">
        <table
            align="center"
            style="
                border-top: 10px solid #0066b2;
                border-bottom: 10px solid #0066b2;
                width: 700px;
                margin: 3% auto;
                border-radius: 7px;

                box-shadow: 0 2.8px 2.2px rgb(0 0 0 / 3%), 0 6.7px 5.3px rgb(0 0 0 / 5%), 0 12.5px 10px rgb(0 0 0 / 6%), 0 22.3px 17.9px rgb(0 0 0 / 7%), 0 41.8px 33.4px rgb(0 0 0 / 9%), 0 100px 80px rgb(0 0 0 / 12%);
            "
        >
            <tbody style="background-color: white;">
                <tr>
                    <td class="header" style="background-color: white;">
                        <table width="100%" style="padding: 0% 2%; border-bottom: 1px solid rgb(192, 192, 192);">
                            <tbody>
                                <tr style="background-color: white;">
                                    <!-- LOGO -->
                                    <td height="88" valign="middle" style="">
                                        <img src="##BASE_URL##IT-BUSINESS-TODAY-COLOUR-1.png" alt="It Business Today" width="150" style="" />
                                    </td>
                                    <td width="234" align="right">
                                        <div style="font-size: 14px; margin-top: 10px;">##SPONSORED_BY_TEXT##</div>
                                        <img id="sponsorLogo" src="##LOGO_URL##" alt="Logo" width="##LOGO_WIDTH##" style=" margin-top: 1px; margin-bottom: 1px;" />
                                    </td>

                                    <!-- LOGO -->
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="background: #fff; padding: 1.5% 2%;">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td colspan="2"><h1 style="font-size: 18px; color: #0066b2;">##LANDING_TITLE##</h1></td>
                                </tr>

                                <tr>
                                    <td width="53%" height="200" align="left" valign="top" style="">
                                        <!-- PDF IMAGE -->
                                        <div style="">
                                            <img   src="##THUMBNAIL_URL##" width="300" style=" border: 1px solid #e5e5e5; border-radius: 5px;" alt="thumbnail" />
                                        </div>
                                    </td>
                                    <td rowspan="2" width="47%" valign="top" align="left">
                                        <div class="formbg" style="box-shadow: 0px 0px 1px 1px #0066b2;">
                                            <!-- FORM -->
                                            <form id="id3f" action="##BASE_URL####LINK_NAME##-sendemail.php?e=<?echo $emailencoded;?>" method="post">
                                                <div style="display: none;">
                                                    <img src="##PIXEL_LINK##" style="display: none;" />
                                                </div>

                                                <!--XXX ... DON'T CHANGE THIS CODE ... XXX-->
                                                <input type="hidden" name="action" id="action" value="insert" />
                                                <input type="hidden" name="camp_id" id="camp_id" value="##LINK_NAME##" />
                                                <input type="hidden" name="Pixel_link" id="Pixel_link" value="##PIXEL_LINK##" />
                                                <!--XXX ... DON'T CHANGE THIS CODE ... XXX-->

                                                <div></div>
                                                <table class="leadForm" width="102%" colspan="2">
                                                    <tbody>
                                                        ##FORM##
                                                    </tbody>
                                                </table>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top" align="left" style="padding-right: 2%;">
                                    

                                        ##BODY##
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td height="50" align="center" style="border-top: 1px solid rgb(192, 192, 192); background-color: #ffff;">
                        <div align="center" style="padding-top: 1%; padding-bottom: 1%; font-size: 11px;">
                        <a href="##BASE_URL##unsubscribed.html" style="color: #3673b5;">Unsubscribe</a> |
                                            ##PRIVACY##
                            <br />
                            Copyright &#169; ##YEAR## XDBS Corporation <br />
                            Hawthorne, CA 90250 USA <br />
                            3501, Jack Northorp Ave, Ste C3873
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
</html>
