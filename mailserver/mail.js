const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

const sendMail = (info) => {
    console.log('inside mail server')
    let text = JSON.stringify(info)
    let deliveryAddress = info.deliveryAddress
    console.log(text)
    const msg = {
        to: info.orderFrom.userEmail,
        from: 'ahoboyz@gmail.com',
        subject: 'You have placed a new order',
        // text: '',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    msg.text = text;
    msg.html = `<div>
    <h4>Status:</h4> <p>${info.deliveryStatus}</p>
    <h4>Delivery Address:</h4> <p>${info.deliveryAddress}</p>
    <h4>Bill:</h4> <p>${info.bill}</p>
    </div>`
    try {
        return sgMail.send(msg)
    } catch (error) {
        throw new Error(error.message)
    }
};

module.exports = {sendMail}
