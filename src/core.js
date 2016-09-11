import URLSafeBase64 from 'urlsafe-base64';
import crypto from 'crypto';
import SECRET from '../config/config';


export default function(handler = '') {
	
	let expiry = Math.floor(new Date().getTime() / 1000 + 60*60*24*100); // 100 days
	
	let policy = {expiry};
	if(handler) {
		policy.handle = handler;
	}
	policy = JSON.stringify(policy);
	//URL safe base64
	policy = URLSafeBase64.encode(new Buffer(policy)) + '=';

	//Hashed Signature
	let hmac = crypto.createHmac('SHA256', SECRET);
	hmac.setEncoding('hex')
		.write(policy)
	hmac.end();
	
	return {policy, signature: hmac.read()};
}