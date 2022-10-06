const express = require( "express" );
const request = require( "request" );
const bodyP = require( "body-parser" );
const https = require( "https" );

const app = express();


app.use( express.static( "public" ) );
app.use( bodyP.urlencoded( { extended: true } ) );




app.get( "/", ( req, res ) =>
{
    res.sendFile( __dirname + "/signup.html" );
} );

app.post( "/", ( req, res ) =>
{
    const fName = req.body.fName;
    const lName = req.body.lName;
    const eID = req.body.eID;

    const data =
    {
        members: [
            {
                email_address: eID,
                status: "subscribed",
                merge_fields: { FNAME: fName, LNAME: lName }
            }
        ]
    };
    const jsonData = JSON.stringify( data );


    const url = "https://us9.api.mailchimp.com/3.0/lists/b457bfdb55";
    const options = {

        method: "post",
        auth: "manuj8941:c31beb20fb1dc9993c0184a9cf385006-us9"
    };

    const request = https.request( url, options, ( response ) =>
    {
        if ( response.statusCode === 200 )
        {
            res.sendFile( __dirname + "/success.html" );

        }
        else 
        {
            res.sendFile( __dirname + "/failure.html" );
        }


        response.on( "data", ( data ) =>
        {
            console.log( JSON.parse( data ) );
            console.log( request );

        } );

    } );

    request.write( jsonData );
    request.end();


} );




app.listen( process.env.PORT || 3000, () =>
{
    console.log( "Server is up and running at port 3000!" );
} );

// api key
// c31beb20fb1dc9993c0184a9cf385006-us9

// unique id
// b457bfdb55

// x = { "name": "Freddie'\''s Favorite Hats", "contact": { "company": "Mailchimp", "address1": "675 Ponce De Leon Ave NE", "address2": "Suite 5000", "city": "Atlanta", "state": "GA", "zip": "30308", "country": "US", "phone": "" }, "permission_reminder": "You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.", "campaign_defaults": { "from_name": "Freddie", "from_email": "freddie@freddiehats.com", "subject": "", "language": "en" }, "email_type_option": true };