<?
   $email=$_GET['e'];
   $emailstr="##pixelLink##".$email;
   header( "refresh:5;url=##baseUrl####asset##" ); 
   ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
        <title>##edmTitle##</title>
        <style type="text/css">

              	  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

              	*{
            text-decoration:none;
            font-family: 'Noto Sans',sans-serif;
            }
            a{
            color:#0066b2;
            }

        </style>
    </head>
    <body style="background-color: #e8ecee;">
        <table
            width="700"
            align="center"
            cellpadding="0"
            cellspacing="0"
            style="
                border-top: 10px solid#0066b2;
                border-bottom: 10px solid#0066b2;
                width: 700px;
                margin-top: 3%;
                border-radius: 7px;
                box-shadow: 0 2.8px 2.2px rgb(0 0 0 / 3%), 0 6.7px 5.3px rgb(0 0 0 / 5%), 0 12.5px 10px rgb(0 0 0 / 6%), 0 22.3px 17.9px rgb(0 0 0 / 7%), 0 41.8px 33.4px rgb(0 0 0 / 9%), 0 100px 80px rgb(0 0 0 / 12%);
            "
        >
            <tbody>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: white; padding: 0.4% 2%;">
                            <tbody>
                                <tr>
                                    <td width="440" height="88" valign="middle" style="">
                                        <img src="##baseUrl##IT-BUSINESS-TODAY-COLOUR-1.png" alt="It Business Today" width="150" style="" />
                                    </td>
                                    <td width="234" align="right">
                                        <span style="font-size: 14px;">##sponsoredBy##</span><br />
                                        <img id="splogo" src="##baseUrl####logoName##" alt="Sponser Logo" style="##logoStyle##" />
                                    </td>
                                   
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px; background: #fff; border-top: 1px solid rgb(192, 192, 192); border-bottom: 0px;">
                        <table width="100%" cellspacing="0" cellpadding="10" border="0">
                            <tbody>
                                <tr>

                                    ##thankyouContentHtml##

                                    
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td height="50" align="center" style="color: #d8d8d8; background: #202020;">
                        <div align="center" style="padding-top: 1.2%; padding-bottom: 1.3%; font-size: 11px; border-top: 1px solid #c0c0c0;">
                            <a href="##baseUrl##unsubscribed.html" style="color: #3673b5;">Unsubscribe</a> |
                            <a href="##privacy##">Privacy Policy</a>
                            <br />
                            Copyright &#169; ##year## XDBS Corporation<br />
                            Hawthorne, CA 90250 USA<br />
                            3501, Jack Northorp Ave, Ste C3873
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>

    <!-- -->
    <script>
        var timeleft = 5;
        var downloadTimer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
                document.getElementById("countdown").innerHTML = "0";
            } else {
                document.getElementById("countdown").innerHTML = timeleft + "";
            }
            timeleft -= 1;
        }, 1000);
    </script>
</html>
