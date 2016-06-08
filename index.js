'use strict';
let https = require('https');

/**
 * a json string containing feed data is sent to this aws lambda method by the AWS IoT framework. the only requirement 
 * for the json is that there be a string called 'feedtag' in the root hash that we can use to aggregate the entries.
 * this method simply reads that value and POSTs the same json string it received to /f/{feedtag} for further processing.
 */
exports.handler = (event, context, callback) => {
    // Load the message passed into the Lambda function into a JSON object
    var eventText = JSON.stringify(event, null, 2);

    // Log a message to the console, you can view this text in the Monitoring tab in the Lambda console or in the CloudWatch Logs console
    console.log("Received event:", eventText);

    // entries coming in to this method should be tagged with a 'feedtag' in the root hash; we use that to form the path in the URL below.
    // this has the effect of aggregating the items by their tag.
    var opts = {
        host: 'awsiot.cfapps.pez.pivotal.io',
        path: '/f/' + event.feedtag,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    // we construct a POST request containing the same headers that we received
    const req = https.request(opts, (res) => {
	let body = '';
	console.log('Status:', res.statusCode);
	console.log('Headers:', JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', (chunk) => body += chunk);
	res.on('end', () => {
	    console.log('Successfully processed HTTPS response');
	    // If we know it's JSON, parse it
	    if (res.headers['content-type'] === 'application/json') {
		body = JSON.parse(body);
	    }
	    callback(null, body);
	});
    });
    req.on('error', callback);

    // write the same body that we received into the body of this request
    req.write(JSON.stringify(eventText));
    req.end();
};
