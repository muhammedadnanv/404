const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Server is connected');
});

client.initialize();
 
client.on('message', message => {
	console.log(message.body);
});

client.on('message', message => {
	if(message.body === 'hello') {
		message.reply('heii?');
	}
});
 
client.on('message', message => {
	if(message.body === 'how are you') {
		message.reply('fine');
	}
});
 
client.on('message', message => {
	if(message.body === 'what is your name') {
		message.reply('muhammed adnan');
	}
});
 
client.on('message', message => {
	if(message.body === 'your secert') {
		message.reply('noufa_adnan');
	}
});
 
client.on('message', message => {
	if(message.body === 'i love you') {
		client.sendMessage(message.from, 'too');
	}
});

client.on('message',message=>{
    if(message.body==='instagram'){
        client.sendMessage(message.from,'it_adnan_are');
    }
});

client.on('message', message => {
	if(message.body === 'run') {
		client.sendMessage(message.from, 'server is connected');
	}
});




// Mention everyone
client.on('message', async (msg) => {
    if(msg.body === 'tag') {
        const chat = await msg.getChat();
        
        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }

        await chat.sendMessage(text, { mentions });
    }
});







'use strict';
const Base = require('./Base');
/**
 * Current connection information
 * @extends {Base}
 */
class ClientInfo extends Base {
    constructor(client, data) {
        super(client);
        if (data) this._patch(data);
    }
    _patch(data) {
        /**
         * Name configured to be shown in push notifications
         * @type {string}
         */
        this.pushname = data.pushname;
        /**
         * Current user ID
         * @type {object}
         */
        this.wid = data.wid;
        /**
         * @type {object}
         * @deprecated Use .wid instead
         */
        this.me = data.wid;
        /**
         * Information about the phone this client is connected to. Not available in multi-device.
         * @type {object}
         * @property {string} wa_version WhatsApp Version running on the phone
         * @property {string} os_version OS Version running on the phone (iOS or Android version)
         * @property {string} device_manufacturer Device manufacturer
         * @property {string} device_model Device model
         * @property {string} os_build_number OS build number
         * @deprecated
         */
        this.phone = data.phone;
        /**
         * Platform WhatsApp is running on
         * @type {string}
         */
        this.platform = data.platform;
        return super._patch(data);
    }
    /**
     * Get current battery percentage and charging status for the attached device
     * @returns {object} batteryStatus
     * @returns {number} batteryStatus.battery - The current battery percentage
     * @returns {boolean} batteryStatus.plugged - Indicates if the phone is plugged in (true) or not (false)
     * @deprecated
     */
    async getBatteryStatus() {
        return await this.client.pupPage.evaluate(() => {
            const { battery, plugged } = window.Store.Conn;
            return { battery, plugged };
        });
    }
}
module.exports = ClientInfo;